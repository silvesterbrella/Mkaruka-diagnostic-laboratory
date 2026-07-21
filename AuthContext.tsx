import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, credentials?: { patientId?: string; phone?: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole, credentials?: { patientId?: string; phone?: string }) => {
    if (role === 'patient') {
      setUser({
        id: 'p1',
        name: 'Amina Juma',
        role: 'patient',
        patientId: credentials?.patientId,
        phone: credentials?.phone
      });
    } else {
      const names = { admin: 'Admin User', staff: 'Lab Staff', doctor: 'Dr. Mlowe' };
      setUser({ id: role, name: names[role], role });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};