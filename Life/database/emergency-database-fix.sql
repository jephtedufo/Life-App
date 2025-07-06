-- Emergency Database Fix for Life App
-- Run this in your Supabase SQL Editor to fix user saving issues

-- Step 1: Drop and recreate the users table
DROP TABLE IF EXISTS users CASCADE;

-- Step 2: Create the users table with proper structure
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_picture TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  date_of_birth DATE,
  timezone TEXT DEFAULT 'Africa/Nairobi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can delete own profile" ON users;

-- Step 5: Create new policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON users
  FOR DELETE USING (auth.uid() = id);

-- Step 6: Grant permissions
GRANT ALL ON users TO authenticated;
GRANT ALL ON users TO service_role;

-- Step 7: Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Step 9: Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Step 10: Create storage policies
CREATE POLICY "Users can upload their own profile pictures" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'profile-pictures' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view profile pictures" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can update their own profile pictures" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'profile-pictures' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own profile pictures" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'profile-pictures' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Step 11: Verify the setup
SELECT 
  'Emergency database fix completed successfully!' as status,
  (SELECT COUNT(*) FROM users) as user_count,
  (SELECT COUNT(*) FROM storage.buckets WHERE id = 'profile-pictures') as storage_bucket_exists; 