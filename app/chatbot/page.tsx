import ChatInterface from "../components/ChatInterface";
import { auth } from "@/app/auth";
const Home = async () => {
  const session = await auth();
  return (
    <>
    {session?.user ? <ChatInterface /> : <p>Please Sign it to use Chatbot</p>}
    </>
  );
};

export default Home
