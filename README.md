# [QuickPageAI](https://quick-page-ai.vercel.app/)

QuickPageAI is a chatbot application designed to simplify the process of building landing pages. With QuickPageAI, you can generate well-structured HTML and CSS code within a single file and preview it live. The tool is ideal for rapid MVP creation and streamlining the design-to-code workflow.

## Features

- *HTML and CSS Generation*: Quickly generate clean and functional HTML and CSS code.
- *Live Preview*: See your code in action with an integrated live preview feature.
- *NextAuth.js Authentication*: Secure authentication using Google Sign-In.
- *Tailwind CSS Integration*: Leverage a modern utility-first framework for styling.
- *Powered by GenAI*: Utilize Google's Gemini API for AI-powered code generation.
- *Fast Deployment*: Hosted on Vercel for quick and reliable access.

---

## Tech Stack

- *Framework*: [Next.js](https://nextjs.org/)
- *Language*: TypeScript
- *UI Components*: Tailwind CSS
- *Authentication*: NextAuth.js (Auth.js)
- *GenAI API*: gemini by Google
- *Hosting*: [Vercel](https://vercel.com/)

---

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- A Google API client ID for authentication (Auth.js setup) [Refer here for Google OAuth credentials](https://developers.google.com/identity/protocols/oauth2)
- Access to Google's gemini API for AI functionalities [Refer here for API Key](https://aistudio.google.com/apikey)

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AadityaNayak/QuickPageAI.git
   cd QuickPageAI
   ```

---

### Getting Started

Follow these steps to set up and run the QuickPageAI application on your local machine.

1. After downloading the project folder, run:

   ```bash
   npm install
   ```

2. Run the following command to generate an `AUTH_SECRET`:

   ```bash
   npx auth secret
   ```
   
   This will add `AUTH_SECRET` to your `.env` file, respecting the framework conventions (e.g., Next.js’ `.env.local`).

3. Set up all the other values in your `.env.local` file. You can find a reference to them in the `.env.example` file in this repo. Here's what you'll need to configure:

   - `GOOGLE_GENERATIVE_AI_API_KEY`: [Refer here for API Key](https://aistudio.google.com/apikey)
   - `AUTH_SECRET`: Automatically created and assigned via `npx auth secret`
   - `AUTH_GOOGLE_ID`: [Refer here for Google OAuth credentials](https://developers.google.com/identity/protocols/oauth2)
   - `AUTH_GOOGLE_SECRET`: [Refer here for Google OAuth credentials](https://developers.google.com/identity/protocols/oauth2)

---

### Run the Application

Once you have configured your `.env.local` file and installed the dependencies, you can run the application locally by executing:

   ```bash
   npm run dev
   ```

Navigate to `http://localhost:3000` to view the app.

---

## Deployment

QuickPageAI is hosted on [Vercel](https://quick-page-ai.vercel.app/), ensuring fast and reliable deployment.

---

### Contributing

I welcome contributions to QuickPageAI! Feel free to fork the repo, create a new branch, and submit a pull request if you have suggestions, bug reports, or improvements.

---

