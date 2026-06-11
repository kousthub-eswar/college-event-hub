export interface Club {
  id: string;
  name: string;
  description: string;
  color: string; // gradient start color
  icon: string; // emoji icon
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  time: string;
  location: string;
  club: Club;
  capacity: number;
  registered: number;
  tags: string[];
  image?: string;
}

export interface User {
  email: string;
  name: string;
  registeredEvents: string[]; // event IDs
}
