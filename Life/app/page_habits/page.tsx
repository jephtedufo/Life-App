"use client";
import React, { useState } from 'react';
import { Navigation } from '../components/layout/Navigation';
// Import habits and stats components if available
// import HabitsList from '../components/HabitsList'; // Placeholder
import { Statistics } from '../components/Statistics';

export default function HabitsManagerPage() {
  const [page, setPage] = useState<'calendar' | 'habits' | 'points'>('habits');
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation currentPage={page} onNavigate={setPage} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Habits Manager</h1>
        {/* Render habits list here */}
        <div className="mb-8">
          {/* <HabitsList /> */}
          <div className="p-4 bg-white rounded shadow text-gray-500">[Habits list goes here]</div>
        </div>
        <div>
          <Statistics />
        </div>
      </div>
    </main>
  );
} 