-- Create users table (linked to Firebase UID)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create progress table
CREATE TABLE progress (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  completed_lessons JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lesson_completion table
CREATE TABLE lesson_completion (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  points_earned INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  achievement_key TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER,
  category TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feature_votes table
CREATE TABLE feature_votes (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  feature_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, feature_id)
);

-- Create allowed_users table
CREATE TABLE allowed_users (
  email TEXT PRIMARY KEY,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE admins (
  email TEXT PRIMARY KEY,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE allowed_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Simple policies (assuming the app will use service role for admin tasks or we'll configure JWT claims)
-- RLS Policies
-- Since we use Firebase Auth, we need to allow the client (anon role)
-- to read the whitelist and admin tables to verify access.

-- RLS Policies
-- To handle security properly even when using client-side checks:

-- 1. Users can check if their OWN email is in the allowed_users table
CREATE POLICY "Users can check their own approval status"
  ON allowed_users FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- 2. Users can check if their OWN email is in the admins table
CREATE POLICY "Users can check their own admin status"
  ON admins FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- 3. Admins have full access to manage allowed_users
CREATE POLICY "Admins can manage all allowed_users"
  ON allowed_users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- 4. Admins can view the admins table
CREATE POLICY "Admins can view other admins"
  ON admins FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE email = auth.jwt() ->> 'email'
    )
  );
