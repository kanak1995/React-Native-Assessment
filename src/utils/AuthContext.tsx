import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '../utils/storage';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    init();
  }, []);

  const login = async (token: string) => {
    await saveToken(token);
    setIsLoggedIn(true); // 🔥 THIS triggers navigation
  };

  const logout = async () => {
    await clearToken();
    setIsLoggedIn(false);
  };

  if (loading) return null; // splash

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
