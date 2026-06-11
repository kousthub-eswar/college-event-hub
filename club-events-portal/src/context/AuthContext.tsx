import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  toggleEventRegistration: (eventId: string) => void;
  isRegistered: (eventId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("clubEventsUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("clubEventsUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("clubEventsUser");
    }
  }, [user]);

  const login = (email: string) => {
    const name = email.split("@")[0].replace(/[._]/g, " ");
    const capitalizedName = name
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    setUser({
      email,
      name: capitalizedName,
      registeredEvents: [],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleEventRegistration = (eventId: string) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      const isAlreadyRegistered = prev.registeredEvents.includes(eventId);
      return {
        ...prev,
        registeredEvents: isAlreadyRegistered
          ? prev.registeredEvents.filter((id) => id !== eventId)
          : [...prev.registeredEvents, eventId],
      };
    });
  };

  const isRegistered = (eventId: string) => {
    return user?.registeredEvents.includes(eventId) ?? false;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, toggleEventRegistration, isRegistered }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
