import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  created_at: string;
  updated_at: string;
}

export interface UserData {
  id: string;
  user_id: string;
  habits: any[];
  habit_statuses: any[];
  points_categories: any[];
  point_logs: any[];
  points_rewards: any[];
  points_redemptions: any[];
  points_goals: any[];
  habit_connections: any[];
  settings: {
    compact_mode: boolean;
    use_24_hour_format: boolean;
    allow_past_editing: boolean;
  };
  created_at: string;
  updated_at: string;
} 