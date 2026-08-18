import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User, ClubEvent } from "../types";
import { initialEvents } from "../data/mockData";

interface AuthContextType {
  user: User | null;
  eventsList: ClubEvent[];
  login: (email: string) => boolean;
  logout: () => void;
  toggleRole: () => void;
  toggleEventRegistration: (eventId: string) => void;
  isRegistered: (eventId: string) => boolean;
  createEvent: (newEvent: Omit<ClubEvent, "id" | "registered" | "attendees">) => void;
  deleteEvent: (eventId: string) => void;
  getEventAttendees: (eventId: string) => ClubEvent["attendees"];
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Load User
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("clubEventsUser");
    return stored ? JSON.parse(stored) : null;
  });

  // Load Events
  const [eventsList, setEventsList] = useState<ClubEvent[]>(() => {
    const stored = localStorage.getItem("clubEventsData");
    return stored ? JSON.parse(stored) : initialEvents;
  });

  // Sync User to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("clubEventsUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("clubEventsUser");
    }
  }, [user]);

  // Sync Events to localStorage
  useEffect(() => {
    localStorage.setItem("clubEventsData", JSON.stringify(eventsList));
  }, [eventsList]);

  const login = (email: string): boolean => {
    const trimmedEmail = email.trim().toLowerCase();

    // Check valid VIT domains
    const isOrganizer = trimmedEmail.endsWith("@vit.ac.in");
    const isStudent = trimmedEmail.endsWith("@vitstudent.ac.in");

    if (!isOrganizer && !isStudent) {
      return false;
    }

    const role: "student" | "organizer" = isOrganizer ? "organizer" : "student";

    const usernamePart = trimmedEmail.split("@")[0].replace(/[0-9]/g, "");
    const cleanName = usernamePart.replace(/[._-]/g, " ").trim();
    const capitalizedName = cleanName
      ? cleanName
          .split(" ")
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : trimmedEmail.split("@")[0];

    setUser({
      email: trimmedEmail,
      name: capitalizedName,
      role,
      registeredEvents: [],
    });

    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = () => {
    if (!user) return;
    const nextRole = user.role === "organizer" ? "student" : "organizer";
    setUser({ ...user, role: nextRole });
  };

  const toggleEventRegistration = (eventId: string) => {
    if (!user) return;

    const isAlreadyRegistered = user.registeredEvents.includes(eventId);

    // Update user registrations
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        registeredEvents: isAlreadyRegistered
          ? prev.registeredEvents.filter((id) => id !== eventId)
          : [...prev.registeredEvents, eventId],
      };
    });

    // Update event attendance count and attendees roster
    setEventsList((prevEvents) =>
      prevEvents.map((evt) => {
        if (evt.id !== eventId) return evt;

        if (isAlreadyRegistered) {
          return {
            ...evt,
            registered: Math.max(0, evt.registered - 1),
            attendees: (evt.attendees || []).filter((a) => a.email !== user.email),
          };
        } else {
          const newAttendee = {
            name: user.name,
            email: user.email,
            registeredAt: new Date().toISOString().split("T")[0],
            ticketId: `TCK-${evt.club.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
          };
          return {
            ...evt,
            registered: evt.registered + 1,
            attendees: [newAttendee, ...(evt.attendees || [])],
          };
        }
      })
    );
  };

  const isRegistered = (eventId: string) => {
    return user?.registeredEvents.includes(eventId) ?? false;
  };

  const createEvent = (newEvent: Omit<ClubEvent, "id" | "registered" | "attendees">) => {
    const created: ClubEvent = {
      ...newEvent,
      id: `evt-${Date.now()}`,
      registered: 0,
      attendees: [],
    };
    setEventsList((prev) => [created, ...prev]);
  };

  const deleteEvent = (eventId: string) => {
    setEventsList((prev) => prev.filter((e) => e.id !== eventId));
    // If registered, remove from user state
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        registeredEvents: prev.registeredEvents.filter((id) => id !== eventId),
      };
    });
  };

  const getEventAttendees = (eventId: string) => {
    const target = eventsList.find((e) => e.id === eventId);
    return target?.attendees || [];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        eventsList,
        login,
        logout,
        toggleRole,
        toggleEventRegistration,
        isRegistered,
        createEvent,
        deleteEvent,
        getEventAttendees,
      }}
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
