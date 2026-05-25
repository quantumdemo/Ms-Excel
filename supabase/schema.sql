-- Create users table (linked to Firebase UID)
CREATE TABLE users (
  id TEXT PRIMARY KEY, -- Firebase UID is a string
  email TEXT UNIQUE,
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create progress table
CREATE TABLE progress (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  completed_lessons JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lesson_completion table for history
CREATE TABLE lesson_completion (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  points_earned INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  achievement_key TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
