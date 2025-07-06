# Life App Setup Guide

## Quick Setup Steps

### 1. Set up Supabase Database

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project** (or create a new one)
3. **Go to SQL Editor** (in the left sidebar)
4. **Copy and paste** the entire contents of `database-setup.sql` into the SQL Editor
5. **Click "Run"** to execute the script

### 2. Get Your Supabase Credentials

1. **Go to Settings > API** in your Supabase dashboard
2. **Copy the following values**:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3. Update Environment Variables

1. **Open `.env.local`** in your project root
2. **Replace the placeholder values** with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

### 4. Test the Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Go to** http://localhost:3001
3. **Try to sign up** with a new account
4. **Check the browser console** (F12) for any error messages

## Common Issues & Solutions

### "users table does not exist"
- **Solution**: Run the `database-setup.sql` script in your Supabase SQL Editor

### "Permission denied"
- **Solution**: Make sure you ran the complete database setup script (it includes RLS policies)

### "Supabase configuration is missing"
- **Solution**: Check that your `.env.local` file has the correct Supabase URL and key

### "A user with this email already exists"
- **Solution**: Use a different email address or delete the existing user from Supabase Dashboard > Authentication > Users

## Database Schema

The setup script creates these tables:
- `users` - User profiles
- `habits` - User habits
- `habit_logs` - Daily habit completion logs
- `tasks` - User tasks
- `goals` - User goals
- `rewards` - Available rewards
- `points_logs` - Points history

All tables have proper Row Level Security (RLS) policies to ensure users can only access their own data.

## Need Help?

If you're still having issues:
1. Check the browser console (F12) for detailed error messages
2. Verify your Supabase project is active
3. Make sure you have the correct environment variables
4. Try running the database setup script again 