import type { Club, ClubEvent } from "../types";

export const clubs: Club[] = [
  {
    id: "acm",
    name: "ACM Student Chapter",
    description: "Empowering students in computer science, coding, and algorithms.",
    color: "#3b82f6", // Electric Blue
    icon: "💻",
  },
  {
    id: "gdg",
    name: "GDG On Campus",
    description: "Google Developer Groups student chapter exploring cloud, mobile, and web.",
    color: "#10b981", // Google Green / Emerald
    icon: "🚀",
  },
  {
    id: "ieee",
    name: "IEEE Student Branch",
    description: "Fostering technological innovation and excellence in engineering.",
    color: "#6366f1", // IEEE Blue-Indigo
    icon: "⚡",
  },
  {
    id: "aura",
    name: "Aura Arts Society",
    description: "Bringing campus walls to life through canvas, sketch, and design.",
    color: "#ec4899", // Artsy Pink
    icon: "🎨",
  },
  {
    id: "crescendo",
    name: "Crescendo Music Club",
    description: "The heartbeat of campus band jam sessions, acoustic jams, and fests.",
    color: "#f59e0b", // Musical Amber
    icon: "🎵",
  },
  {
    id: "shutterbugs",
    name: "Shutterbugs Photo Club",
    description: "Capturing memories, coverage of events, and street photography walks.",
    color: "#a855f7", // Creative Purple
    icon: "📸",
  },
];

export const events: ClubEvent[] = [
  {
    id: "evt-1",
    title: "CodeSprint Hackathon",
    description:
      "A fast-paced 24-hour coding challenge. Form a team of up to 4, build systems, and pitch to judges. Exciting cash prizes, food coupons, and swag packs for all participants!",
    date: "2026-07-15",
    time: "09:00 AM",
    location: "SJT Seminar Hall 402",
    club: clubs[0],
    capacity: 150,
    registered: 112,
    tags: ["Coding", "Hackathon", "Swag"],
  },
  {
    id: "evt-2",
    title: "Android DevFest '26",
    description:
      "Dive into Jetpack Compose, Kotlin Multiplatform, and Firebase backend integrations. Hands-on coding session led by Google Developer Experts.",
    date: "2026-07-08",
    time: "02:00 PM",
    location: "Netaji Auditorium",
    club: clubs[1],
    capacity: 100,
    registered: 94,
    tags: ["Android", "Workshop", "Kotlin"],
  },
  {
    id: "evt-3",
    title: "Acoustic Jam Night",
    description:
      "Unwind after class with Crescendo. Acoustic performances, open mic sessions, and instrumental setups. Bring your guitar or just sit back and enjoy!",
    date: "2026-07-20",
    time: "06:30 PM",
    location: "Open Air Amphitheatre",
    club: clubs[4],
    capacity: 250,
    registered: 189,
    tags: ["Music", "Social", "Relax"],
  },
  {
    id: "evt-4",
    title: "IoT & Embedded Systems Workshop",
    description:
      "Build real hardware projects using ESP32, Arduino, and basic sensors. Learn protocol communication, MQTT setup, and hardware cloud integrations.",
    date: "2026-07-25",
    time: "10:00 AM",
    location: "IEEE Lab, Technology Block",
    club: clubs[2],
    capacity: 60,
    registered: 52,
    tags: ["IoT", "Hardware", "Embedded"],
  },
  {
    id: "evt-5",
    title: "Golden Hour Photo Walk",
    description:
      "Explore street photography techniques around the lake and campus gardens. Learn manual camera control, composition, and mobile photography editing.",
    date: "2026-07-12",
    time: "04:30 PM",
    location: "Meet at Central Fountain",
    club: clubs[5],
    capacity: 30,
    registered: 28,
    tags: ["Photography", "Outdoor", "Creative"],
  },
  {
    id: "evt-6",
    title: "Canvas & Coffee",
    description:
      "Join us for a cozy afternoon of guided painting. Canvas, paints, brushes, and iced coffee will be provided. Absolutely no prior painting experience needed!",
    date: "2026-07-18",
    time: "03:00 PM",
    location: "Aura Creative Studio, Block D",
    club: clubs[3],
    capacity: 40,
    registered: 35,
    tags: ["Art", "Workshop", "Relax"],
  },
  {
    id: "evt-7",
    title: "Web3 & Smart Contracts TechTalk",
    description:
      "An introduction to Solidity, decentralized apps (dApps), and smart contract deployments on testnets. Organized by ACM Student Chapter.",
    date: "2026-08-02",
    time: "11:00 AM",
    location: "Smart Classroom 101",
    club: clubs[0],
    capacity: 80,
    registered: 47,
    tags: ["Blockchain", "Web3", "Talk"],
  },
  {
    id: "evt-8",
    title: "Campus Wall Mural Painting",
    description:
      "A collective community art project to paint the side wall of the Student Activity Center. Leave your artistic mark on the campus!",
    date: "2026-07-28",
    time: "09:00 AM",
    location: "Student Activity Center Wall",
    club: clubs[3],
    capacity: 50,
    registered: 31,
    tags: ["Art", "Community", "Outdoor"],
  },
];
