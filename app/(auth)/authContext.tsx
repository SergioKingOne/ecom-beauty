import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = "https://api.developbetterapps.com";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return { error: true, message: (error as any).response.data.message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        email,
        password,
      });

      setAuthState({ token: response.data.token, authenticated: true });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);

      return response;
    } catch (error) {
      return { error: true, message: (error as any).response.data.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    authState,
    onRegister: register,
  };

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
