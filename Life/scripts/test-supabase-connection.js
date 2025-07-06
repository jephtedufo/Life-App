// Test Supabase Connection
// This script tests if your Supabase connection is working

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing Supabase Connection...\n');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing environment variables');
  console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
  console.log('Supabase Key:', supabaseKey ? 'Set' : 'Missing');
  process.exit(1);
}

console.log('✅ Environment variables found');
console.log('URL:', supabaseUrl.substring(0, 30) + '...');
console.log('Key:', supabaseKey.substring(0, 20) + '...');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n🔍 Testing basic connection...');
    
    // Test 1: Check if we can connect to Supabase
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.log('❌ Connection failed:', error.message);
      
      if (error.message.includes('relation "users" does not exist')) {
        console.log('\n🔧 Solution: Run the emergency database fix script');
        console.log('1. Go to Supabase Dashboard > SQL Editor');
        console.log('2. Copy and paste the content from database/emergency-database-fix.sql');
        console.log('3. Run the script');
      } else if (error.message.includes('permission denied')) {
        console.log('\n🔧 Solution: RLS policies not configured');
        console.log('Run the emergency database fix script');
      } else {
        console.log('\n🔧 Solution: Check your Supabase project status');
        console.log('1. Go to Supabase Dashboard');
        console.log('2. Verify your project is active');
        console.log('3. Check your API keys are correct');
      }
    } else {
      console.log('✅ Connection successful!');
      console.log('✅ Users table exists and is accessible');
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

// Run the test
testConnection(); 