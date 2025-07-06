#!/usr/bin/env node

/**
 * Environment Setup Script for Life App
 * This script helps set up the environment variables for the project
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment variables for Life App...\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  .env.local already exists. Please update it manually with your Supabase credentials.');
  console.log('📁 File location:', envPath);
} else {
  // Create .env.local template
  const envContent = `# Supabase Configuration
# Replace these with your actual Supabase project credentials
# Get these from: https://supabase.com/dashboard/project/[YOUR-PROJECT-ID]/settings/api

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Instructions:
# 1. Go to your Supabase Dashboard
# 2. Select your project
# 3. Go to Settings > API
# 4. Copy the "Project URL" and "anon public" key
# 5. Replace the values above
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local template');
  console.log('📁 File location:', envPath);
}

console.log('\n📋 Next steps:');
console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard');
console.log('2. Select your project');
console.log('3. Go to Settings > API');
console.log('4. Copy the "Project URL" and "anon public" key');
console.log('5. Update .env.local with your actual credentials');
console.log('6. Run the database setup script in Supabase SQL Editor');
console.log('7. Restart your development server: npm run dev');

console.log('\n📚 Next Steps:');
console.log('1. Go to your Supabase Dashboard');
console.log('2. Navigate to Settings > API');
console.log('3. Copy your Project URL and anon public key');
console.log('4. Update the .env.local file with your credentials');
console.log('5. Run the database setup scripts in docs/DATABASE-SETUP-CHECKLIST.md');
console.log('6. Start your app with: npm run dev\n');

console.log('🔗 Useful Links:');
console.log('- Supabase Dashboard: https://supabase.com/dashboard');
console.log('- Database Setup Guide: docs/DATABASE-SETUP-CHECKLIST.md');
console.log('- Troubleshooting Guide: docs/TROUBLESHOOTING.md'); 