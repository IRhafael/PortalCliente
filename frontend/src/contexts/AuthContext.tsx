import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock API simulation
const mockApi = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@empresa.com' && password === 'admin123') {
      return {
        user: {
          id: '1',
          name: 'João Silva',
          email: 'admin@empresa.com',
          company: 'Empresa Exemplo LTDA',
          role: 'admin' as const
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token'
      };
    }
    
    throw new Error('Credenciais inválidas');
  },
  
  refreshToken: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      token: 'new-mock-jwt-token',
      refreshToken: 'new-mock-refresh-token'
    };
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        let msg = 'Erro ao fazer login';
        try {
          const data = await res.json();
          msg = data?.detail || data?.non_field_errors?.[0] || msg;
        } catch {}
        throw new Error(msg);
      }
      const data = await res.json();
      localStorage.setItem('auth_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const refreshToken = async () => {
    try {
      const response = await mockApi.refreshToken();
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    // Check for existing session on app start
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const value = {
    user,
    isLoading,
    login,
    logout,
    refreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}