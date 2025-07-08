import React from 'react';
import { Calendar } from './components/Calendar';
import { AddHabitForm } from '../pageHabits/AddHabitForm';
import { Header } from './components/Header';
import { useHabits } from '../pageHabits/HabitContext';

interface CalendarPageProps {
  onNavigate: (page: 'calendar' | 'habits' | 'points') => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ onNavigate }) => {
  const { allowPastEditing } = useHabits();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <Header />
        <div className="space-y-12 mb-8">
          <AddHabitForm onNavigate={onNavigate} />
          <Calendar allowPastEditing={allowPastEditing} />
        </div>
      </div>
    </div>
  );
};