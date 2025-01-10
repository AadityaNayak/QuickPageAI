'use client';

import React, { useEffect, useState, useRef } from "react";
import { useChat } from "ai/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat", // Ensure this API route exists and is functional
  });

  const [previewCode, setPreviewCode] = useState("");
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true); // Track whether the preview is expanded or not
  const chatContainerRef = useRef<HTMLDivElement | null>(null); // For auto-scrolling
  const iframeRef = useRef<HTMLIFrameElement | null>(null); // Ref for the iframe to manage link clicks

  // Save chat to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Load chat from localStorage on page load
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      setMessages(parsedMessages); // Update state using setMessages from useChat hook
    }
  }, [setMessages]); // Dependency to update only once on mount

  // Update previewCode whenever new messages arrive, and extract code part
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]?.content;

    if (lastMessage) {
      // Extract HTML/CSS code part from the assistant's response
      const match = lastMessage.match(/\[HTML\/CSS code begins\]([\s\S]*?)\[HTML\/CSS code ends\]/);

      if (match && match[1]) {
        // Remove the triple backticks and the language identifier from the code
        const codeWithoutBackticks = match[1]
          .replace(/```html/g, "")  // Remove opening backticks with 'html'
          .replace(/```/g, "");    // Remove closing backticks
          
        setPreviewCode(codeWithoutBackticks.trim()); // Set the cleaned-up code for live preview
      }
    }

    // Auto-scroll to the bottom when a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    // If iframeRef is set, add the event listeners for links inside iframe
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        const anchorTags = iframeDocument.querySelectorAll('a');
        anchorTags.forEach((anchor) => {
          anchor.setAttribute('href', '_blank'); // Set href attribute to empty string
        });
      }
    }

  }, [messages]);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Trigger the handleSubmit function
      await handleSubmit(e);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Function to handle the file download for each code response
  const downloadCode = (code: string) => {
    const fullHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated HTML</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
  ${code}
</body>
</html>`;

    const htmlBlob = new Blob([fullHtmlCode], { type: "text/html" });
    const url = URL.createObjectURL(htmlBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated_code.html"; // Specify the file name
    link.click();
    URL.revokeObjectURL(url); // Clean up after download
  };

  // Toggle preview panel size
  const togglePreview = () => {
    setIsPreviewExpanded((prevState) => !prevState);
  };

  // Open preview in a new tab
  const openPreviewInNewTab = () => {
    const newWindow = window.open();
    newWindow?.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100">
        ${previewCode}
      </body>
      </html>
    `);
  };

  // Clear chat
  const clearChat = () => {
    localStorage.removeItem("chatMessages"); // Remove from localStorage
    setMessages([]); // Reset chat state
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Chat and Preview Panels */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Chat Panel */}
        <div
          className="w-full md:w-1/2 border-b md:border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto"
          ref={chatContainerRef} // Reference for auto-scrolling
          style={{ maxHeight: 'calc(100vh - 5rem)' }} // Ensure chat doesn't expand beyond the screen
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-full ${message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-white dark:bg-gray-700"}`}
                >
                  {message.role === "user" ? (
                    message.content
                  ) : (
                    <div>
                      <SyntaxHighlighter
                        language="html"
                        style={tomorrowNight} // Use the correct theme
                        customStyle={{ borderRadius: "8px", padding: "1rem" }}
                      >
                        {previewCode} {/* Only display the cleaned-up HTML/CSS code */}
                      </SyntaxHighlighter>
                      <div className="mt-2 flex justify-end">
                        {/* Download Button for this specific message */}
                        <button
                          onClick={() => downloadCode(previewCode)}
                          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                        >
                          Download Code
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Chat Input */}
        </div>

        {/* Preview Panel */}
        <div
          className={`w-full md:w-1/2 bg-gray-50 dark:bg-gray-800 p-4 transition-all duration-300 ${isPreviewExpanded ? "h-[75vh]" : "h-[30vh]"}`}
        >
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Live Preview</h2>
            <button
              onClick={togglePreview}
              className="text-blue-500 hover:text-blue-700"
            >
              {isPreviewExpanded ? "Collapse" : "Expand"}
            </button>
          </div>
          <iframe
            srcDoc={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated HTML</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
  ${previewCode}
</body>
</html>`} // Only the HTML/CSS code is displayed here
            className="w-full h-full border rounded dark:border-gray-700"
            sandbox="allow-scripts allow-same-origin"
            title="Live Preview"
            ref={iframeRef} // Correct use of ref
            onLoad={() => {
              // After the iframe is loaded, set all hrefs to empty string
              const iframeDocument = iframeRef.current?.contentDocument;
              if (iframeDocument) {
                const anchorTags = iframeDocument.querySelectorAll('a');
                anchorTags.forEach((anchor) => {
                  anchor.setAttribute('href', ''); // Set href to ""
                });
              }
            }}
          />
          <button
            onClick={openPreviewInNewTab}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Preview in New Tab
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={onSubmitHandler} className="flex flex-wrap items-center gap-2">
          <button
            onClick={clearChat}
            className="bg-red-500 text-white px-4 py-2 rounded-l-lg hover:bg-red-600 mr-2 w-full sm:w-auto"
            type="button"
          >
            Clear Chat
          </button>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask for HTML and CSS code..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none dark:bg-gray-800 dark:text-white w-full sm:w-auto"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300 w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;
