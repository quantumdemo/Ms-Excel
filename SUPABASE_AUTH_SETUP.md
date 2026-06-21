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

### 4. How to Add Your First Admin Email
To access the Admin Dashboard, your email must be in the `admins` table. Follow these steps:

#### Method A: Using the Table Editor (Easiest)
1. Go to your **Supabase Dashboard**.
2. Click on **Table Editor** (the table icon on the left sidebar).
3. Select the `admins` table.
4. Click **Insert row** at the top.
5. In the `email` column, type the exact email address you will use to sign in with Google.
6. Click **Save**.

#### Method B: Using the SQL Editor
1. Click on **SQL Editor** (the code icon `>_` on the left sidebar).
2. Click **New query**.
3. Paste and run the following command (replace with your email):
   ```sql
   INSERT INTO admins (email) VALUES ('your-email@gmail.com');
   ```

### 5. Accessing the Admin Dashboard
Once your email is added:
1. Visit your website and sign in with Google.
2. Open the side menu (Hamburger menu).
3. You will now see a **Shield icon** labeled **Admin Portal**.
4. You can also visit it directly at `/admin-exclusive-portal`.
