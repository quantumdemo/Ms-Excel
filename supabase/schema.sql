-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress Table
CREATE TABLE progress (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  completed_lessons JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lesson Completion Table
CREATE TABLE lesson_completion (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  points_earned INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements Table
CREATE TABLE achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_key TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback Table
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER,
  category TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feature Votes Table
CREATE TABLE feature_votes (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  feature_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, feature_id)
);

-- Whitelist Table
CREATE TABLE allowed_users (
  email TEXT PRIMARY KEY,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Emails Table
CREATE TABLE admins (
  email TEXT PRIMARY KEY,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_completion ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE allowed_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- POLICIES

-- Users can manage their own data
CREATE POLICY "Manage own user profile" ON users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Manage own progress" ON progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own completions" ON lesson_completion FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own achievements" ON achievements FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own votes" ON feature_votes FOR ALL USING (auth.uid() = user_id);

-- Feedback
CREATE POLICY "Users can insert feedback" ON feedback FOR INSERT WITH CHECK (true);

-- Whitelist check (Users can only check their own email)
CREATE POLICY "Check own approval" ON allowed_users FOR SELECT USING (LOWER(email) = LOWER(auth.jwt() ->> 'email'));

-- Admin check (Users can only check their own email to avoid recursion)
CREATE POLICY "Check own admin status" ON admins FOR SELECT USING (LOWER(email) = LOWER(auth.jwt() ->> 'email'));

-- Admin-only management policies
-- Note: We use auth.jwt() to check if the current user's email is in the admins table.
-- To avoid recursion, we check against the auth table or use a simpler check.
CREATE POLICY "Admins can manage allowed_users"
  ON allowed_users FOR ALL
  USING (EXISTS (SELECT 1 FROM admins WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')));

CREATE POLICY "Admins can view feedback"
  ON feedback FOR SELECT
  USING (EXISTS (SELECT 1 FROM admins WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')));

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (EXISTS (SELECT 1 FROM admins WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')));
