# Setup Guide - New Features

## 🚀 New Features Added

### 1. **Landing Page for Unauthenticated Users**
- Users who are not signed up or logged in will see a landing page with "Sign Up" and "Login" buttons
- The page automatically checks authentication status and redirects accordingly

### 2. **Profile Button in Navigation**
- Added a profile button next to the navigation buttons in the AddHabitForm
- Shows user's profile picture if available, otherwise shows a user icon
- Opens a comprehensive profile modal with all editing options

### 3. **Comprehensive Profile Modal**
- **Personal Information**: First name, last name, email
- **Profile Picture**: Upload and manage profile pictures
- **Contact Details**: Phone number, location
- **Additional Info**: Bio, date of birth, timezone
- **Actions**: Save changes, sign out

### 4. **Authentication Guards**
- Protected app routes with AuthGuard component
- Automatic redirects for unauthenticated users
- Real-time authentication state monitoring

---

## 🗄️ Database Setup

### Step 1: Update Users Table
Run this SQL in your Supabase SQL editor:

```sql
-- Add new columns to the users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'Africa/Nairobi';
```

### Step 2: Create Storage Bucket
1. Go to your Supabase Dashboard
2. Navigate to **Storage**
3. Click **Create a new bucket**
4. Name it: `profile-pictures`
5. Set it to **Public**
6. Click **Create bucket**

### Step 3: Configure Storage Policies
Run these SQL commands in your Supabase SQL editor:

```sql
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

---

## 🔧 Component Updates

### Files Modified:
1. **`src/app/page.tsx`** - Landing page for unauthenticated users
2. **`src/app/app/page.tsx`** - Added AuthGuard wrapper
3. **`src/frontend/components/forms/AddHabitForm.tsx`** - Added profile button
4. **`src/frontend/components/modals/ProfileModal.tsx`** - New comprehensive profile modal
5. **`src/frontend/components/AuthGuard.tsx`** - New authentication guard component

### New Components:
- **`ProfileModal`** - Complete profile editing interface
- **`AuthGuard`** - Route protection component

---

## 🎯 How It Works

### Authentication Flow:
1. **Landing Page** (`/`) - Shows Sign Up/Login buttons for unauthenticated users
2. **Sign Up** (`/signup`) - User registration
3. **Login** (`/login`) - User authentication
4. **App** (`/app`) - Protected main application

### Profile Management:
1. **Profile Button** - Located next to navigation buttons
2. **Profile Modal** - Comprehensive editing interface
3. **Profile Picture** - Upload and display user photos
4. **Data Persistence** - All changes saved to Supabase

---

## 🚀 Testing

### Test the Authentication Flow:
1. Visit `/` - Should see landing page with Sign Up/Login buttons
2. Click "Sign Up" - Should go to registration page
3. Create account - Should redirect to `/app`
4. Sign out - Should return to landing page

### Test the Profile Features:
1. Click the profile button (user icon) in navigation
2. Upload a profile picture
3. Edit personal information
4. Save changes
5. Verify the profile button now shows your picture

---

## 🔒 Security Features

- **Route Protection**: All app routes require authentication
- **Profile Isolation**: Users can only edit their own profiles
- **File Upload Security**: Profile pictures are user-specific
- **Session Management**: Automatic logout and redirect handling

---

## 📝 Notes

- The profile modal includes all standard profile editing features
- Profile pictures are stored in Supabase Storage
- Timezone defaults to Africa/Nairobi (can be changed)
- All profile data is stored in the `users` table
- Authentication state is monitored in real-time

Your Life App now has a complete authentication system with profile management! 🎉 