import { supabase } from './supabase';
import type { User } from './supabase';

export const authService = {
  // Sign up new user
  async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Insert user profile into profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email,
            first_name: firstName,
            last_name: lastName,
          });

        if (profileError) throw profileError;

        // Initialize user data
        await this.initializeUserData(authData.user.id);

        return { user: authData.user, error: null };
      }

      return { user: null, error: 'User creation failed' };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  },

  // Sign in user
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        return { user: profile, error: null };
      }

      return { user: null, error: 'Login failed' };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  },

  // Sign out user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;

      if (user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        return { user: profile, error: null };
      }

      return { user: null, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
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

      const { error } = await supabase
        .from('user_data')
        .insert(defaultData);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<User>) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },
}; 