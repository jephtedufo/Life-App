# Quick Vercel Setup Checklist

## 🚀 Deploy to Vercel (5 minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Click "Deploy"

### 3. Add Environment Variables
In your Vercel project dashboard:
1. Go to **Settings → Environment Variables**
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your-supabase-url
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your-supabase-key

### 4. Redeploy
Click "Redeploy" in Vercel to apply environment variables.

## 🔧 Supabase Setup (3 minutes)

### 1. Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in details and create

### 2. Get Credentials
1. Go to **Settings → API**
2. Copy Project URL and anon key
3. Add to Vercel environment variables

### 3. Run Database Schema
1. Go to **SQL Editor** in Supabase
2. Copy contents of `supabase-schema.sql`
3. Paste and run

## ✅ Test Your App
Visit your Vercel URL and test:
- [ ] Sign up with new account
- [ ] Log in
- [ ] Create habits
- [ ] Add points

## 🆘 Need Help?
- Check Vercel build logs
- Verify environment variables
- Test Supabase connection 