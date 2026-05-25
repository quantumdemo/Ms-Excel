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
2. Install dependencies:
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

### 1. Prepare Your Environment
Ensure you have accounts and projects set up for:
- [Firebase](https://console.firebase.google.com/) (Enable Google Auth)
- [Supabase](https://supabase.com/) (Run `supabase/schema.sql` in the SQL Editor)
- [Upstash](https://upstash.com/) (Create a Redis database)

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

## Database Schema

The Supabase schema can be found in `supabase/schema.sql`. Run this script in your Supabase SQL Editor to set up the necessary tables.

## License

Created by Afeez Alimi.
