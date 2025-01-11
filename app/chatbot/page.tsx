import ChatInterface from "../components/ChatInterface"; // Import the chat interface component
import { auth } from "@/app/auth"; // Import authentication utility

// Define the Home component
const Home = async () => {
  // Retrieve the user session using the auth function
  const session = await auth();

  return (
    <>
      {/* If the user is authenticated, show the ChatInterface; otherwise, prompt them to sign in */}
      {session?.user ? (
        <ChatInterface />
      ) : (
        <p>Please sign in to use the chatbot</p>
      )}
    </>
  );
};

export default Home; // Export the Home component as default
