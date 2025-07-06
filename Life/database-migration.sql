-- Database Migration for Profile Fields
-- Run this in your Supabase SQL editor

-- Add new columns to the users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'Africa/Nairobi';

-- Create storage bucket for profile pictures (if it doesn't exist)
-- Note: You'll need to create this manually in Supabase Dashboard
-- Go to Storage > Create a new bucket named 'profile-pictures'
-- Set it to public and configure RLS policies

-- RLS Policy for profile pictures (run this after creating the bucket)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile-pictures', 'profile-pictures', true);

-- Policy to allow authenticated users to upload their own profile pictures
-- CREATE POLICY "Users can upload their own profile pictures" ON storage.objects
-- FOR INSERT WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy to allow public read access to profile pictures
-- CREATE POLICY "Profile pictures are publicly accessible" ON storage.objects
-- FOR SELECT USING (bucket_id = 'profile-pictures');

-- Policy to allow users to update their own profile pictures
-- CREATE POLICY "Users can update their own profile pictures" ON storage.objects
-- FOR UPDATE USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy to allow users to delete their own profile pictures
-- CREATE POLICY "Users can delete their own profile pictures" ON storage.objects
-- FOR DELETE USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]); 