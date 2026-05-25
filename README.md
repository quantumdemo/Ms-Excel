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
- **Styling**: Tailwind CSS
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

## Database Schema

The Supabase schema can be found in `supabase/schema.sql`.

## License

Created by Afeez Alimi.
