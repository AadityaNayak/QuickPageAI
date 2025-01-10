"use client";

import React, { useState } from "react";
import { SignIn } from "./GoogleSignInButton";
import UsernameDropdown from "./UsernameDropdown";
import { SignOut } from "./SignOutButton";
import { GoToHome } from "./GoToHome";
import { ChatbotBtn } from "./ChatbotBtn";

interface HamburgerMenuProps {
  isUserSignedIn: boolean;
  session: any; // Session data, passed down from Navbar
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isUserSignedIn, session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Hamburger Menu Button (Visible on small screens) */}
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-900 rounded-md dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600 md:hidden"
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-controls="navbar-default"
      >
        <span className="sr-only">Open menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      {/* Collapsible Mobile Menu (Visible only when the menu is open) */}
      {isMenuOpen && (
        <div
          id="navbar-default"
          className="md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50"
        >
          <div className="flex justify-end p-4">
            {/* Close Button for the mobile menu */}
            <button
              onClick={toggleMenu}
              className="text-white"
              aria-expanded="false"
              aria-controls="navbar-default"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col items-center py-4 space-y-4">
            {isUserSignedIn ? (
              <>
                <ChatbotBtn />
                <UsernameDropdown userName={session.user.name} />
                <GoToHome />
                <SignOut />
              </>
            ) : (
              <>
                <GoToHome />
                <SignIn /> {/* Only show SignIn here */}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
