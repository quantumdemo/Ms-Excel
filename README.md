# LearnExcel - Mobile-First Interactive Excel Mastery

LearnExcel is a premium, mobile-only interactive learning platform designed to teach Microsoft Excel functions from beginner to professional levels.

## Features

- **Mobile-Only Experience**: Optimized for mobile devices with a dedicated desktop callback page.
- **Interactive Spreadsheet Engine**: Practice formulas in a real spreadsheet-like environment using Handsontable.
- **Gamified Learning**: Earn XP, track streaks, and unlock achievements as you progress.
- **Modern UI**: Dark mode first, glassmorphism, and smooth Framer Motion transitions.
- **Google Authentication**: Seamless login via Firebase.
- **Serverless Progress Sync**: Progress saved to Supabase with Redis-backed rate limiting.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Auth**: Firebase Authentication (Google Sign-In)
- **Database**: Supabase
- **Rate Limiting**: Upstash Redis
- **Spreadsheet**: Handsontable + hot-formula-parser

## Getting Started

1. Clone the repository.
2. Locate the `.env.example` file in the root directory.
3. Create a `.env.local` file by copying `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
4. Fill in your credentials in `.env.local`.
5. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example`).
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` on a mobile device or use browser developer tools to simulate a mobile screen.

## Deployment to Vercel

To deploy LearnExcel to Vercel, follow these steps:

### 1. Firebase Setup (Authentication)
LearnExcel uses Firebase for Google Sign-In.
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **Add project** and follow the steps.
3.  In the left sidebar, click **Build > Authentication**.
4.  Click **Get Started** and enable the **Google** sign-in method.
5.  Go to **Project Settings** (gear icon) > **General**.
6.  Under **Your apps**, click the `web` icon (`</>`) to register a new app.
7.  Copy the values from the `firebaseConfig` object into your `.env.local` file:
    - `apiKey` -> `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `authDomain` -> `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `projectId` -> `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    - `storageBucket` -> `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    - `messagingSenderId` -> `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    - `appId` -> `NEXT_PUBLIC_FIREBASE_APP_ID`

### 2. Upstash Setup (Rate Limiting)
LearnExcel uses Upstash Redis for API protection.
1.  Go to the [Upstash Console](https://console.upstash.com/).
2.  Click **Create Database**.
3.  Name it (e.g., `learn-excel-redis`) and select a region.
4.  Once created, scroll down to the **REST API** section in the **Details** tab.
5.  Copy the following values into your `.env.local`:
    - `UPSTASH_REDIS_REST_URL`
    - `UPSTASH_REDIS_REST_TOKEN`

### 2. Push to GitHub
Push your code to a GitHub repository.

### 3. Deploy on Vercel
1. Go to [Vercel](https://vercel.com/) and click "Add New Project".
2. Import your GitHub repository.
3. In the **Environment Variables** section, add all keys from `.env.example`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Click **Deploy**.

### 4. Configure Firebase Auth
In the Firebase Console, go to **Authentication > Settings > Authorized Domains** and add your Vercel deployment URL (e.g., `learn-excel.vercel.app`).

## Database Setup (Supabase)

To set up your database, you must manually run the schema script located in this project:

1.  Open your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Select your project.
3.  Click on the **SQL Editor** icon in the left sidebar (looks like `>_`).
4.  Click **New query**.
5.  Open the file `supabase/schema.sql` in this project and **copy all of its content**.
6.  Paste the code into the Supabase SQL Editor.
7.  Click the **Run** button at the bottom right.
8.  You should see a message saying "Success: Query returned 0 rows". Your tables are now ready!

## Feature Documentation

### Feedback & Roadmap
All user feedback (ratings/reviews) and roadmap feature votes are stored in the `feedback` and `feature_votes` tables in Supabase. You can view these directly in the Supabase Table Editor to inform your product roadmap.

### Donations
Donation links are configurable via environment variables. If a link is not provided, the app will show a "Coming soon" alert.
- **International**: Connects to your PayPal or Buy Me a Coffee profile.
- **Local (Nigeria)**: Features a direct bank transfer card and integration for Paystack payment pages.

## License

Created by Afeez Alimi.
