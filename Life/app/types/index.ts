export interface Habit {
  id: string;
  name: string;
  repeatDays: number[];  // 0-6 representing Sunday-Saturday
  createdAt: string;
  description?: string;
}

export interface HabitStatus {
  habitId: string;
  date: string;
  status: 'success' | 'failure' | 'skipped' | 'pending';
}

export interface HabitStreak {
  habitId: string;
  count: number;
  type: 'success' | 'failure';
}

// Points System Types
export interface TaskCategory {
  id: string;
  name: string;
  description?: string;
  defaultPointValue: number;
  color: string;
  createdAt: string;
  priority?: number;
}

export interface PointLog {
  id: string;
  categoryId: string;
  description: string;
  tasksCompleted: number;
  pointsPerTask: number;
  totalPoints: number;
  date: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  imageUrl?: string;
  showImage?: boolean;
  columnWidth?: number;
  priority?: number;
  createdAt: string;
}

export interface RedemptionLog {
  id: string;
  rewardId: string;
  rewardTitle: string;
  pointsSpent: number;
  date: string;
  createdAt: string;
}

export interface HabitTaskConnection {
  id: string;
  habitId: string;
  taskId: string;
  createdAt: string;
}