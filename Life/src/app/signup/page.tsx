'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../../lib/supabaseclient';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error('No user returned from signup');

      // 2. Insert into users table
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id, // must match auth.uid()
          email: formData.email,
          first_name: formData.firstName || null,
          last_name: formData.lastName || null,
        });

      if (insertError) throw new Error(insertError.message);

      // 3. Redirect or show success
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ...your form fields... */}
      {error && <div>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}