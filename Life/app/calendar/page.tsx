import React, { useState } from 'react';
import { Navigation } from '../components/layout/Navigation';
import { Calendar } from '../components/Calendar';

export default function CalendarPage() {
  const [page, setPage] = useState<'calendar' | 'habits' | 'points'>('calendar');
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation currentPage={page} onNavigate={setPage} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Calendar</h1>
        <Calendar />
      </div>
    </main>
  );
} 