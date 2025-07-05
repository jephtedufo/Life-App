import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupCredentials, ProfileUpdateData } from '../types/auth';
import { authService } from '../../lib/supabase-auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load user from Supabase on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { user, error } = await authService.getCurrentUser();
        if (user && !error) {
          // Transform Supabase user to our User type
          const transformedUser: User = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profilePicture: user.profile_picture,
          };
          
          setAuthState({
            user: transformedUser,
            isAuthenticated: true,
            isLoading: false,
          });
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('life-app-user', JSON.stringify(transformedUser));
          }
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const { user, error } = await authService.signIn(credentials.email, credentials.password);
      
      if (user && !error) {
        // Transform Supabase user to our User type
        const transformedUser: User = {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          profilePicture: user.profile_picture,
        };
        
        setAuthState({
          user: transformedUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('life-app-user', JSON.stringify(transformedUser));
        }
        return true;
      } else {
        console.error('Login error:', error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<boolean> => {
    try {
      const { user, error } = await authService.signUp(
        credentials.email,
        credentials.password,
        credentials.firstName,
        credentials.lastName
      );
      
      if (user && !error) {
        // Transform Supabase user to our User type
        const transformedUser: User = {
          id: user.id,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
        };
        
        setAuthState({
          user: transformedUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('life-app-user', JSON.stringify(transformedUser));
        }
        return true;
      } else {
        console.error('Signup error:', error);
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('life-app-user');
      }
    }
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    if (authState.user) {
      try {
        await authService.updateProfile(authState.user.id, {
          first_name: data.firstName,
          last_name: data.lastName,
          profile_picture: data.profilePicture,
        });

        const updatedUser = {
          ...authState.user,
          firstName: data.firstName,
          lastName: data.lastName,
          profilePicture: data.profilePicture,
        };

        setAuthState({
          ...authState,
          user: updatedUser,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('life-app-user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error('Profile update error:', error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 