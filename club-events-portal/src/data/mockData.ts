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

export const initialEvents: ClubEvent[] = [
  {
    id: "evt-1",
    title: "CodeSprint Hackathon 2026",
    description:
      "A fast-paced 24-hour coding challenge. Form a team of up to 4, build systems, and pitch to industry judges. Exciting cash prizes, food coupons, and swag packs for all participants!",
    date: "2026-07-15",
    time: "09:00 AM",
    location: "SJT Seminar Hall 402",
    club: clubs[0],
    capacity: 150,
    registered: 112,
    tags: ["Coding", "Hackathon", "Swag", "Prizes"],
    perks: ["Free Meals & Energy Drinks", "Certificate of Participation", "$1,500 Prize Pool", "Official ACM Swag"],
    agenda: [
      { time: "09:00 AM", title: "Registration & Team Check-in" },
      { time: "10:00 AM", title: "Problem Statement Unveiling & Hacking Begins" },
      { time: "01:00 PM", title: "Lunch & Lightning Tech Talks" },
      { time: "08:00 PM", title: "Midway Code Review & Mentor Mentorship" },
      { time: "09:00 AM (+1)", title: "Final Demos & Prize Ceremony" },
    ],
    faqs: [
      { question: "Can I participate solo?", answer: "Yes, though teams of 2 to 4 are recommended for best synergy." },
      { question: "Is hardware allowed?", answer: "Yes, IoT and embedded hacks are welcome in our Hardware track." },
    ],
    attendees: [
      { name: "Alex Chen", email: "alex.chen@campus.edu", registeredAt: "2026-07-01", ticketId: "TCK-ACM-9182" },
      { name: "Priya Sharma", email: "priya.s@campus.edu", registeredAt: "2026-07-02", ticketId: "TCK-ACM-4412" },
      { name: "David Kim", email: "david.kim@campus.edu", registeredAt: "2026-07-03", ticketId: "TCK-ACM-7831" },
    ],
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
    tags: ["Android", "Workshop", "Kotlin", "Cloud"],
    perks: ["Google Cloud Credits", "Hands-on Codelabs", "GDE Q&A Session", "Exclusive GDG Stickers"],
    agenda: [
      { time: "02:00 PM", title: "Keynote: Modern Android Architecture" },
      { time: "02:45 PM", title: "Interactive Workshop: Jetpack Compose UI" },
      { time: "04:30 PM", title: "Building Cloud Backends with Firebase" },
      { time: "05:30 PM", title: "App Showcase & Networking" },
    ],
    faqs: [
      { question: "What should I bring?", answer: "A laptop with Android Studio installed and a charging cable." },
      { question: "Is prior Kotlin knowledge required?", answer: "Basic OOP familiarity is helpful; we will cover Compose basics." },
    ],
    attendees: [
      { name: "Sarah Connor", email: "s.connor@campus.edu", registeredAt: "2026-07-01", ticketId: "TCK-GDG-1092" },
      { name: "Marcus Brody", email: "marcus.b@campus.edu", registeredAt: "2026-07-04", ticketId: "TCK-GDG-8821" },
    ],
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
    tags: ["Music", "Social", "Relax", "Open Mic"],
    perks: ["Complimentary Snacks & Iced Tea", "Open Mic Slot Opportunities", "Band Merch Giveaways"],
    agenda: [
      { time: "06:30 PM", title: "Acoustic Opening Set by Crescendo Core" },
      { time: "07:15 PM", title: "Student Open Mic Session" },
      { time: "08:30 PM", title: "Live Grand Jam Finale" },
    ],
    faqs: [
      { question: "Can I bring my own instrument?", answer: "Absolutely! We provide amps, mics, and audio jacks." },
    ],
    attendees: [
      { name: "Elena Rostova", email: "elena.r@campus.edu", registeredAt: "2026-07-05", ticketId: "TCK-CRE-3301" },
    ],
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
    tags: ["IoT", "Hardware", "Embedded", "Workshop"],
    perks: ["Free Hardware Starter Kit (ESP32 + Sensors)", "IEEE Lab Certification", "Mentorship from Senior Researchers"],
    agenda: [
      { time: "10:00 AM", title: "Microcontroller Fundamentals & GPIO" },
      { time: "11:30 AM", title: "Hands-on Sensor Interfacing" },
      { time: "01:00 PM", title: "Lunch Break" },
      { time: "02:00 PM", title: "Publishing Live Sensor Data via MQTT" },
    ],
    faqs: [
      { question: "Do we get to keep the hardware kit?", answer: "Yes, teams successfully completing the project keep the starter kit!" },
    ],
    attendees: [
      { name: "Rohan Varma", email: "rohan.v@campus.edu", registeredAt: "2026-07-06", ticketId: "TCK-IEE-4491" },
    ],
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
    tags: ["Photography", "Outdoor", "Creative", "Editing"],
    perks: ["Feature in Campus Magazine", "Lightroom Presets Pack", "Printed Keepsake Polaroids"],
    agenda: [
      { time: "04:30 PM", title: "Briefing: Framing, Lighting & Exposure" },
      { time: "05:00 PM", title: "Guided Lake & Garden Photo Trail" },
      { time: "06:15 PM", title: "Photo Review & Mobile Lightroom Demo" },
    ],
    faqs: [
      { question: "Is a DSLR required?", answer: "No, flagship and standard smartphones with manual mode are welcome!" },
    ],
    attendees: [],
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
    tags: ["Art", "Workshop", "Relax", "Coffee"],
    perks: ["Take-home Canvas Masterpiece", "Artisan Brewed Coffee", "Art Supplies Included"],
    agenda: [
      { time: "03:00 PM", title: "Color Theory & Brush Techniques" },
      { time: "03:30 PM", title: "Step-by-step Acrylic Landscape Painting" },
      { time: "05:00 PM", title: "Gallery Walk & Coffee Social" },
    ],
    faqs: [
      { question: "Will aprons be provided?", answer: "Yes, aprons and cleaning cloths are provided on site." },
    ],
    attendees: [],
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
    tags: ["Blockchain", "Web3", "Talk", "Solidity"],
    perks: ["Testnet Faucet Tokens", "GitHub Starter Template", "E-Certificate"],
    agenda: [
      { time: "11:00 AM", title: "Ethereum Virtual Machine & Smart Contracts" },
      { time: "11:45 AM", title: "Writing & Deploying Your First Contract" },
      { time: "12:30 PM", title: "Security Best Practices & Q&A" },
    ],
    faqs: [],
    attendees: [],
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
    tags: ["Art", "Community", "Outdoor", "Mural"],
    perks: ["Name on Mural Credits Plaque", "Free Refreshments", "Exclusive Aura T-Shirt"],
    agenda: [
      { time: "09:00 AM", title: "Mural Layout Projection & Outlining" },
      { time: "10:30 AM", title: "Base Coating & Section Painting" },
      { time: "01:00 PM", title: "Snack Break" },
      { time: "02:00 PM", title: "Detailing & Signatures" },
    ],
    faqs: [],
    attendees: [],
  },
];

export const events = initialEvents;
