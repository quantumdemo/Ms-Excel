# Supabase Authentication Setup Guide

Since we have migrated from Firebase to Supabase Auth, you need to enable Google OAuth in your Supabase project.

### 1. Get Google Client ID and Secret
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Go to **APIs \u0026 Services \u003e Credentials**.
4. Click **Create Credentials \u003e OAuth client ID**.
5. Choose **Web application**.
6. Under **Authorized redirect URIs**, add your Supabase redirect URL. It looks like this:
   `https://[YOUR_PROJECT_ID].supabase.co/auth/v1/callback`
   *(You can find this in your Supabase Dashboard under Authentication \u003e Providers \u003e Google)*.
7. Click **Create** and copy the **Client ID** and **Client Secret**.

### 2. Enable Google Provider in Supabase
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Authentication \u003e Providers**.
3. Find **Google** in the list and enable it.
4. Paste your **Client ID** and **Client Secret**.
5. Save the changes.

### 3. Update Environment Variables
Ensure your environment variables in Vercel (or your hosting provider) are set correctly:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anonymous Key.

### Why we moved to Supabase Auth?
- **Unified Platform**: Database and Authentication are now in one place.
- **Improved Reliability**: Supabase Auth is often more stable for mobile redirects compared to Firebase when not fully configured.
- **Simplified Code**: We no longer need to bridge two different authentication providers.

### Note on Admin Access
Once you have enabled Google Auth, you can add your email to the `admins` table via the Supabase SQL Editor or Table Editor to gain access to the Admin Dashboard.
