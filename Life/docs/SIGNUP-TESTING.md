# Signup Testing Guide

## 🔍 Debugging Signup Issues

### Step 1: Check Environment Variables

1. **Verify `.env.local` exists and has correct values:**
   ```bash
   # Check if file exists
   ls .env.local
   
   # View contents (be careful not to commit this)
   cat .env.local
   ```

2. **Expected `.env.local` content:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### Step 2: Check Database Setup

1. **Run database test script in Supabase SQL Editor:**
   ```sql
   -- Copy and paste the content from database/database-test.sql
   ```

2. **Expected results:**
   - ✅ Users table exists: true
   - ✅ RLS is enabled: true
   - ✅ Storage bucket exists: true

### Step 3: Browser Console Debugging

1. **Open browser developer tools (F12)**
2. **Go to Console tab**
3. **Try to sign up and look for these messages:**

   **Success flow:**
   ```
   Attempting to sign up user: user@example.com
   User created successfully: [user-id]
   Inserting user data: {id: "...", first_name: "...", ...}
   User data inserted successfully: {...}
   User data saved successfully
   ```

   **Error flow:**
   ```
   Supabase auth error: {...}
   Database insert error: {...}
   Error details: {code: "...", message: "...", ...}
   ```

### Step 4: Common Error Messages

#### "Supabase configuration is missing"
- **Solution**: Check `.env.local` file exists and has correct values
- **Fix**: Run `node scripts/setup-env.js` and update credentials

#### "relation 'users' does not exist"
- **Solution**: Database table not created
- **Fix**: Run `database/complete-database-setup.sql` in Supabase

#### "permission denied"
- **Solution**: RLS policies not configured
- **Fix**: Run the complete database setup script

#### "duplicate key value violates unique constraint"
- **Solution**: User already exists
- **Fix**: Use different email or delete existing user in Supabase

#### "null value in column violates not-null constraint"
- **Solution**: Missing required fields
- **Fix**: Ensure all form fields are filled

### Step 5: Network Tab Debugging

1. **Open Network tab in developer tools**
2. **Try to sign up**
3. **Look for failed requests:**
   - Auth requests to Supabase
   - Database insert requests
   - Check response status codes

### Step 6: Test Database Connection

1. **Go to Supabase Dashboard > SQL Editor**
2. **Run this test query:**
   ```sql
   SELECT 
     'Database connection test' as test,
     NOW() as current_time,
     (SELECT COUNT(*) FROM users) as user_count;
   ```

### Step 7: Verify Authentication Settings

1. **Go to Supabase Dashboard > Authentication > Settings**
2. **Check:**
   - Site URL is set correctly
   - Email confirmations are disabled (for testing)
   - Redirect URLs are configured

### Step 8: Test with Simple Data

Try signing up with this test data:
- **First Name**: Test
- **Last Name**: User
- **Email**: test@example.com
- **Password**: test123456

### Step 9: Check File Structure

Ensure these files exist and are correct:
```
src/app/signup/page.tsx          # Signup page
lib/supabaseclient.ts            # Supabase client
.env.local                       # Environment variables
```

### Step 10: Restart Development Server

If you made changes to environment variables:
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## 🚨 Emergency Fixes

### If nothing works:

1. **Reset database:**
   ```sql
   -- Run in Supabase SQL Editor
   DROP TABLE IF EXISTS users CASCADE;
   -- Then run complete-database-setup.sql
   ```

2. **Clear browser data:**
   - Clear cookies and local storage
   - Try incognito/private mode

3. **Check Supabase project status:**
   - Ensure project is active
   - Check billing status
   - Verify API keys are correct

## 📞 Getting Help

If you're still having issues:

1. **Copy the exact error message from browser console**
2. **Check the Network tab for failed requests**
3. **Verify your Supabase project is working**
4. **Test with a simple email/password combination**

The signup page includes comprehensive error logging to help identify issues quickly! 