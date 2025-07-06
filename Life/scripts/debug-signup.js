const fs = require('fs');
const path = require('path');

console.log('🔍 Detailed Signup Debugging...\n');

// Check environment variables more thoroughly
console.log('📋 Environment Variables Check:');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  let supabaseUrl = '';
  let supabaseKey = '';
  
  lines.forEach(line => {
    if (line.includes('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1]?.trim();
    }
    if (line.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseKey = line.split('=')[1]?.trim();
    }
  });
  
  console.log('Supabase URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('Supabase Key:', supabaseKey ? '✅ Set' : '❌ Missing');
  
  if (supabaseUrl && supabaseKey) {
    if (supabaseUrl.includes('your-project-id') || supabaseKey.includes('your_anon_key')) {
      console.log('⚠️  WARNING: Using placeholder values!');
      console.log('   You need to replace with actual Supabase credentials');
    } else {
      console.log('✅ Environment variables look properly configured');
    }
  }
}

// Check signup page for specific error handling
console.log('\n📋 Signup Page Error Handling:');
const signupPath = path.join(process.cwd(), 'src', 'app', 'signup', 'page.tsx');
if (fs.existsSync(signupPath)) {
  const signupContent = fs.readFileSync(signupPath, 'utf8');
  
  const hasErrorHandling = signupContent.includes('console.error');
  const hasDetailedLogging = signupContent.includes('Database insert error');
  const hasAuthCheck = signupContent.includes('process.env.NEXT_PUBLIC_SUPABASE_URL');
  
  console.log('Error handling:', hasErrorHandling ? '✅ Present' : '❌ Missing');
  console.log('Detailed logging:', hasDetailedLogging ? '✅ Present' : '❌ Missing');
  console.log('Auth check:', hasAuthCheck ? '✅ Present' : '❌ Missing');
}

// Check if development server is running
console.log('\n📋 Development Server Check:');
console.log('Make sure your development server is running:');
console.log('  npm run dev');
console.log('  or');
console.log('  yarn dev');

// Provide specific debugging steps
console.log('\n🔍 Specific Debugging Steps:');
console.log('1. Open your browser and go to the signup page');
console.log('2. Open Developer Tools (F12)');
console.log('3. Go to Console tab');
console.log('4. Try to sign up with test data:');
console.log('   - First Name: Test');
console.log('   - Last Name: User');
console.log('   - Email: test@example.com');
console.log('   - Password: test123456');
console.log('5. Look for these specific messages in console:');
console.log('   ✅ "Attempting to sign up user: test@example.com"');
console.log('   ✅ "User created successfully: [user-id]"');
console.log('   ✅ "Inserting user data: {...}"');
console.log('   ✅ "User data inserted successfully: {...}"');
console.log('   ❌ Any error messages starting with "Supabase" or "Database"');

console.log('\n📞 Most Common Issues:');
console.log('1. Database table not created - Run emergency-database-fix.sql');
console.log('2. RLS policies missing - Run emergency-database-fix.sql');
console.log('3. Supabase project inactive - Check project status');
console.log('4. Network issues - Check internet connection');
console.log('5. CORS issues - Check Supabase settings');

console.log('\n🔧 Quick Fix Commands:');
console.log('1. Go to Supabase Dashboard > SQL Editor');
console.log('2. Copy and paste the content from database/emergency-database-fix.sql');
console.log('3. Run the script');
console.log('4. Copy and paste the content from database/test-signup.sql');
console.log('5. Run the test script');
console.log('6. Check that all tests show ✅');

console.log('\n📱 Test Data for Signup:');
console.log('First Name: Test');
console.log('Last Name: User');
console.log('Email: test@example.com');
console.log('Password: test123456');

console.log('\n🔍 If you still get errors:');
console.log('1. Copy the EXACT error message from browser console');
console.log('2. Check the Network tab in developer tools');
console.log('3. Look for failed requests to Supabase');
console.log('4. Verify your Supabase project is active');
console.log('5. Try creating a new Supabase project if needed'); 