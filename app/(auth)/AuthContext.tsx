import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

const DB_URL = process.env.EXPO_PUBLIC_DB_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  };

  const signup = async (userData: any) => {
    const response = await axios.post(`${DB_URL}/api/v1/users/signup`, userData);
    const { token } = response.data;
    await SecureStore.setItemAsync('userToken', token);
    setIsAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${DB_URL}/api/v1/generate-token`, { email, password });
    const { token } = response.data;
    await SecureStore.setItemAsync('userToken', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
