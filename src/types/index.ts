export interface Club {
  id: string;
  name: string;
  description: string;
  color: string; // gradient start color
  icon: string; // emoji icon
}

export interface AgendaItem {
  time: string;
  title: string;
  speaker?: string;
}

export interface Attendee {
  name: string;
  email: string;
  registeredAt: string;
  ticketId: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string;
  location: string;
  club: Club;
  capacity: number;
  registered: number;
  tags: string[];
  image?: string;
  agenda?: AgendaItem[];
  perks?: string[];
  faqs?: { question: string; answer: string }[];
  attendees?: Attendee[];
}

export interface User {
  email: string;
  name: string;
  role?: "student" | "organizer";
  registeredEvents: string[]; // event IDs
}
