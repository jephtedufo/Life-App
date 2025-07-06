const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnosing Signup Issues...\n');

// Check 1: Environment Variables
console.log('📋 Check 1: Environment Variables');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL');
  const hasSupabaseKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('✅ .env.local exists with Supabase variables');
    
    // Check if they're placeholder values
    const hasPlaceholderUrl = envContent.includes('your-project-id.supabase.co');
    const hasPlaceholderKey = envContent.includes('your_anon_key_here');
    
    if (hasPlaceholderUrl || hasPlaceholderKey) {
      console.log('⚠️  WARNING: Using placeholder values in .env.local');
      console.log('   You need to replace with actual Supabase credentials');
    } else {
      console.log('✅ Environment variables appear to be configured');
    }
  } else {
    console.log('❌ Missing Supabase environment variables');
  }
} else {
  console.log('❌ .env.local file not found');
}

// Check 2: Supabase Client
console.log('\n📋 Check 2: Supabase Client Configuration');
const supabasePath = path.join(process.cwd(), 'lib', 'supabaseclient.ts');
if (fs.existsSync(supabasePath)) {
  console.log('✅ Supabase client file exists');
  const supabaseContent = fs.readFileSync(supabasePath, 'utf8');
  if (supabaseContent.includes('createClient')) {
    console.log('✅ Supabase client is properly configured');
  } else {
    console.log('❌ Supabase client configuration issue');
  }
} else {
  console.log('❌ Supabase client file not found');
}

// Check 3: Signup Page
console.log('\n📋 Check 3: Signup Page');
const signupPath = path.join(process.cwd(), 'src', 'app', 'signup', 'page.tsx');
if (fs.existsSync(signupPath)) {
  console.log('✅ Signup page exists');
  const signupContent = fs.readFileSync(signupPath, 'utf8');
  if (signupContent.includes('supabase.auth.signUp')) {
    console.log('✅ Signup page has authentication logic');
  } else {
    console.log('❌ Signup page missing authentication logic');
  }
} else {
  console.log('❌ Signup page not found');
}

// Check 4: Database Scripts
console.log('\n📋 Check 4: Database Scripts');
const emergencyScriptPath = path.join(process.cwd(), 'database', 'emergency-database-fix.sql');
const testScriptPath = path.join(process.cwd(), 'database', 'test-signup.sql');

if (fs.existsSync(emergencyScriptPath)) {
  console.log('✅ Emergency database fix script exists');
} else {
  console.log('❌ Emergency database fix script missing');
}

if (fs.existsSync(testScriptPath)) {
  console.log('✅ Database test script exists');
} else {
  console.log('❌ Database test script missing');
}

// Check 5: Package.json
console.log('\n📋 Check 5: Dependencies');
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const hasSupabase = packageContent.dependencies && packageContent.dependencies['@supabase/supabase-js'];
  const hasNext = packageContent.dependencies && packageContent.dependencies['next'];
  
  if (hasSupabase) {
    console.log('✅ Supabase dependency installed');
  } else {
    console.log('❌ Supabase dependency missing');
  }
  
  if (hasNext) {
    console.log('✅ Next.js dependency installed');
  } else {
    console.log('❌ Next.js dependency missing');
  }
} else {
  console.log('❌ package.json not found');
}

console.log('\n🔧 Next Steps:');
console.log('1. If you see any ❌ marks above, fix those issues first');
console.log('2. Make sure your .env.local has REAL Supabase credentials (not placeholders)');
console.log('3. Run the emergency database fix script in Supabase SQL Editor');
console.log('4. Test the database with the test script');
console.log('5. Check browser console (F12) when trying to sign up');
console.log('6. Look for specific error messages in the console');

console.log('\n📞 Common Issues:');
console.log('- Using placeholder values in .env.local');
console.log('- Database table not created properly');
console.log('- RLS policies not configured');
console.log('- Supabase project not active');
console.log('- Network connectivity issues');

console.log('\n🔍 To get more specific help:');
console.log('1. Open browser developer tools (F12)');
console.log('2. Go to Console tab');
console.log('3. Try to sign up');
console.log('4. Copy the exact error message');
console.log('5. Check the Network tab for failed requests'); 