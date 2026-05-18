/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authStorage } from '../services/authStorage';

export type User = {
  id: string;
  name: string;
  email: string;
};



type AuthContextType = {
  user: User | null;
  initialized: boolean;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setUser(authStorage.readSession());
    // marca que a leitura inicial da sessão foi concluída
    setInitialized(true);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const users = authStorage.readUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'E-mail já cadastrado' };
    }
    const id = Math.random().toString(36).slice(2, 9);
    users.push({ id, name, email, password });
    authStorage.writeUsers(users);
    const newUser = { id, name, email };
    authStorage.writeSession(newUser);
    setUser(newUser);
    return { success: true };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const users = authStorage.readUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { success: false, message: 'Credenciais inválidas' };
    const logged = { id: found.id, name: found.name, email: found.email };
    authStorage.writeSession(logged);
    setUser(logged);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    authStorage.clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, initialized, register, login, logout }),
    [user, initialized, register, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}

export default useAuthContext;
