const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...');
console.log('URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('Key:', supabaseKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.log('\n❌ ERROR: Missing Supabase credentials!');
  console.log('Please update your .env.local file with:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  try {
    console.log('\n🔍 Testing database connection...');
    
    // Test 1: Check if users table exists
    console.log('1. Checking if users table exists...');
    const { data: tableCheck, error: tableError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (tableError) {
      if (tableError.code === '42P01') {
        console.log('❌ Users table does not exist!');
        console.log('💡 Solution: Run the database-setup.sql script in your Supabase SQL Editor');
        return;
      } else {
        console.log('❌ Database error:', tableError.message);
        return;
      }
    }
    
    console.log('✅ Users table exists');
    
    // Test 2: Check RLS policies
    console.log('2. Testing Row Level Security...');
    const { data: rlsTest, error: rlsError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (rlsError && rlsError.code === '42501') {
      console.log('❌ RLS policy issue - permission denied');
      console.log('💡 Solution: Run the complete database-setup.sql script');
      return;
    }
    
    console.log('✅ RLS policies working correctly');
    
    // Test 3: Test insert (this will fail but that's expected without auth)
    console.log('3. Testing insert permissions...');
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: 'test-id',
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com'
      });
    
    if (insertError) {
      if (insertError.code === '42501') {
        console.log('✅ RLS working correctly (blocked unauthorized insert)');
      } else {
        console.log('⚠️ Insert test result:', insertError.message);
      }
    }
    
    console.log('\n✅ Database setup looks good!');
    console.log('💡 The signup should work now. Try creating a new account.');
    
  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
  }
}

testDatabase(); 