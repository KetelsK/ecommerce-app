import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";


interface User {
  id: number;
  email: string;
  sub: string;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  setNewAuthContext: (token: string) => void;
  clearAuthContext: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setNewAuthContext: () => { },
  clearAuthContext: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const localStorageKey: string = "persist:auth";
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(localStorageKey);
    if (token) {
      try {
        setUser(jwtDecode<User>(token));
      } catch {
        setUser(null);
      }
    }
  }, [refresh]);

  const setNewAuthContext = (token: string) => {
    const decoded = jwtDecode<User>(token);
    setUser(decoded);
    setRefresh(!refresh);
  };

  const clearAuthContext = () => {
    setUser(null);
    setRefresh(!refresh);
  };

  return <AuthContext.Provider value={{ user, setNewAuthContext, clearAuthContext }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);