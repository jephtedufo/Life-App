# Life App - Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at https://vercel.com
3. **Supabase Account** - Sign up at https://supabase.com

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `life-app`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 1.2 Get Your Supabase Credentials
1. In your Supabase dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 1.3 Set Up Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase-schema.sql` from your project
3. Paste and run the SQL to create all required tables

## Step 2: Deploy to Vercel

### 2.1 Connect Your GitHub Repository
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing your Life App

### 2.2 Configure Environment Variables
In the Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**To add environment variables:**
1. Go to your Vercel project dashboard
2. Click **Settings** tab
3. Click **Environment Variables**
4. Add each variable:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase project URL
   - **Environment**: Production, Preview, Development
5. Repeat for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2.3 Deploy
1. Click **Deploy** in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-project.vercel.app`

## Step 3: Configure Supabase for Production

### 3.1 Set Up Row Level Security (RLS)
The SQL schema already includes RLS policies, but verify they're active:

1. Go to **Authentication → Policies** in Supabase
2. Ensure all tables have RLS enabled
3. Verify policies are in place for:
   - `profiles` table
   - `user_data` table
   - All other tables

### 3.2 Configure Authentication Settings
1. Go to **Authentication → Settings** in Supabase
2. Add your Vercel domain to **Site URL**:
   - `https://your-project.vercel.app`
3. Add redirect URLs:
   - `https://your-project.vercel.app/auth/callback`
   - `https://your-project.vercel.app/app`

## Step 4: Test Your Deployment

### 4.1 Test Authentication
1. Visit your deployed app
2. Try to sign up with a new account
3. Try to log in with the created account
4. Test the profile functionality

### 4.2 Test Core Features
1. Create habits
2. Add points
3. Test the calendar view
4. Verify data persistence

## Troubleshooting

### Common Issues

1. **"Email already exists"**
   - Check if the email is already registered in Supabase
   - Use a different email for testing

2. **"Invalid email or password"**
   - Verify environment variables are set correctly in Vercel
   - Check Supabase authentication settings

3. **Build Errors**
   - Check Vercel build logs
   - Ensure all dependencies are in `package.json`

4. **Database Connection Issues**
   - Verify Supabase URL and key are correct
   - Check if database schema is properly set up

### Environment Variables Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set in Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in Vercel
- [ ] Values match your Supabase project credentials
- [ ] Variables are available in all environments (Production, Preview, Development)

### Database Schema Checklist

- [ ] `profiles` table exists
- [ ] `user_data` table exists
- [ ] RLS policies are enabled
- [ ] Triggers are set up for automatic user data creation

## Security Notes

1. **Never commit `.env.local`** to your repository
2. **Use environment variables** in Vercel for all sensitive data
3. **Enable RLS** on all Supabase tables
4. **Regularly update dependencies** for security patches

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check Supabase logs in the dashboard
3. Verify environment variables are correct
4. Test locally with proper environment setup 