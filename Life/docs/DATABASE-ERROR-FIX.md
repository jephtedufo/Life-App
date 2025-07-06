# 🔧 Database Error Fix Guide

## 🚨 "Database error saving new user" - Complete Solution

This guide will fix the database error that occurs when trying to save new users during signup.

---

## 📋 Quick Fix Checklist

### Step 1: Environment Variables
- [ ] `.env.local` file exists with correct Supabase credentials
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set correctly
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set correctly

### Step 2: Database Setup
- [ ] Users table exists in Supabase
- [ ] RLS (Row Level Security) is enabled
- [ ] RLS policies are configured correctly
- [ ] Storage bucket for profile pictures exists

### Step 3: Test the Fix
- [ ] Run database test script
- [ ] Try signing up with a new user
- [ ] Check browser console for errors

---

## 🛠️ Step-by-Step Fix

### 1. **Set Up Environment Variables**

Run this command to create the environment file:
```bash
node scripts/setup-env.js
```

Then manually edit `.env.local` with your actual Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**To get your credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings > API**
4. Copy the "Project URL" and "anon public" key

### 2. **Fix Database Setup**

Go to your Supabase Dashboard > SQL Editor and run the emergency fix script:

```sql
-- Copy and paste the entire content from database/emergency-database-fix.sql
```

This script will:
- Drop and recreate the users table with proper structure
- Enable Row Level Security
- Create all necessary policies
- Set up storage bucket for profile pictures
- Create indexes and triggers

### 3. **Test the Database**

Run the test script in Supabase SQL Editor:

```sql
-- Copy and paste the content from database/test-signup.sql
```

You should see all tests pass with ✅ marks.

### 4. **Restart Development Server**

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### 5. **Test Signup**

1. Go to your app's signup page
2. Try creating a new account
3. Check browser console (F12) for any errors

---

## 🔍 Debugging Steps

### Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Try to sign up
4. Look for error messages like:
   - "Supabase configuration is missing"
   - "Failed to save user data"
   - "permission denied"
   - "relation 'users' does not exist"

### Common Error Messages and Solutions

#### "Supabase configuration is missing"
**Solution**: Check `.env.local` file exists and has correct values

#### "relation 'users' does not exist"
**Solution**: Run the emergency database fix script

#### "permission denied"
**Solution**: RLS policies not configured - run the emergency fix script

#### "duplicate key value violates unique constraint"
**Solution**: User already exists - use a different email

#### "null value in column violates not-null constraint"
**Solution**: Missing required fields - ensure all form fields are filled

---

## 🚨 Emergency Fix Commands

If you're still having issues, run these commands in order:

### 1. Reset Environment
```bash
node scripts/setup-env.js
```

### 2. Run Emergency Database Fix
Copy the entire content from `database/emergency-database-fix.sql` and run it in Supabase SQL Editor.

### 3. Test Database
Copy the content from `database/test-signup.sql` and run it in Supabase SQL Editor.

### 4. Restart Server
```bash
npm run dev
```

---

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the browser console** for detailed error messages
2. **Verify your Supabase project** is active and accessible
3. **Test with a simple email/password** combination
4. **Check the network tab** in developer tools for failed requests

### Test Data
Try signing up with this test data:
- **First Name**: Test
- **Last Name**: User
- **Email**: test@example.com
- **Password**: test123456

---

## ✅ Success Indicators

When everything is working correctly, you should see:

1. **Database test results**: All tests show ✅
2. **Signup process**: No errors in browser console
3. **User creation**: User appears in Supabase Authentication > Users
4. **Profile data**: User data appears in Supabase Table Editor > users table
5. **Redirect**: User is redirected to `/app` after successful signup

---

## 🔄 If Nothing Works

As a last resort:

1. **Delete and recreate your Supabase project**
2. **Run the emergency database fix script** on the new project
3. **Update your environment variables** with the new project credentials
4. **Test signup again**

The emergency fix script is designed to work with a fresh Supabase project and will set up everything correctly. 