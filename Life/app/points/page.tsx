import React, { useState } from 'react';
import { Navigation } from '../components/layout/Navigation';
import { PointsSystem } from '../components/points/PointsSystem';
import { Statistics } from '../components/Statistics';

export default function PointsPage() {
  const [page, setPage] = useState<'calendar' | 'habits' | 'points'>('points');
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation currentPage={page} onNavigate={setPage} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Points</h1>
        <div className="mb-8">
          <Statistics />
        </div>
        <div>
          <PointsSystem />
        </div>
      </div>
    </main>
  );
} 