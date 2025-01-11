"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-red-500 bg-opacity-75 text-white p-4 z-50">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold">Something went wrong!</h2>
        <p className="mt-4">Please try again later.</p>
        <button
          onClick={reset} // Attempt to recover by trying to re-render the segment
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
