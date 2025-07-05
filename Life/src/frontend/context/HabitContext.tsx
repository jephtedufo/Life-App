import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePoints } from './PointsContext';
import { Habit, HabitStatus } from '../types';

interface HabitContextType {
  habits: Habit[];
  statuses: HabitStatus[];
  allowPastEditing: boolean;
  compactMode: boolean;
  use24HourFormat: boolean;
  setAllowPastEditing: (allow: boolean) => void;
  setCompactMode: (compact: boolean) => void;
  setUse24HourFormat: (use24Hour: boolean) => void;
  setHabits: (habits: Habit[] | ((prev: Habit[]) => Habit[])) => void;
  setStatuses: (statuses: HabitStatus[] | ((prev: HabitStatus[]) => HabitStatus[])) => void;
  addHabit: (name: string, description: string, repeatDays: number[]) => void;
  deleteHabit: (id: string) => void;
  updateHabit: (habit: Habit) => void;
  updateStatus: (habitId: string, date: string, status: HabitStatus['status']) => void;
  resetAllData: () => void;
}

const HabitContext = createContext<HabitContextType | null>(null);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);
  const [statuses, setStatuses] = useLocalStorage<HabitStatus[]>('habitStatuses', []);
  const [allowPastEditing, setAllowPastEditing] = useState(false);
  const [compactMode, setCompactMode] = useLocalStorage<boolean>('compactMode', false);
  const [use24HourFormat, setUse24HourFormat] = useLocalStorage<boolean>('use24HourFormat', false);

  // Debug logging to track data persistence
  useEffect(() => {
    console.log('Habits loaded:', habits);
    console.log('Statuses loaded:', statuses);
  }, [habits, statuses]);

  const addHabit = useCallback((name: string, description: string, repeatDays: number[]) => {
    // Check if habit with same name already exists
    const existingHabit = habits.find(h => h.name.toLowerCase() === name.toLowerCase());
    
    if (existingHabit) {
      // Update existing habit's repeat days and description
      const updatedHabit = { ...existingHabit, repeatDays, description };
      setHabits(prev => prev.map(habit => 
        habit.id === existingHabit.id ? updatedHabit : habit
      ));
      console.log('Updated existing habit:', updatedHabit);
    } else {
      // Create new habit
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name,
        repeatDays,
        createdAt: new Date().toISOString(),
        description,
      };
      setHabits(prev => {
        const updated = [...prev, newHabit];
        console.log('Added new habit:', newHabit);
        console.log('All habits after add:', updated);
        return updated;
      });
    }
  }, [habits, setHabits]);

  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => {
      const updated = prev.filter(habit => habit.id !== id);
      console.log('Deleted habit, remaining:', updated);
      return updated;
    });
    setStatuses(prev => {
      const updated = prev.filter(status => status.habitId !== id);
      console.log('Deleted habit statuses, remaining:', updated);
      return updated;
    });
  }, [setHabits, setStatuses]);

  const updateHabit = useCallback((updatedHabit: Habit) => {
    setHabits(prev => {
      const updated = prev.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      );
      console.log('Updated habit:', updatedHabit);
      return updated;
    });
  }, [setHabits]);

  const updateStatus = useCallback((habitId: string, date: string, status: HabitStatus['status']) => {
    setStatuses(prev => {
      const existingIndex = prev.findIndex(s => s.habitId === habitId && s.date === date);
      const previousStatus = existingIndex >= 0 ? prev[existingIndex].status : 'pending';
      let updated;
      
      if (existingIndex >= 0) {
        // Update existing status
        updated = prev.map((s, i) => i === existingIndex ? { ...s, status } : s);
      } else {
        // Add new status
        updated = [...prev, { habitId, date, status }];
      }
      
      console.log('Updated status:', { habitId, date, status, previousStatus });
      console.log('All statuses after update:', updated);
      
      return updated;
    });
  }, [setStatuses]);

  const resetAllData = useCallback(() => {
    setHabits([]);
    setStatuses([]);
    console.log('Reset all data');
  }, [setHabits, setStatuses]);

  return (
    <HabitContext.Provider value={{
      habits,
      statuses,
      allowPastEditing,
      compactMode,
      use24HourFormat,
      setAllowPastEditing,
      setCompactMode,
      setUse24HourFormat,
      setHabits,
      setStatuses,
      addHabit,
      deleteHabit,
      updateHabit,
      updateStatus,
      resetAllData,
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};