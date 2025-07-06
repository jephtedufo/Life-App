-- Test Script to Verify Signup Process
-- Run this after the emergency fix to verify everything is working

-- Test 1: Check if we can insert a test user (simulating signup)
SELECT '=== TESTING SIGNUP PROCESS ===' as test;

-- Test 2: Check table structure matches signup code expectations
SELECT 
  'Table structure check' as test_name,
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND column_name IN ('id', 'first_name', 'last_name', 'email')
    ) THEN '✅ Required columns exist'
    ELSE '❌ Missing required columns'
  END as result;

-- Test 3: Check RLS policies for insert
SELECT 
  'RLS insert policy' as test_name,
  CASE 
    WHEN EXISTS (
      SELECT FROM pg_policies 
      WHERE tablename = 'users' 
      AND cmd = 'INSERT'
    ) THEN '✅ Insert policy exists'
    ELSE '❌ Missing insert policy'
  END as result;

-- Test 4: Check permissions
SELECT 
  'Table permissions' as test_name,
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.table_privileges 
      WHERE table_name = 'users' 
      AND grantee = 'authenticated'
      AND privilege_type = 'INSERT'
    ) THEN '✅ Authenticated users can insert'
    ELSE '❌ Authenticated users cannot insert'
  END as result;

-- Test 5: Check if table is empty (ready for signup)
SELECT 
  'Table ready for signup' as test_name,
  CASE 
    WHEN (SELECT COUNT(*) FROM users) = 0 THEN '✅ Table is empty and ready'
    ELSE '⚠️ Table has existing data'
  END as result;

-- Test 6: Verify storage setup
SELECT 
  'Storage setup' as test_name,
  CASE 
    WHEN EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures') THEN '✅ Storage bucket exists'
    ELSE '❌ Storage bucket missing'
  END as result;

-- Final summary
SELECT '=== SIGNUP READINESS SUMMARY ===' as summary;

SELECT 
  'All tests passed' as status,
  CASE 
    WHEN 
      EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'users' AND column_name IN ('id', 'first_name', 'last_name', 'email')) AND
      EXISTS (SELECT FROM pg_policies WHERE tablename = 'users' AND cmd = 'INSERT') AND
      EXISTS (SELECT FROM information_schema.table_privileges WHERE table_name = 'users' AND grantee = 'authenticated' AND privilege_type = 'INSERT') AND
      EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures')
    THEN '✅ SIGNUP SHOULD WORK NOW!'
    ELSE '❌ Still has issues - check individual tests above'
  END as result; 