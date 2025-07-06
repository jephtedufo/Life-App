# Database Setup Checklist

## ✅ Complete Database Setup Guide

This checklist ensures your Supabase database is properly configured for the Life App.

---

## 🗄️ **Step 1: Create Users Table**

### 1.1 Go to Supabase Dashboard
- Visit [supabase.com](https://supabase.com)
- Sign in to your account
- Select your project

### 1.2 Open SQL Editor
- Click on **SQL Editor** in the left sidebar
- Click **New query**

### 1.3 Run Complete Setup Script
Copy and paste the entire script from `database/complete-database-setup.sql`:

```sql
-- Complete Database Setup for Life App
-- Run this entire script in your Supabase SQL Editor

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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;
```

### 1.4 Click "Run" to Execute
- Click the **Run** button (▶️) in the SQL Editor
- You should see: "Database setup completed successfully!"

---

## 🗂️ **Step 2: Create Storage Bucket**

### 2.1 Navigate to Storage
- Click on **Storage** in the left sidebar
- Click **Create a new bucket**

### 2.2 Configure Bucket
- **Name**: `profile-pictures`
- **Public bucket**: ✅ Check this box
- Click **Create bucket**

### 2.3 Verify Bucket Creation
- You should see the `profile-pictures` bucket in your storage list
- Status should show as "Public"

---

## 🔐 **Step 3: Configure Storage Policies**

### 3.1 Open SQL Editor Again
- Go back to **SQL Editor**
- Click **New query**

### 3.2 Run Storage Policies Script
```sql
-- Storage Policies for Profile Pictures
-- Run this in your Supabase SQL Editor

-- Policy to allow authenticated users to upload their own profile pictures
CREATE POLICY "Users can upload their own profile pictures" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy to allow public read access to profile pictures
CREATE POLICY "Profile pictures are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-pictures');

-- Policy to allow users to update their own profile pictures
CREATE POLICY "Users can update their own profile pictures" ON storage.objects
FOR UPDATE USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy to allow users to delete their own profile pictures
CREATE POLICY "Users can delete their own profile pictures" ON storage.objects
FOR DELETE USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 3.3 Click "Run" to Execute
- Click the **Run** button
- No error messages should appear

---

## ⚙️ **Step 4: Configure Authentication Settings**

### 4.1 Go to Authentication Settings
- Click on **Authentication** in the left sidebar
- Click on **Settings**

### 4.2 Configure Site URL
- **Site URL**: Set to your domain (e.g., `https://your-app.vercel.app`)
- For development: `http://localhost:3000`

### 4.3 Disable Email Confirmations (Optional)
- **Enable email confirmations**: Turn OFF for easier testing
- **Enable email change confirmations**: Turn OFF for easier testing

### 4.4 Save Settings
- Click **Save** at the bottom of the page

---

## 🔑 **Step 5: Get API Credentials**

### 5.1 Go to API Settings
- Click on **Settings** in the left sidebar
- Click on **API**

### 5.2 Copy Credentials
- **Project URL**: Copy the URL (starts with `https://`)
- **anon public**: Copy the anon key (starts with `eyJ`)

### 5.3 Create Environment File
Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## ✅ **Step 6: Verify Setup**

### 6.1 Test Database Connection
Run this in SQL Editor:
```sql
-- Test database setup
SELECT 
  'Users table exists' as check_item,
  EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') as status
UNION ALL
SELECT 
  'RLS is enabled' as check_item,
  EXISTS (SELECT FROM pg_tables WHERE tablename = 'users' AND rowsecurity = true) as status
UNION ALL
SELECT 
  'Storage bucket exists' as check_item,
  EXISTS (SELECT FROM storage.buckets WHERE id = 'profile-pictures') as status;
```

### 6.2 Expected Results
You should see:
- ✅ Users table exists: true
- ✅ RLS is enabled: true  
- ✅ Storage bucket exists: true

---

## 🚀 **Step 7: Test the Application**

### 7.1 Start Your App
```bash
npm run dev
```

### 7.2 Test Signup Flow
1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Fill in the form
4. Click "Create Account"
5. Should redirect to `/app`

### 7.3 Test Profile Features
1. Click the profile button (user icon)
2. Upload a profile picture
3. Edit profile information
4. Save changes

---

## 🔧 **Troubleshooting**

### Common Issues:

**"relation 'users' does not exist"**
- Run the complete setup script again
- Check that you're in the correct project

**"permission denied"**
- Verify RLS policies were created
- Check that the user is authenticated

**"bucket not found"**
- Create the `profile-pictures` bucket
- Ensure it's set to public

**"environment variables missing"**
- Create `.env.local` file
- Restart your development server

---

## 📋 **Final Checklist**

- [ ] Users table created with all columns
- [ ] RLS policies configured
- [ ] Storage bucket created
- [ ] Storage policies configured
- [ ] Authentication settings configured
- [ ] Environment variables set
- [ ] Database connection tested
- [ ] Signup flow working
- [ ] Profile features working

Your database is now ready for the Life App! 🎉 