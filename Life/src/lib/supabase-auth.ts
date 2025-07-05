import { supabase } from './supabase';
import type { User } from './supabase';

export const authService = {
  // Sign up new user
  async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase.auth.admin.listUsers();
      const userExists = existingUser?.users?.some(user => user.email === email);
      
      if (userExists) {
        return { user: null, error: 'Email already exists' };
      }

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

      if (authError) {
        // Handle specific Supabase errors
        if (authError.message.includes('already registered')) {
          return { user: null, error: 'Email already exists' };
        }
        throw authError;
      }

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

        if (profileError) {
          // If profile creation fails, clean up the auth user
          await supabase.auth.admin.deleteUser(authData.user.id);
          throw profileError;
        }

        // Initialize user data
        await this.initializeUserData(authData.user.id);

        return { user: authData.user, error: null };
      }

      return { user: null, error: 'User creation failed' };
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        return { user: null, error: 'Email already exists' };
      }
      return { user: null, error: error.message || 'An error occurred during signup' };
    }
  },

  // Sign in user
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific Supabase auth errors
        if (error.message.includes('Invalid login credentials')) {
          return { user: null, error: 'Invalid email or password' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { user: null, error: 'Please check your email and confirm your account' };
        }
        throw error;
      }

      if (data.user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          // Return user data from auth if profile fetch fails
          return { 
            user: {
              id: data.user.id,
              email: data.user.email || '',
              first_name: data.user.user_metadata?.first_name || '',
              last_name: data.user.user_metadata?.last_name || '',
              profile_picture: data.user.user_metadata?.profile_picture,
              created_at: data.user.created_at,
              updated_at: data.user.updated_at,
            }, 
            error: null 
          };
        }

        return { user: profile, error: null };
      }

      return { user: null, error: 'Invalid email or password' };
    } catch (error: any) {
      console.error('Signin error:', error);
      if (error.message.includes('Invalid login credentials')) {
        return { user: null, error: 'Invalid email or password' };
      }
      return { user: null, error: error.message || 'An error occurred during login' };
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