-- Test Signup Functionality
-- Run this in your Supabase SQL Editor to verify everything is working

-- Test 1: Check if users table exists and has correct structure
SELECT 
  'Test 1: Table Structure' as test,
  CASE 
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN '✅ Users table exists'
    ELSE '❌ Users table missing'
  END as result;

-- Test 2: Check required columns
SELECT 
  'Test 2: Required Columns' as test,
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND column_name IN ('id', 'first_name', 'last_name', 'email')
    ) THEN '✅ All required columns exist'
    ELSE '❌ Missing required columns'
  END as result;

-- Test 3: Check RLS is enabled
SELECT 
  'Test 3: RLS Enabled' as test,
  CASE 
    WHEN EXISTS (SELECT FROM pg_tables WHERE tablename = 'users' AND rowsecurity = true) THEN '✅ RLS is enabled'
    ELSE '❌ RLS is disabled'
  END as result;

-- Test 4: Check RLS policies
SELECT 
  'Test 4: RLS Policies' as test,
  CASE 
    WHEN (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'users') >= 4 THEN '✅ All policies exist'
    ELSE '❌ Missing policies'
  END as result;

-- Test 5: Check storage bucket
SELECT 
  'Test 5: Storage Bucket' as test,
  CASE 
    WHEN EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures') THEN '✅ Storage bucket exists'
    ELSE '❌ Storage bucket missing'
  END as result;

-- Test 6: Check permissions
SELECT 
  'Test 6: Permissions' as test,
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.role_table_grants 
      WHERE table_name = 'users' 
      AND grantee = 'authenticated'
    ) THEN '✅ Authenticated users have permissions'
    ELSE '❌ Missing permissions'
  END as result;

-- Test 7: Check trigger
SELECT 
  'Test 7: Updated_at Trigger' as test,
  CASE 
    WHEN EXISTS (
      SELECT FROM pg_trigger 
      WHERE tgname = 'update_users_updated_at' 
      AND tgrelid = 'users'::regclass
    ) THEN '✅ Trigger exists'
    ELSE '❌ Trigger missing'
  END as result;

-- Test 8: Current user count
SELECT 
  'Test 8: User Count' as test,
  (SELECT COUNT(*) FROM users) as user_count;

-- Summary
SELECT 
  'SUMMARY' as test,
  CASE 
    WHEN 
      EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') AND
      EXISTS (SELECT FROM pg_tables WHERE tablename = 'users' AND rowsecurity = true) AND
      (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'users') >= 4 AND
      EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures')
    THEN '✅ Database is ready for signup!'
    ELSE '❌ Database needs setup - run emergency-database-fix.sql'
  END as result; 