import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Subscription } from '../types';
import { authApi, subscriptionApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  subscription: Subscription | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      refreshUser();
      refreshSubscription();
    } else {
      setLoading(false);
    }
  }, [token]);

  const refreshUser = async () => {
    try {
      const u = await authApi.getMe();
      setUser(u);
    } catch (e) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const refreshSubscription = async () => {
    try {
      const sub = await subscriptionApi.getSubscription();
      setSubscription(sub);
    } catch (e) {
      // Ignore
    }
  };

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
    refreshSubscription();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setSubscription(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, subscription, loading, login, logout, refreshUser, refreshSubscription }}>
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
