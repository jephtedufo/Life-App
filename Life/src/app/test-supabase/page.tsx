'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function TestSupabasePage() {
  const [status, setStatus] = useState('Testing connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        
        if (error) {
          setError(`Connection error: ${error.message}`);
          setStatus('Failed');
        } else {
          setStatus('Connected successfully!');
        }
      } catch (err: any) {
        setError(`Unexpected error: ${err.message}`);
        setStatus('Failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Status:</p>
            <p className={`font-medium ${status.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
              {status}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <div className="text-sm text-gray-500">
            <p>Environment Variables:</p>
            <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
            <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 