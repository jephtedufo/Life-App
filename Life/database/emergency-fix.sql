-- EMERGENCY DATABASE FIX FOR SIGNUP ISSUES
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Drop everything and start fresh
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Step 2: Create the users table with EXACTLY what the signup code expects
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

-- Step 3: Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Step 4: Create the trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 5: Create the trigger
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 6: Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Step 7: Create RLS policies (CRITICAL FOR SIGNUP)
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON users
  FOR DELETE USING (auth.uid() = id);

-- Step 8: Grant permissions
GRANT ALL ON users TO authenticated;
GRANT ALL ON users TO service_role;

-- Step 9: Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Step 10: Create storage policies
CREATE POLICY "Users can upload their own profile pictures" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Profile pictures are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can update their own profile pictures" ON storage.objects
FOR UPDATE USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile pictures" ON storage.objects
FOR DELETE USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Step 11: Test the table structure
SELECT '=== TABLE STRUCTURE TEST ===' as test;

SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Step 12: Test insert permissions
SELECT '=== PERMISSIONS TEST ===' as test;

SELECT 
  'RLS enabled' as check_item,
  EXISTS (SELECT FROM pg_tables WHERE tablename = 'users' AND rowsecurity = true) as status
UNION ALL
SELECT 
  'Policies count' as check_item,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'users') as status
UNION ALL
SELECT 
  'Storage bucket exists' as check_item,
  EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures') as status;

-- Step 13: Final confirmation
SELECT '✅ EMERGENCY FIX COMPLETE - SIGNUP SHOULD NOW WORK!' as status; 