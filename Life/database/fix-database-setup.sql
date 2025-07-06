-- Complete Database Fix Script for Life App
-- Run this entire script in your Supabase SQL Editor to fix all setup issues

-- Step 1: Drop existing table if it exists and recreate it properly
DROP TABLE IF EXISTS users CASCADE;

-- Step 2: Create the users table with all required columns
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

-- Step 5: Create policies for secure access
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

-- Step 7: Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 8: Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- Step 9: Create the updated_at trigger
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 10: Drop existing indexes if they exist
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_created_at;

-- Step 11: Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Step 12: Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Step 13: Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Users can upload their own profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile pictures" ON storage.objects;

-- Step 14: Create storage policies for profile pictures
CREATE POLICY "Users can upload their own profile pictures" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Profile pictures are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can update their own profile pictures" ON storage.objects
FOR UPDATE USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile pictures" ON storage.objects
FOR DELETE USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Step 15: Verify the setup
SELECT 'Database setup completed successfully!' as status;

-- Step 16: Run verification tests
SELECT 
  'VERIFICATION TESTS' as test_name,
  'Running all tests...' as result;

-- Test 1: Check if users table exists
SELECT 
  'Test 1: Users table exists' as test_name,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') as result;

-- Test 2: Check table structure
SELECT 
  'Test 2: Table structure' as test_name,
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND column_name IN ('id', 'first_name', 'last_name', 'email', 'profile_picture', 'phone', 'location', 'bio', 'date_of_birth', 'timezone', 'created_at', 'updated_at')
    ) THEN 'All required columns exist'
    ELSE 'Missing required columns'
  END as result;

-- Test 3: Check RLS is enabled
SELECT 
  'Test 3: RLS enabled' as test_name,
  EXISTS (SELECT FROM pg_tables WHERE tablename = 'users' AND rowsecurity = true) as result;

-- Test 4: Check RLS policies exist
SELECT 
  'Test 4: RLS policies' as test_name,
  CASE 
    WHEN (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'users') >= 4 THEN 'All policies exist'
    ELSE 'Missing policies'
  END as result;

-- Test 5: Check storage bucket exists
SELECT 
  'Test 5: Storage bucket' as test_name,
  EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures') as result;

-- Test 6: Check storage policies exist
SELECT 
  'Test 6: Storage policies' as test_name,
  CASE 
    WHEN (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage') >= 4 THEN 'All storage policies exist'
    ELSE 'Missing storage policies'
  END as result;

-- Test 7: Check trigger exists
SELECT 
  'Test 7: Updated_at trigger' as test_name,
  EXISTS (
    SELECT FROM pg_trigger 
    WHERE tgname = 'update_users_updated_at' 
    AND tgrelid = 'users'::regclass
  ) as result;

-- Test 8: Check indexes exist
SELECT 
  'Test 8: Indexes' as test_name,
  CASE 
    WHEN EXISTS (SELECT FROM pg_indexes WHERE tablename = 'users' AND indexname = 'idx_users_email')
    AND EXISTS (SELECT FROM pg_indexes WHERE tablename = 'users' AND indexname = 'idx_users_created_at')
    THEN 'All indexes exist'
    ELSE 'Missing indexes'
  END as result;

-- Final Summary
SELECT 
  'FINAL SUMMARY' as test_name,
  CASE 
    WHEN 
      EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') AND
      EXISTS (SELECT FROM pg_tables WHERE tablename = 'users' AND rowsecurity = true) AND
      EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures')
    THEN '✅ Database setup is complete and ready!'
    ELSE '❌ Database setup still needs attention'
  END as result; 