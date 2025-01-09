import React from "react";
import { auth } from "@/app/auth";

const LandingPage = async () => {
  const session = await auth();
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 animate__animated animate__fadeInUp">
            Welcome to QuickPageAI
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 animate__animated animate__fadeInUp animate__delay-1s mb-6">
            Your AI-powered assistant for web development.
          </p>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 animate__animated animate__fadeInUp animate__delay-2s mb-10">
            Generate HTML and CSS code instantly and see live previews directly
            in the chat.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 transform hover:scale-105 transition-all ease-in-out duration-300 animate__animated animate__fadeInLeft animate__delay-2.5s">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Generate Complete HTML & CSS Code
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Use natural language prompts to create fully functional HTML and
                CSS code. Perfect for prototyping or learning to code.
              </p>
            </div>
            <div className="p-8 border rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 transform hover:scale-105 transition-all ease-in-out duration-300 animate__animated animate__fadeInRight animate__delay-2.5s">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Live Code Previews
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Instantly preview your generated code without leaving the chat
                interface. Make real-time edits and see the results immediately.
              </p>
            </div>
          </div>

          <div className="mt-16 animate__animated animate__fadeInUp animate__delay-3s">
            {session?.user ? (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Hi {session?.user?.name} now you can access the Chatbot from
                navigation above.
              </p>
            ) : (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Sign in with your Google account to start building with AI.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
