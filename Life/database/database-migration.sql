-- Database Migration Script for Life App
-- Run this to add new profile fields to existing users table

-- Add new columns to the users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'Africa/Nairobi';

-- Update existing records to have default timezone
UPDATE users 
SET timezone = 'Africa/Nairobi' 
WHERE timezone IS NULL;

-- Verify the migration
SELECT 
  'Migration completed successfully!' as status,
  COUNT(*) as total_users,
  COUNT(phone) as users_with_phone,
  COUNT(location) as users_with_location,
  COUNT(bio) as users_with_bio,
  COUNT(date_of_birth) as users_with_dob,
  COUNT(timezone) as users_with_timezone
FROM users; 