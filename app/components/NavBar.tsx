import React from "react";
import { SignIn } from "./GoogleSignInButton";
import { auth } from "@/app/auth";
import UsernameDropdown from "./UsernameDropdown";
import { SignOut } from "./SignOutButton";
import { GoToHome } from "./GoToHome";
import { ChatbotBtn } from "./ChatbotBtn";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-gray-100 border-b border-gray-200 dark:bg-gray-900 dark:border-violet-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
            QuickPageAI
          </span>
        </a>
        <div className="flex items-center space-x-4 md:order-2">
          {session?.user ? (
            <>
            <ChatbotBtn />
              <UsernameDropdown userName={session.user.name} />
              <GoToHome />
              <SignOut />
            </>
          ) : (
            <>
              <GoToHome />
              <SignIn />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
