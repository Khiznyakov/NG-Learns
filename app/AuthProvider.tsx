"use client";
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  user: null,
});

const USERS = [
  { username: "admin", password: "admin123" },
  { username: "user", password: "user123" },
];

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string, password: string) => {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) {
      setIsAuthenticated(true);
      setUser(username);
      return true;
    } else {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
} 