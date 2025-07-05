import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupCredentials, ProfileUpdateData } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user database (in real app, this would be a backend)
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Jephte',
    lastName: 'User',
    email: 'jephte@example.com',
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load user from localStorage on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('life-app-user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('life-app-user');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (user) {
      // In a real app, you'd verify the password here
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('life-app-user', JSON.stringify(user));
      }
      return true;
    }
    
    return false;
  };

  const signup = async (credentials: SignupCredentials): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === credentials.email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
    };

    mockUsers.push(newUser);

    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('life-app-user', JSON.stringify(newUser));
    }
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('life-app-user');
    }
  };

  const updateProfile = (data: ProfileUpdateData) => {
    if (authState.user) {
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