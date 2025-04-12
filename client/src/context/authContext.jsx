import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/me", { withCredentials: true });
        console.log(res, "auth Context");
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Function to update state immediately after login
  const login = async (credentials) => {
    try {
      const res = await API.post("/user/login", credentials);
      setUser(res.data);
      return res.data;
      // Update user state instantly
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
