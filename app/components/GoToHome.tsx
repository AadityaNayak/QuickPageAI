import Link from "next/link";

export function GoToHome() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:focus:ring-gray-600"
      aria-label="Go to Home"
    >
      {/* Home logo */}
      <div className="flex items-center justify-center bg-gray-200 w-9 h-9 rounded-l dark:bg-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-gray-600 dark:text-gray-300"
        >
          <title>Go to Home</title>
          <desc>Home Icon</desc>
          <path
            d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
            className="fill-current"
          ></path>
        </svg>
      </div>
      <span>Home</span>
    </Link>
  );
}
