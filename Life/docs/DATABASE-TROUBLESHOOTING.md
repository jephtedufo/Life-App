# Database Troubleshooting Guide

## 🔧 Quick Fix for "Database setup needs attention"

If you're getting "❌ Database setup needs attention" when running the database test, follow these steps:

### 🚀 **Step 1: Run the Complete Fix Script**

1. **Go to your Supabase Dashboard**
2. **Navigate to SQL Editor**
3. **Click "New query"**
4. **Copy and paste the entire content from `database/fix-database-setup.sql`**
5. **Click "Run"**

This script will:
- ✅ Drop and recreate the users table properly
- ✅ Enable Row Level Security (RLS)
- ✅ Create all required policies
- ✅ Set up storage bucket and policies
- ✅ Create triggers and indexes
- ✅ Run verification tests

### 🔍 **Step 2: Verify the Fix**

After running the fix script, you should see:
```
✅ Database setup is complete and ready!
```

### 🚨 **If You Still Get Errors**

#### **Common Issues and Solutions:**

**1. "relation 'users' does not exist"**
- **Solution**: Run the complete fix script again
- **Check**: Make sure you're in the correct Supabase project

**2. "permission denied"**
- **Solution**: The fix script includes proper permissions
- **Check**: Ensure you're running as the database owner

**3. "bucket not found"**
- **Solution**: The fix script creates the storage bucket automatically
- **Check**: Look for "Storage bucket" test result

**4. "policies missing"**
- **Solution**: The fix script creates all required policies
- **Check**: Look for "RLS policies" and "Storage policies" test results

### 📋 **Manual Verification Steps**

If you want to check each component manually:

#### **Check Users Table:**
```sql
SELECT * FROM users LIMIT 1;
```

#### **Check RLS Policies:**
```sql
SELECT * FROM pg_policies WHERE tablename = 'users';
```

#### **Check Storage Bucket:**
```sql
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';
```

#### **Check Storage Policies:**
```sql
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
```

### 🎯 **Expected Results After Fix**

When you run `database/database-test.sql` again, you should see:

```
Test 1: Users table exists          → true
Test 2: Table structure             → All required columns exist
Test 3: RLS enabled                 → true
Test 4: RLS policies                → All policies exist
Test 5: Storage bucket              → true
Test 6: Storage policies            → All storage policies exist
Test 7: Updated_at trigger          → true
Test 8: Indexes                     → All indexes exist
FINAL SUMMARY                       → ✅ Database setup is complete and ready!
```

### 🚀 **After Database is Fixed**

1. **Test the signup page** in your app
2. **Try creating a new user account**
3. **Check if profile features work**
4. **Verify data is being saved correctly**

### 📞 **Still Having Issues?**

If the fix script doesn't resolve the issue:

1. **Check your Supabase project status** (active, not paused)
2. **Verify you have the correct permissions** (database owner)
3. **Try running the script in smaller chunks** if there are specific errors
4. **Contact Supabase support** if it's a platform issue

The `database/fix-database-setup.sql` script is designed to handle all common setup issues automatically! 🎉 