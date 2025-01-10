import React from "react";
import { SignIn } from "./GoogleSignInButton";
import { auth } from "@/app/auth";
import UsernameDropdown from "./UsernameDropdown";
import { SignOut } from "./SignOutButton";
import { GoToHome } from "./GoToHome";
import { ChatbotBtn } from "./ChatbotBtn";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-gray-100 border-b border-gray-200 dark:bg-gray-900 dark:border-violet-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
            QuickPageAI
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 ml-auto md:w-auto">
          {session?.user ? (
            <>
              {/* For large screens, all items in a row */}
              <div className="hidden md:flex items-center space-x-4">
                <ChatbotBtn />
                <UsernameDropdown userName={session.user.name} />
                <GoToHome />
                <SignOut />
              </div>

              {/* For smaller screens (medium screens and below) - stack items in 4 rows */}
              <div className="md:hidden flex flex-col w-full space-y-2">
                <div className="w-full p-2">
                  <ChatbotBtn />
                </div>
                <div className="w-full p-2">
                  <UsernameDropdown userName={session.user.name} />
                </div>
                <div className="w-full p-2">
                  <GoToHome />
                </div>
                <div className="w-full p-2">
                  <SignOut />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* For large screens when not logged in - display SignIn and GoToHome */}
              <div className="hidden md:flex items-center space-x-4">
                <GoToHome />
                <SignIn />
              </div>

              {/* For smaller screens when not logged in - stack items in 4 rows */}
              <div className="md:hidden flex flex-col w-full space-y-2">
                <div className="w-full p-2">
                  <GoToHome />
                </div>
                <div className="w-full p-2">
                  <SignIn />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
