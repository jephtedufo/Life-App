"use client";

import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TaskCategory, PointLog, Reward, RedemptionLog, PointsGoal, HabitTaskConnection } from '../types';

interface PointsContextType {
  categories: TaskCategory[];
  pointLogs: PointLog[];
  rewards: Reward[];
  redemptions: RedemptionLog[];
  goals: PointsGoal[];
  habitConnections: HabitTaskConnection[];
  setCategories: (categories: TaskCategory[] | ((prev: TaskCategory[]) => TaskCategory[])) => void;
  setPointLogs: (logs: PointLog[] | ((prev: PointLog[]) => PointLog[])) => void;
  setRewards: (rewards: Reward[] | ((prev: Reward[]) => Reward[])) => void;
  setRedemptions: (redemptions: RedemptionLog[] | ((prev: RedemptionLog[]) => RedemptionLog[])) => void;
  setGoals: (goals: PointsGoal[] | ((prev: PointsGoal[]) => PointsGoal[])) => void;
  addCategory: (name: string, description: string, categoryAmount: number, color: string) => void;
  updateCategory: (category: TaskCategory) => void;
  deleteCategory: (id: string) => void;
  addPointLog: (categoryId: string, description: string, tasksCompleted: number, pointsPerTask: number) => void;
  deletePointLog: (id: string) => void;
  addReward: (title: string, description: string, cost: number, imageUrl?: string) => void;
  updateReward: (reward: Reward) => void;
  deleteReward: (id: string) => void;
  redeemReward: (rewardId: string) => boolean;
  addGoal: (title: string, targetPoints: number, startDate: string, endDate: string) => void;
  updateGoal: (goal: PointsGoal) => void;
  deleteGoal: (id: string) => void;
  connectHabitToTask: (habitId: string, taskId: string) => void;
  disconnectHabitFromTask: (habitId: string, taskId: string) => void;
  addPointsForHabit: (habitId: string) => void;
  removePointsForHabit: (habitId: string) => void;
  getTotalPoints: () => number;
  getCurrentBalance: () => number;
  getCategoryStats: (categoryId: string) => { totalPoints: number; totalTasks: number };
  resetAllPointsData: () => void;
}

