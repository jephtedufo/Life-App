#!/usr/bin/env node

/**
 * Environment Setup Script for Life App
 * This script helps set up the environment variables for the project
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Life App Environment Setup\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists!');
  console.log('Please check if your Supabase credentials are correct.\n');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL');
  const hasSupabaseKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('✅ Supabase environment variables are configured');
  } else {
    console.log('❌ Missing Supabase environment variables');
  }
} else {
  console.log('📝 Creating .env.local file...');
  
  const envTemplate = `# Supabase Configuration
# Get these values from your Supabase project dashboard
# Settings > API > Project URL and anon public key

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Enable debug logging
# NEXT_PUBLIC_DEBUG=true
`;

  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local file');
  console.log('📋 Please update the file with your actual Supabase credentials');
}

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