import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  // Add any other user properties you need
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signup: (userData: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const DB_URL = process.env.EXPO_PUBLIC_DB_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const storedUser = await SecureStore.getItemAsync("userData");
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const storeUserData = async (token: string, userData: User) => {
    await SecureStore.setItemAsync("userToken", token);
    await SecureStore.setItemAsync("userData", JSON.stringify(userData));
  };

  const signup = async (userData: any) => {
    const response = await axios.post(
      `${DB_URL}/api/v1/users/signup`,
      userData
    );
    const { token, user } = response.data;
    await storeUserData(token, user);
    setUser(user);
    setIsAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${DB_URL}/api/v1/generate-token`, {
      email,
      password,
    });
    const { token, user } = response.data;
    await storeUserData(token, user);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userData");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};