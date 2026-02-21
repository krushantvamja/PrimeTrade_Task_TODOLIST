import { createContext, useEffect, useMemo, useState } from "react";
import { loginRequest, profileRequest, registerRequest } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setSession = (authPayload) => {
    localStorage.setItem("token", authPayload.token);
    setUser(authPayload.user);
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = async (payload) => {
    const data = await loginRequest(payload);
    setSession(data);
    return data;
  };

  const register = async (payload) => {
    const data = await registerRequest(payload);
    setSession(data);
    return data;
  };

  const logout = () => {
    clearSession();
  };

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { user: profile } = await profileRequest();
        setUser(profile);
      } catch (error) {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user)
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
