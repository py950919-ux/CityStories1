import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@workspace/api-client-react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("citystories_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, []);

  const login = (newUser: User, token: string) => {
    setUser(newUser);
    localStorage.setItem("citystories_user", JSON.stringify(newUser));
    localStorage.setItem("citystories_token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("citystories_user");
    localStorage.removeItem("citystories_token");
  };

  const isPremium = user?.subscription_status === "explorer" || user?.subscription_status === "premium";

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isPremium }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}