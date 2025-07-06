# Troubleshooting Guide - Signup Errors

## 🔍 Common Signup Issues and Solutions

### 1. **Environment Variables Missing**
**Error**: "Supabase configuration is missing"

**Solution**:
1. Create a `.env.local` file in your project root
2. Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. **Database Table Missing or Incorrect**
**Error**: "Failed to save user data"

**Solution**:
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Run the complete database setup script from `database/complete-database-setup.sql`
4. Or run this SQL to create the users table properly:

```sql
-- Drop existing table if it exists
DROP TABLE IF EXISTS users CASCADE;

-- Create the users table with all required columns
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

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON users
  FOR DELETE USING (auth.uid() = id);

-- Grant permissions
GRANT ALL ON users TO authenticated;
GRANT ALL ON users TO service_role;
```

**Common Database Errors:**
- **"relation 'users' does not exist"** - Table not created
- **"permission denied"** - RLS policies not set up correctly
- **"duplicate key value violates unique constraint"** - User already exists
- **"null value in column violates not-null constraint"** - Missing required fields

### 3. **Email Already Exists**
**Error**: "User already registered"

**Solution**:
- Use a different email address
- Or go to Supabase Dashboard > Authentication > Users and delete the existing user

### 4. **Password Too Weak**
**Error**: "Password must be at least 6 characters long"

**Solution**:
- Use a password with at least 6 characters
- Include a mix of letters, numbers, and symbols for better security

### 5. **Invalid Email Format**
**Error**: "Please enter a valid email address"

**Solution**:
- Ensure the email follows the format: `user@domain.com`
- Check for typos in the email address

### 6. **Network/Connection Issues**
**Error**: "Failed to create user account"

**Solution**:
1. Check your internet connection
2. Verify Supabase project is active
3. Check browser console for detailed error messages

### 7. **CORS Issues**
**Error**: "Cross-origin request blocked"

**Solution**:
1. Go to Supabase Dashboard > Settings > API
2. Add your domain to the allowed origins
3. For development: add `http://localhost:3000` and `http://localhost:3001`

## 🔧 Debugging Steps

### 1. **Check Browser Console**
1. Open browser developer tools (F12)
2. Go to Console tab
3. Try to sign up and look for error messages
4. The signup page now includes detailed console logging

### 2. **Verify Supabase Configuration**
1. Check `.env.local` file exists
2. Verify environment variables are correct
3. Test Supabase connection in browser console:
```javascript
// In browser console
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
```

### 3. **Test Database Connection**
1. Go to Supabase Dashboard > SQL Editor
2. Run: `SELECT * FROM users LIMIT 1;`
3. If this fails, the table doesn't exist
4. Run the `database/database-test.sql` script to verify your setup
5. Check the browser console for detailed error messages

### 4. **Check Authentication Settings**
1. Go to Supabase Dashboard > Authentication > Settings
2. Ensure "Enable email confirmations" is OFF for testing
3. Check "Site URL" is set correctly

## 🚀 Quick Fix Checklist

- [ ] `.env.local` file exists with correct Supabase credentials
- [ ] `users` table exists in Supabase database
- [ ] RLS policies are configured correctly
- [ ] Supabase project is active and accessible
- [ ] No typos in email or password
- [ ] Internet connection is stable
- [ ] Browser console shows no JavaScript errors

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the browser console** for detailed error messages
2. **Verify your Supabase project** is properly configured
3. **Test with a simple email/password** combination
4. **Check the network tab** in developer tools for failed requests

The signup page now includes comprehensive error handling and logging to help identify issues quickly! 