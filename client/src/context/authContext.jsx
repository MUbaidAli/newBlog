import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8484/api/user/me", {
          withCredentials: true,
        });

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
      const res = await axios.post(
        "http://localhost:8484/api/user/login",
        credentials,
        { withCredentials: true }
      );
      setUser(res.data);
      return res.data;
      // Update user state instantly
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // async function login(credentials) {
  //   const response = await axios.post(
  //     "http://localhost:8484/api/user/login",
  //     credentials,
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   console.log("API Response:", response.data); // 🔥 Check this output
  //   return response.data; // Ensure it returns the correct user object
  // }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
