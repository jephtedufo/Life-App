const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://life-app-ten.vercel.app/api';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  repeatDays: number[];
  createdAt: string;
  updatedAt: string;
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

// Habits API
export const habitsApi = {
  async getAll(): Promise<Habit[]> {
    const response = await fetch(`${API_BASE_URL}/habits`);
    const data = await response.json();
    return data.data || [];
  },

  async create(habit: { name: string; description?: string; repeatDays: number[] }): Promise<Habit> {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(habit),
    });
    const data = await response.json();
    return data.data;
  },

  async update(id: string, habit: Partial<Habit>): Promise<Habit> {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(habit),
    });
    const data = await response.json();
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/habits/${id}`, {
      method: 'DELETE',
    });
  },
};

// Points API
export const pointsApi = {
  async getAll(): Promise<{ points: PointLog[]; totalPoints: number }> {
    const response = await fetch(`${API_BASE_URL}/points`);
    const data = await response.json();
    return data.data || { points: [], totalPoints: 0 };
  },

  async create(point: { categoryId: string; description: string; tasksCompleted?: number; pointsPerTask?: number }): Promise<PointLog> {
    const response = await fetch(`${API_BASE_URL}/points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(point),
    });
    const data = await response.json();
    return data.data;
  },
};

// Test API
export const testApi = {
  async hello(): Promise<{ message: string; timestamp: string; status: string }> {
    const response = await fetch(`${API_BASE_URL}/hello`);
    return response.json();
  },
}; 