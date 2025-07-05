'use client';

import { useState, useEffect } from 'react';
import { testApi, habitsApi, pointsApi } from '../../frontend/services/api';

export default function TestPage() {
  const [apiStatus, setApiStatus] = useState<string>('Loading...');
  const [habits, setHabits] = useState<any[]>([]);
  const [points, setPoints] = useState<any>(null);

  useEffect(() => {
    // Test the API connection
    const testConnection = async () => {
      try {
        const result = await testApi.hello();
        setApiStatus(`✅ API Connected! Message: ${result.message}`);
        
        // Test habits API
        const habitsData = await habitsApi.getAll();
        setHabits(habitsData);
        
        // Test points API
        const pointsData = await pointsApi.getAll();
        setPoints(pointsData);
      } catch (error) {
        setApiStatus(`❌ API Error: ${error}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Life App - API Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Status</h2>
          <p className="text-lg">{apiStatus}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Habits Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(habits, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Points Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(points, null, 2)}
          </pre>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/app" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Life App
          </a>
        </div>
      </div>
    </div>
  );
} 