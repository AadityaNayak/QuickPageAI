import React from "react";
import { auth } from "@/app/auth";

const ProfilePage = async () => {
  // Fetching the session for user details
  const session = await auth();

  return (
    <div className="profile-page">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-semibold text-center mb-8">Profile</h1>

          {session?.user ? (
            <div className="flex flex-col md:flex-row justify-center items-center md:items-center space-y-8 md:space-y-0">
              {/* Profile Image Section */}
              <div className="profile-image bg-white dark:bg-gray-800 rounded-full shadow-lg mb-8 md:mb-0 flex justify-center items-center overflow-hidden">
                <img
                  src={session.user.image || "/default-profile.png"}
                  alt={session?.user?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info Section */}
              <div className="user-info w-full md:w-3/5 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
                <div className="flex justify-between">
                  <span className="text-gray-800 dark:text-white font-semibold">
                    Username:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {session.user.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-800 dark:text-white font-semibold">
                    Email:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {session.user.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-center">
              User not signed in.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
