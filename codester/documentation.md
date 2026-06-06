# LearnExcel - Documentation

## Introduction
LearnExcel is a mobile-first web application designed for interactive Excel learning. This documentation will guide you through the setup and deployment process.

## Prerequisites
Before you begin, ensure you have the following accounts and tools:
- Node.js 18+ and npm
- [Firebase Account](https://firebase.google.com/)
- [Supabase Account](https://supabase.com/)
- [Upstash Account](https://upstash.com/) (for Redis)

## Installation

1. **Extract the source code:**
   ```bash
   unzip main.zip
   cd learn-excel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

   # Redis (Upstash)
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

## Database Setup (Supabase)

Run the following SQL in your Supabase SQL Editor to create the necessary tables:

```sql
-- Users Table (id matches Firebase UID)
create table users (
  id text primary key,
  email text,
  display_name text,
  photo_url text,
  updated_at timestamp with time zone default now()
);

-- Progress Table
create table progress (
  user_id text primary key references users(id),
  xp integer default 0,
  streak integer default 0,
  completed_lessons jsonb default '[]'::jsonb,
  updated_at timestamp with time zone default now()
);
```

## Authentication (Firebase)
1. Create a new Firebase project.
2. Enable **Google Auth** in the Authentication section.
3. Add a **Web App** to your Firebase project to get your configuration keys.

## Deployment
The easiest way to deploy LearnExcel is via [Vercel](https://vercel.com):
1. Connect your GitHub repository or upload the folder.
2. Add the environment variables in the Vercel dashboard.
3. Deploy!

## Customization
- **Lessons:** Lesson data is located in `data/lessons/`. You can add or modify lessons by editing these JS files.
- **Styling:** The project uses Tailwind CSS. Main configuration is in `tailwind.config.js`.

## Support
For any questions or support, please contact the developer via the Codester message system.
