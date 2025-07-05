# Supabase + Vercel Integration Setup

## Step 1: Configure Supabase Authentication

### 1.1 Set Site URL
1. Go to your Supabase project dashboard
2. Navigate to **Authentication → Settings**
3. In the **Site URL** field, enter your Vercel domain:
   ```
   https://your-project-name.vercel.app
   ```

### 1.2 Configure Redirect URLs
1. In the same Authentication Settings page
2. Add these URLs to **Redirect URLs**:
   ```
   https://your-project-name.vercel.app/auth/callback
   https://your-project-name.vercel.app/app
   https://your-project-name.vercel.app/
   ```

### 1.3 Additional Settings
- **Enable email confirmations**: Set to "No" for easier testing
- **Enable phone confirmations**: Set to "No" (not used in this app)
- **JWT expiry**: Keep default (3600 seconds)

## Step 2: Configure Row Level Security (RLS)

### 2.1 Enable RLS on All Tables
1. Go to **Table Editor** in Supabase
2. For each table, click the **RLS** toggle to enable it:
   - `profiles`
   - `user_data`
   - `habits`
   - `habit_statuses`
   - `points_categories`
   - `point_logs`
   - `points_rewards`
   - `points_redemptions`
   - `points_goals`
   - `habit_connections`

### 2.2 Verify RLS Policies
The SQL schema should have created these policies automatically. Verify they exist:

1. Go to **Authentication → Policies**
2. Check that each table has appropriate policies:
   - Users can only access their own data
   - Users can insert their own data
   - Users can update their own data

## Step 3: Set Up Database Triggers

### 3.1 Verify Automatic User Data Creation
The SQL schema includes triggers that automatically create user data when a new user signs up. Verify these exist:

1. Go to **SQL Editor**
2. Run this query to check triggers:
   ```sql
   SELECT trigger_name, event_manipulation, event_object_table
   FROM information_schema.triggers
   WHERE trigger_schema = 'public';
   ```

You should see triggers for:
- `handle_new_user` on `profiles` table
- `handle_user_data_creation` on `user_data` table

## Step 4: Configure CORS (if needed)

### 4.1 Add Vercel Domain to CORS
1. Go to **Settings → API**
2. In the **CORS** section, add your Vercel domain:
   ```
   https://your-project-name.vercel.app
   ```

## Step 5: Test the Integration

### 5.1 Test Authentication Flow
1. Visit your Vercel app
2. Try to sign up with a new email
3. Check if user data is automatically created in Supabase
4. Try to log in with the created account

### 5.2 Test Data Operations
1. Create a habit
2. Add points
3. Check if data appears in Supabase tables
4. Verify RLS is working (users can only see their own data)

## Step 6: Environment Variables in Vercel

Make sure these are set in your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add/verify these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Troubleshooting

### Common Issues

1. **"Invalid redirect URL" error**
   - Check that your Vercel domain is added to Supabase redirect URLs
   - Make sure the URL format is correct (https://)

2. **"CORS error"**
   - Add your Vercel domain to Supabase CORS settings
   - Check that environment variables are correct

3. **"User data not created"**
   - Verify triggers are set up correctly
   - Check RLS policies allow user data creation

4. **"Authentication failed"**
   - Verify Site URL is set correctly in Supabase
   - Check that environment variables match your Supabase project

### Verification Checklist

- [ ] Site URL is set to your Vercel domain
- [ ] Redirect URLs include your Vercel domain
- [ ] RLS is enabled on all tables
- [ ] RLS policies are in place
- [ ] Triggers are set up for automatic user data creation
- [ ] Environment variables are set in Vercel
- [ ] CORS includes your Vercel domain
- [ ] Authentication flow works
- [ ] Data operations work correctly

## Security Best Practices

1. **Never expose service role key** - Only use anon key in frontend
2. **Enable RLS** on all tables
3. **Use environment variables** for all sensitive data
4. **Regularly review RLS policies**
5. **Monitor authentication logs** in Supabase dashboard 