const PointsContext = createContext<PointsContextType | null>(null);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useLocalStorage<TaskCategory[]>('pointsCategories', []);
  const [pointLogs, setPointLogs] = useLocalStorage<PointLog[]>('pointLogs', []);
  const [rewards, setRewards] = useLocalStorage<Reward[]>('pointsRewards', []);
  const [redemptions, setRedemptions] = useLocalStorage<RedemptionLog[]>('pointsRedemptions', []);
  const [goals, setGoals] = useLocalStorage<PointsGoal[]>('pointsGoals', []);
  const [habitConnections, setHabitConnections] = useLocalStorage<HabitTaskConnection[]>('habitConnections', []);

  const addCategory = useCallback((name: string, description: string, categoryAmount: number, color: string) => {
    const newCategory: TaskCategory = {
      id: crypto.randomUUID(),
      name,
      description,
      defaultPointValue: categoryAmount,
      color,
      createdAt: new Date().toISOString(),
      priority: categories.length,
    };
    setCategories(prev => [...prev, newCategory]);
  }, [setCategories, categories.length]);

  const updateCategory = useCallback((category: TaskCategory) => {
    setCategories(prev => prev.map(c => c.id === category.id ? category : c));
  }, [setCategories]);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    setPointLogs(prev => prev.filter(log => log.categoryId !== id));
    setHabitConnections(prev => prev.filter(conn => conn.taskId !== id));
  }, [setCategories, setPointLogs, setHabitConnections]);

  const addPointLog = useCallback((categoryId: string, description: string, tasksCompleted: number, pointsPerTask: number) => {
    const newLog: PointLog = {
      id: crypto.randomUUID(),
      categoryId,
      description,
      tasksCompleted,
      pointsPerTask,
      totalPoints: tasksCompleted * pointsPerTask,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setPointLogs(prev => [...prev, newLog]);
  }, [setPointLogs]);

  const deletePointLog = useCallback((id: string) => {
    setPointLogs(prev => prev.filter(log => log.id !== id));
  }, [setPointLogs]);

  const addReward = useCallback((title: string, description: string, cost: number, imageUrl?: string) => {
    const newReward: Reward = {
      id: crypto.randomUUID(),
      title,
      description,
      cost,
      imageUrl,
      showImage: true,
      columnWidth: 1,
      priority: rewards.length,
      createdAt: new Date().toISOString(),
    };
    setRewards(prev => [...prev, newReward]);
  }, [setRewards, rewards.length]);

  const updateReward = useCallback((reward: Reward) => {
    setRewards(prev => prev.map(r => r.id === reward.id ? reward : r));
  }, [setRewards]);

  const deleteReward = useCallback((id: string) => {
    setRewards(prev => prev.filter(r => r.id !== id));
  }, [setRewards]);

  const redeemReward = useCallback((rewardId: string): boolean => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return false;

    const currentBalance = getCurrentBalance();
    if (currentBalance < reward.cost) return false;

    const redemption: RedemptionLog = {
      id: crypto.randomUUID(),
      rewardId: reward.id,
      rewardTitle: reward.title,
      pointsSpent: reward.cost,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    setRedemptions(prev => [...prev, redemption]);
    return true;
  }, [rewards, redemptions, pointLogs, setRedemptions]);

  const addGoal = useCallback((title: string, targetPoints: number, startDate: string, endDate: string) => {
    const newGoal: PointsGoal = {
      id: crypto.randomUUID(),
      title,
      targetPoints,
      startDate,
      endDate,
      createdAt: new Date().toISOString(),
    };
    setGoals(prev => [...prev, newGoal]);
  }, [setGoals]);

  const updateGoal = useCallback((goal: PointsGoal) => {
    setGoals(prev => prev.map(g => g.id === goal.id ? goal : g));
  }, [setGoals]);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  }, [setGoals]);

  const connectHabitToTask = useCallback((habitId: string, taskId: string) => {
    const newConnection: HabitTaskConnection = {
      id: crypto.randomUUID(),
      habitId,
      taskId,
      createdAt: new Date().toISOString(),
    };
    setHabitConnections(prev => [...prev, newConnection]);
  }, [setHabitConnections]);

  const disconnectHabitFromTask = useCallback((habitId: string, taskId: string) => {
    setHabitConnections(prev => prev.filter(conn => 
      !(conn.habitId === habitId && conn.taskId === taskId)
    ));
  }, [setHabitConnections]);

  const addPointsForHabit = useCallback((habitId: string) => {
    const connections = habitConnections.filter(conn => conn.habitId === habitId);
    
    connections.forEach(connection => {
      const task = categories.find(cat => cat.id === connection.taskId);
      if (task) {
        addPointLog(
          task.id,
          'Habit completion bonus',
          1,
          task.defaultPointValue
        );
      }
    });
  }, [habitConnections, categories, addPointLog]);

  const removePointsForHabit = useCallback((habitId: string) => {
    const connections = habitConnections.filter(conn => conn.habitId === habitId);
    const today = new Date().toISOString().split('T')[0];
    
    connections.forEach(connection => {
      const task = categories.find(cat => cat.id === connection.taskId);
      if (task) {
        // Find and remove the most recent habit completion bonus for this task today
        setPointLogs(prev => {
          const logsToday = prev.filter(log => 
            log.categoryId === task.id && 
            log.date === today && 
            log.description === 'Habit completion bonus'
          );
          
          if (logsToday.length > 0) {
            // Remove the most recent one
            const mostRecent = logsToday.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )[0];
            
            return prev.filter(log => log.id !== mostRecent.id);
          }
          
          return prev;
        });
      }
    });
  }, [habitConnections, categories, setPointLogs]);

  const getTotalPoints = useCallback(() => {
    return pointLogs.reduce((total, log) => total + log.totalPoints, 0);
  }, [pointLogs]);

  const getCurrentBalance = useCallback(() => {
    const totalEarned = getTotalPoints();
    const totalSpent = redemptions.reduce((total, redemption) => total + redemption.pointsSpent, 0);
    return totalEarned - totalSpent;
  }, [pointLogs, redemptions, getTotalPoints]);

  const getCategoryStats = useCallback((categoryId: string) => {
    const categoryLogs = pointLogs.filter(log => log.categoryId === categoryId);
    return {
      totalPoints: categoryLogs.reduce((total, log) => total + log.totalPoints, 0),
      totalTasks: categoryLogs.reduce((total, log) => total + Math.abs(log.tasksCompleted), 0),
    };
  }, [pointLogs]);

  const resetAllPointsData = useCallback(() => {
    setCategories([]);
    setPointLogs([]);
    setRewards([]);
    setRedemptions([]);
    setGoals([]);
    setHabitConnections([]);
  }, [setCategories, setPointLogs, setRewards, setRedemptions, setGoals, setHabitConnections]);

  return (
    <PointsContext.Provider value={{
      categories,
      pointLogs,
      rewards,
      redemptions,
      goals,
      habitConnections,
      setCategories,
      setPointLogs,
      setRewards,
      setRedemptions,
      setGoals,
      addCategory,
      updateCategory,
      deleteCategory,
      addPointLog,
      deletePointLog,
      addReward,
      updateReward,
      deleteReward,
      redeemReward,
      addGoal,
      updateGoal,
      deleteGoal,
      connectHabitToTask,
      disconnectHabitFromTask,
      addPointsForHabit,
      removePointsForHabit,
      getTotalPoints,
      getCurrentBalance,
      getCategoryStats,
      resetAllPointsData,
    }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};