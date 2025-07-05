# 🚀 Vercel + Supabase Quick Setup

## Essential Settings (5 minutes)

### 1. Supabase Authentication Settings
**Location**: Supabase Dashboard → Authentication → Settings

```
Site URL: https://your-project.vercel.app
Redirect URLs:
- https://your-project.vercel.app/auth/callback
- https://your-project.vercel.app/app
- https://your-project.vercel.app/
```

### 2. Vercel Environment Variables
**Location**: Vercel Dashboard → Settings → Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Supabase CORS Settings
**Location**: Supabase Dashboard → Settings → API

```
CORS Origins: https://your-project.vercel.app
```

### 4. Database Setup
**Location**: Supabase Dashboard → SQL Editor

```sql
-- Run the contents of supabase-schema.sql
-- This creates all tables, RLS policies, and triggers
```

## 🔍 Quick Test

1. **Deploy to Vercel** (if not done)
2. **Add environment variables** in Vercel
3. **Configure Supabase settings** (above)
4. **Visit your Vercel URL**
5. **Try to sign up** with a new email
6. **Check Supabase** - user should appear in `profiles` table

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid redirect URL" | Add Vercel domain to Supabase redirect URLs |
| "CORS error" | Add Vercel domain to Supabase CORS settings |
| "Email already exists" | Use different email or check if user exists |
| "Invalid credentials" | Verify environment variables in Vercel |

## 📋 Checklist

- [ ] Supabase Site URL set to Vercel domain
- [ ] Redirect URLs include Vercel domain
- [ ] Environment variables set in Vercel
- [ ] CORS includes Vercel domain
- [ ] Database schema run in Supabase
- [ ] RLS enabled on all tables
- [ ] Test signup/login works
- [ ] Test data creation works 