import { createContext, useState, useEffect } from "react";
import { loginUser, activateUser } from "../api/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const userData = await loginUser(email, password);
    localStorage.setItem("user", JSON.stringify(userData.user));
    setUser(userData.user);
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const activate = async (token, password) => {
    const userData = await activateUser(token, password);
    console.log(userData.user);
    localStorage.setItem("user", JSON.stringify(userData.user));
    setUser(userData.user);
  };

  const value = {
    user,
    loading,
    login,
    activate,
    logout,
  };

  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
