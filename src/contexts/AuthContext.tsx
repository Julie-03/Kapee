// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  _id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Fixed: Use same key as LoginModal and ApiService
    const storedToken = localStorage.getItem('accessToken'); // Changed from 'authToken'
    const storedUser = localStorage.getItem('user');
    
    console.log('🔍 AuthContext loading - Token found:', storedToken ? 'Yes' : 'No');
    console.log('🔍 AuthContext loading - User found:', storedUser ? 'Yes' : 'No');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        console.log('✅ AuthContext: Restored auth state for user:', userData.email);
      } catch (error) {
        console.log('❌ AuthContext: Invalid stored data, clearing...');
        // Invalid stored data, clear it
        localStorage.removeItem('accessToken'); // Changed from 'authToken'
        localStorage.removeItem('user');
        localStorage.removeItem('userKey'); // Also clear userKey for consistency
      }
    }
    setLoading(false);
  }, []);

  const login = (authToken: string, userData: User) => {
    console.log('🔍 AuthContext login called for user:', userData.email);
    setToken(authToken);
    setUser(userData);
    
    // ✅ Fixed: Use same key as LoginModal and ApiService
    localStorage.setItem('accessToken', authToken); // Changed from 'authToken'
    localStorage.setItem('user', JSON.stringify(userData));
    
    console.log('✅ AuthContext: Login successful, token stored');
  };

  const logout = () => {
    console.log('🔍 AuthContext logout called');
    setToken(null);
    setUser(null);
    
    // ✅ Clear all related storage keys
    localStorage.removeItem('accessToken'); // Changed from 'authToken'
    localStorage.removeItem('user');
    localStorage.removeItem('userKey'); // Also clear userKey for consistency
    
    console.log('✅ AuthContext: Logout successful, storage cleared');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};