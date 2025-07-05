// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Habit types
export interface CreateHabitRequest {
  name: string;
  description?: string;
  repeatDays: number[];
}

export interface UpdateHabitRequest {
  name?: string;
  description?: string;
  repeatDays?: number[];
}

export interface HabitResponse {
  id: string;
  name: string;
  description?: string;
  repeatDays: number[];
  createdAt: string;
  updatedAt: string;
}

// Habit Status types
export interface UpdateHabitStatusRequest {
  status: 'success' | 'failure' | 'skipped' | 'pending';
}

export interface HabitStatusResponse {
  id: string;
  habitId: string;
  date: string;
  status: string;
  createdAt: string;
}

// Task Category types
export interface CreateTaskCategoryRequest {
  name: string;
  description?: string;
  defaultPointValue: number;
  color: string;
  priority?: number;
}

export interface UpdateTaskCategoryRequest {
  name?: string;
  description?: string;
  defaultPointValue?: number;
  color?: string;
  priority?: number;
}

export interface TaskCategoryResponse {
  id: string;
  name: string;
  description?: string;
  defaultPointValue: number;
  color: string;
  priority?: number;
  createdAt: string;
  updatedAt: string;
}

// Point Log types
export interface CreatePointLogRequest {
  categoryId: string;
  description: string;
  tasksCompleted: number;
  pointsPerTask: number;
  date?: string;
}

export interface PointLogResponse {
  id: string;
  categoryId: string;
  description: string;
  tasksCompleted: number;
  pointsPerTask: number;
  totalPoints: number;
  date: string;
  createdAt: string;
}

// Reward types
export interface CreateRewardRequest {
  title: string;
  description: string;
  cost: number;
  imageUrl?: string;
  showImage?: boolean;
  columnWidth?: number;
  priority?: number;
}

export interface UpdateRewardRequest {
  title?: string;
  description?: string;
  cost?: number;
  imageUrl?: string;
  showImage?: boolean;
  columnWidth?: number;
  priority?: number;
}

export interface RewardResponse {
  id: string;
  title: string;
  description: string;
  cost: number;
  imageUrl?: string;
  showImage: boolean;
  columnWidth: number;
  priority?: number;
  createdAt: string;
  updatedAt: string;
}

// Points Goal types
export interface CreatePointsGoalRequest {
  title: string;
  targetPoints: number;
  startDate: string;
  endDate: string;
}

export interface UpdatePointsGoalRequest {
  title?: string;
  targetPoints?: number;
  startDate?: string;
  endDate?: string;
}

export interface PointsGoalResponse {
  id: string;
  title: string;
  targetPoints: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

// Habit Task Connection types
export interface CreateHabitTaskConnectionRequest {
  habitId: string;
  taskId: string;
}

export interface HabitTaskConnectionResponse {
  id: string;
  habitId: string;
  taskId: string;
  createdAt: string;
} 