// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user from LocalStorage on mount
  useEffect(() => {
    const stored = storageService.getCurrentUser();
    if (stored) setUser(stored);
    setLoading(false);
  }, []);

  const login = (userData) => {
    storageService.setCurrentUser(userData);
    setUser(userData);
  };

  const logout = () => {
    storageService.remove(storageService.KEYS.CURRENT_USER);
    setUser(null);
  };

  const register = (newUser) => {
    // Simple demo: add to users array and set as current
    const users = storageService.getUsers();
    users.push(newUser);
    storageService.setUsers(users);
    login(newUser);
  };

  const value = { user, loading, login, logout, register };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
