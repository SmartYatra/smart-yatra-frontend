'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from '@/i18n/routing';
import { TUserType } from '@/types/user.type';

interface AuthContextType {
  token: string | null;
  role: TUserType | null;
  isAuthenticated: boolean;
  login: (token: string, role: TUserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<TUserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedRole = localStorage.getItem('authRole') as TUserType | null;

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  const login = (newToken: string, newRole: TUserType) => {
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('authRole', newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRole');
    setToken(null);
    setRole(null);
    router.push('/signin');
  };

  return (
    <AuthContext.Provider
      value={{ token, role, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
