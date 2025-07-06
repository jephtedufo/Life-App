-- Database Test Script for Life App
-- Run this in your Supabase SQL Editor to verify your setup

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

-- Summary
SELECT 
  'SUMMARY' as test_name,
  CASE 
    WHEN 
      EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') AND
      EXISTS (SELECT FROM pg_tables WHERE tablename = 'users' AND rowsecurity = true) AND
      EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures')
    THEN '✅ Database setup is complete and ready!'
    ELSE '❌ Database setup needs attention'
  END as result; 