import { supabase } from './supabase';
import type { UserData } from './supabase';

export const userDataService = {
  // Get user data
  async getUserData(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Update specific section of user data
  async updateSection(userId: string, section: keyof UserData, data: any) {
    try {
      const { data: currentData, error: fetchError } = await this.getUserData(userId);
      
      if (fetchError) throw fetchError;

      if (!currentData) {
        // Initialize user data if it doesn't exist
        await this.initializeUserData(userId);
        return this.updateSection(userId, section, data);
      }

      const updatedData = {
        ...currentData,
        [section]: data,
        updated_at: new Date().toISOString(),
      };

      const { data: result, error } = await supabase
        .from('user_data')
        .update(updatedData)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data: result, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Initialize user data with empty defaults
  async initializeUserData(userId: string) {
    try {
      const defaultData = {
        user_id: userId,
        habits: [],
        habit_statuses: [],
        points_categories: [],
        point_logs: [],
        points_rewards: [],
        points_redemptions: [],
        points_goals: [],
        habit_connections: [],
        settings: {
          compact_mode: false,
          use_24_hour_format: false,
          allow_past_editing: false,
        },
      };

      const { data, error } = await supabase
        .from('user_data')
        .insert(defaultData)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Update entire user data object
  async updateUserData(userId: string, updates: Partial<UserData>) {
    try {
      const { data, error } = await supabase
        .from('user_data')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Delete user data (when user deletes account)
  async deleteUserData(userId: string) {
    try {
      const { error } = await supabase
        .from('user_data')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },
}; 