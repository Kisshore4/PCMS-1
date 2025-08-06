import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'consultant' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Demo/mock users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Kisshore Consultant',
    email: 'kisshore@company.com',
    role: 'consultant',
    department: 'Development'
  },
  {
    id: '2',
    name: 'Hari Admin',
    email: 'hari@company.com',
    role: 'admin',
    department: 'HR'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Restore session from sessionStorage on first load
  useEffect(() => {
    const storedUser = sessionStorage.getItem('poolcms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // ✅ Simulate login with mock data
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      sessionStorage.setItem('poolcms_user', JSON.stringify(foundUser)); // ✅ Session storage
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('poolcms_user'); // ✅ Clear session
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
