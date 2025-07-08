import React from 'react';
import { Statistics } from './components/Statistics';
import { AddHabitForm } from '../pageHabits/AddHabitForm';
import { useHabits } from './HabitContext';
import { TrendingUp, Target, AlertTriangle } from 'lucide-react';

interface HabitsPageProps {
  onNavigate: (page: 'calendar' | 'habits' | 'points') => void;
}

export const HabitsPage: React.FC<HabitsPageProps> = ({ onNavigate }) => {
  const { habits, statuses } = useHabits();

  // Calculate monthly success rate
  const getMonthlySuccessRate = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthStatuses = statuses.filter(status => {
      const date = new Date(status.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const lastMonthStatuses = statuses.filter(status => {
      const date = new Date(status.date);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    });

    const currentSuccessRate = currentMonthStatuses.length > 0 
      ? (currentMonthStatuses.filter(s => s.status === 'success').length / currentMonthStatuses.length) * 100 
      : 0;

    const lastSuccessRate = lastMonthStatuses.length > 0 
      ? (lastMonthStatuses.filter(s => s.status === 'success').length / lastMonthStatuses.length) * 100 
      : 0;

    const improvement = currentSuccessRate - lastSuccessRate;
    return { currentSuccessRate, improvement };
  };

  // Get highest streak
  const getHighestStreak = () => {
    let maxStreak = 0;
    let maxStreakHabit = '';

    habits.forEach(habit => {
      const habitStatuses = statuses
        .filter(s => s.habitId === habit.id && s.status === 'success')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      let currentStreak = 0;
      let maxHabitStreak = 0;
      let lastDate: Date | null = null;

      habitStatuses.forEach(status => {
        const statusDate = new Date(status.date);
        
        if (lastDate && statusDate.getTime() - lastDate.getTime() === 24 * 60 * 60 * 1000) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
        
        maxHabitStreak = Math.max(maxHabitStreak, currentStreak);
        lastDate = statusDate;
      });

      if (maxHabitStreak > maxStreak) {
        maxStreak = maxHabitStreak;
        maxStreakHabit = habit.name;
      }
    });

    return { streak: maxStreak, habitName: maxStreakHabit };
  };

  // Get highest failure count
  const getHighestFailures = () => {
    let maxFailures = 0;
    let maxFailureHabit = '';

    habits.forEach(habit => {
      const failures = statuses.filter(s => s.habitId === habit.id && s.status === 'failure').length;
      if (failures > maxFailures) {
        maxFailures = failures;
        maxFailureHabit = habit.name;
      }
    });

    return { failures: maxFailures, habitName: maxFailureHabit };
  };

  const monthlyStats = getMonthlySuccessRate();
  const highestStreak = getHighestStreak();
  const highestFailures = getHighestFailures();

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-16 pt-8">
          <div className="flex-1 pr-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">Habits Manager</h1>
            <p className="text-lg text-gray-600 leading-relaxed italic max-w-4xl">
              Track your daily routines and monitor progress over time.
            </p>
          </div>
        </div>

        <div className="space-y-12 mb-8">
          <AddHabitForm onNavigate={onNavigate} />
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Success Rate */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-amber-900">Monthly Success Rate</h3>
              </div>
              <div className="text-3xl font-bold text-amber-700 mb-1">
                {monthlyStats.currentSuccessRate.toFixed(1)}%
              </div>
              <div className="text-sm text-amber-600">
                {monthlyStats.improvement >= 0 ? '+' : ''}{monthlyStats.improvement.toFixed(1)}% from last month
              </div>
            </div>

            {/* Highest Streak */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Target size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-green-900">Highest Streak</h3>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-1">
                {highestStreak.streak} days
              </div>
              <div className="text-sm text-green-600">
                {highestStreak.habitName || 'No streaks yet'}
              </div>
            </div>

            {/* Most Failures */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-red-900">Most Challenging</h3>
              </div>
              <div className="text-3xl font-bold text-red-700 mb-1">
                {highestFailures.failures} failures
              </div>
              <div className="text-sm text-red-600">
                {highestFailures.habitName || 'No failures recorded'}
              </div>
            </div>
          </div>

          <Statistics hideTitle={true} forceGridLayout={true} />
        </div>
      </div>
    </div>
  );
};