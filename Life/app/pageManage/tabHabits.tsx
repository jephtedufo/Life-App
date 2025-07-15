import React, { useState } from 'react';
import { useHabits } from '../components/contextHabits';
import { TrendingUp, Target, AlertTriangle, Edit2, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { HabitConfigModal } from '../pageCalendar/AddHabitModal';
import { ConfirmDialog } from '../components/ConfirmDialog';

interface HabitsPageProps {
  onNavigate: (page: 'calendar' | 'tasks' | 'shop' | 'manage') => void;
  hideHeader?: boolean;
}

export const HabitsPage: React.FC<HabitsPageProps> = ({ onNavigate, hideHeader }) => {
  const { habits, statuses, setHabits, deleteHabit, updateHabit } = useHabits();
  const [editingHabit, setEditingHabit] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

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

  // Helper: get stats for a habit
  const getHabitStats = (habitId: string) => {
    const habitStatuses = statuses.filter(s => s.habitId === habitId);
    const successCount = habitStatuses.filter(s => s.status === 'success').length;
    const failureCount = habitStatuses.filter(s => s.status === 'failure').length;
    const total = habitStatuses.length;
    const successRate = total > 0 ? (successCount / total) * 100 : 0;
    // Streak calculation
    let streak = 0;
    let maxStreak = 0;
    let lastDate: Date | null = null;
    habitStatuses
      .filter(s => s.status === 'success')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach(status => {
        const statusDate = new Date(status.date);
        if (lastDate && statusDate.getTime() - lastDate.getTime() === 24 * 60 * 60 * 1000) {
          streak++;
        } else {
          streak = 1;
        }
        maxStreak = Math.max(maxStreak, streak);
        lastDate = statusDate;
      });
    return { successCount, failureCount, successRate, streak: maxStreak };
  };

  // Reorder logic
  const moveHabitUp = (habitId: string) => {
    const idx = habits.findIndex(h => h.id === habitId);
    if (idx > 0) {
      const newHabits = [...habits];
      [newHabits[idx], newHabits[idx - 1]] = [newHabits[idx - 1], newHabits[idx]];
      setHabits(newHabits);
    }
  };
  const moveHabitDown = (habitId: string) => {
    const idx = habits.findIndex(h => h.id === habitId);
    if (idx < habits.length - 1) {
      const newHabits = [...habits];
      [newHabits[idx], newHabits[idx + 1]] = [newHabits[idx + 1], newHabits[idx]];
      setHabits(newHabits);
    }
  };

  // Handler for edit
  const handleEditHabit = (habit: any) => {
    setEditingHabit(habit);
    setShowEditModal(true);
  };

  // Handler for edit modal submit
  const handleEditSubmit = (name: string, description: string, repeatDays: number[]) => {
    if (editingHabit) {
      updateHabit({ ...editingHabit, name, description, repeatDays });
    }
    setShowEditModal(false);
    setEditingHabit(null);
  };

  const monthlyStats = getMonthlySuccessRate();
  const highestStreak = getHighestStreak();
  const highestFailures = getHighestFailures();

  return (
    <div className={hideHeader ? '' : 'min-h-screen bg-gray-50 py-8 pb-16'}>
      <div className={hideHeader ? '' : 'max-w-7xl mx-auto px-4'}>
        {/* Header */}
        {!hideHeader && (
          <div className="flex justify-between items-start mb-16 pt-8">
            <div className="flex-1 pr-8">
              <h1 className="text-6xl font-bold text-gray-900 mb-6">Habits Manager</h1>
              <p className="text-lg text-gray-600 leading-relaxed italic max-w-4xl">
                Track your daily routines and monitor progress over time.
              </p>
            </div>
          </div>
        )}
        <div className="space-y-12 mb-8">
          {/* Remove the 3 stats cards, only show habit cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit, idx) => {
              const stats = getHabitStats(habit.id);
              return (
                <div key={habit.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all border-gray-100">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg leading-tight mb-2">{habit.name}</h4>
                        {habit.description && (
                          <p className="text-sm text-gray-600 leading-relaxed">{habit.description}</p>
                        )}
                        <div className="text-xs text-gray-400 mt-1">Created: {new Date(habit.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="flex gap-1 ml-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit habit" onClick={() => handleEditHabit(habit)}><Edit2 size={14} className="text-gray-600" /></button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" title="Delete habit" onClick={() => setDeleteTarget(habit.id)}><Trash2 size={14} /></button>
                        <button className="p-2" title="Move Up" onClick={() => moveHabitUp(habit.id)} disabled={idx === 0}><ChevronUp size={16} /></button>
                        <button className="p-2" title="Move Down" onClick={() => moveHabitDown(habit.id)} disabled={idx === habits.length - 1}><ChevronDown size={16} /></button>
                      </div>
                    </div>
                    {/* Habit Stats Subcards */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-gray-100 rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-xs text-gray-700 font-semibold mb-1">Success</div>
                        <div className="text-xl font-bold text-black">{stats.successCount}</div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-xs text-gray-700 font-semibold mb-1">Failed</div>
                        <div className="text-xl font-bold text-black">{stats.failureCount}</div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-xs text-gray-700 font-semibold mb-1">Success Rate</div>
                        <div className="text-xl font-bold text-black">{stats.successRate.toFixed(1)}%</div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-xs text-gray-700 font-semibold mb-1">Streak</div>
                        <div className="text-xl font-bold text-black">{stats.streak}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <HabitConfigModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingHabit(null); }}
        onSubmit={handleEditSubmit}
        editingHabit={editingHabit}
      />
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteHabit(deleteTarget);
          setDeleteTarget(null);
        }}
        title="Delete Habit"
        message="Are you sure you want to delete this habit? This action cannot be undone."
      />
    </div>
  );
};