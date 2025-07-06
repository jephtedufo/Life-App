# Life App Deployment Guide

## 🚀 Quick Fix for Vercel Build Issues

### Issue: Module not found: Can't resolve '../../../lib/supabaseclient'

This error occurs because the `lib/supabaseclient.ts` file is missing from your GitHub repository.

### Solution Steps:

#### 1. Commit and Push Your Changes

```bash
# Add all changes to git
git add .

# Commit the changes
git commit -m "Fix: Add missing supabaseclient.ts and environment variables"

# Push to GitHub
git push origin master
```

#### 2. Verify Files Are in Repository

Make sure these files exist in your GitHub repository:
- ✅ `lib/supabaseclient.ts`
- ✅ `.env.local` (with your Supabase credentials)
- ✅ `database-setup.sql`

#### 3. Set Environment Variables in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your Life App project**
3. **Go to Settings > Environment Variables**
4. **Add these variables**:

   **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   **Value**: `https://maktxzflrcvdpziuzgcs.supabase.co`
   **Environment**: Production, Preview, Development

   **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ha3R4emZscmN2ZHB6aXV6Z2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MjU2MzYsImV4cCI6MjA2NzMwMTYzNn0.ICO1xdoIiUvp0HL8GB2pCjpY1PFFSYeHEkyAV3t3zZM`
   **Environment**: Production, Preview, Development

5. **Click "Save"**

#### 4. Set Up Database in Supabase

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/maktxzflrcvdpziuzgcs
2. **Open SQL Editor**
3. **Copy and paste** the entire contents of `database-setup.sql`
4. **Click "Run"**

#### 5. Redeploy on Vercel

1. **Go to your Vercel project dashboard**
2. **Click "Redeploy"** or **"Deploy"**
3. **Wait for the build to complete**

### Expected Result

After following these steps:
- ✅ Build should succeed
- ✅ App should be accessible at your Vercel URL
- ✅ Signup functionality should work

### Troubleshooting

#### If build still fails:

1. **Check GitHub repository** - ensure all files are committed and pushed
2. **Verify environment variables** in Vercel dashboard
3. **Check Supabase project** is active and accessible
4. **Run database setup script** in Supabase SQL Editor

#### If signup still doesn't work:

1. **Check browser console** (F12) for error messages
2. **Verify database tables exist** in Supabase
3. **Test with a new email address**

### Files That Must Exist

```
Life/
├── lib/
│   └── supabaseclient.ts          ← This was missing!
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── app/page.tsx
│   └── frontend/
│       └── components/
│           ├── AuthGuard.tsx
│           └── forms/
│               └── AddHabitForm.tsx
├── .env.local                     ← With your Supabase credentials
├── database-setup.sql             ← For database setup
└── package.json
```

### Quick Commands

```bash
# Test locally
npm run build
npm run dev

# Deploy to Vercel
vercel --prod

# Check status
vercel ls
```

### Need Help?

If you're still having issues:
1. Check the Vercel build logs for specific error messages
2. Verify all files are in your GitHub repository
3. Ensure environment variables are set in Vercel
4. Run the database setup script in Supabase 