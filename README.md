# 🎪 Campus ClubHub

A modern, high-performance web platform for college campus student chapters, clubs, and event discovery. Powered by **React 19**, **TypeScript 5.9**, **Vite 7**, and **Tailwind CSS v4**.

![React 19](https://img.shields.io/badge/React-19.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Key Features

- **🔐 Dual-Role Institutional Authentication**:
  - **VIT Student (`@vitstudent.ac.in`)**: Access event discovery, register for workshops & hackathons, and generate entry passes.
  - **Club Organizer & Faculty (`@vit.ac.in`)**: Exclusive access to the **Organizer Console** to publish new campus events and manage rosters.
- **🎟️ Holographic Digital Passes & Dynamic QR Code**:
  - Live SVG QR Code generation for door check-in with verified Ticket IDs (`TCK-ACM-XXXX`).
  - Single-click **Print Pass** functionality.
- **📅 Google & iCal Calendar Sync**:
  - Direct 1-click **Add to Google Calendar** and downloadable `.ics` iCalendar files for Apple Calendar, Microsoft Outlook, and mobile devices.
- **💬 Interactive Event Details Modal**:
  - Stage-by-stage **Agenda & Schedule timeline**.
  - **Perks & Inclusions** (certificates, refreshments, goodies).
  - Expandable **FAQ Accordion**.
- **🛡️ Organizer & Club Lead Console**:
  - Real-time KPIs (*Registrations, Occupancy %, Live Events*).
  - **Attendee Roster Modal** to view registered students.
  - **Export CSV** for attendance tracking.
  - **Publish Event Form** with custom quotas, venues, agendas, and perks.
- **🔍 Advanced Discovery, Categories & Sorting**:
  - Category filters (*Tech & Code, Workshops, Arts & Creative, Music & Social*).
  - Sort by *Upcoming Soonest*, *Most Popular*, and *Fewest Spots Left*.
  - Real-time search by title, tags, and club chapters.

---

## 📂 Project Structure

```
Club_Events/
├── club-events-portal/          # Main React 19 web application
│   ├── public/                  # Static web assets
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── CreateEventModal.tsx  # Event creation form
│   │   │   ├── EventCard.tsx         # Event card with badges & quick actions
│   │   │   ├── EventDetailModal.tsx  # Agenda, perks, and FAQ view
│   │   │   ├── Navbar.tsx            # Sticky navigation with role indicators
│   │   │   ├── ProtectedRoute.tsx    # Auth guard wrapper
│   │   │   └── TicketModal.tsx       # Holographic pass with SVG QR code
│   │   ├── context/
│   │   │   ├── AuthContext.tsx       # Auth, role handling, event state sync
│   │   │   └── ToastContext.tsx      # Global notification toast system
│   │   ├── data/
│   │   │   └── mockData.ts           # Student chapters & initial event catalog
│   │   ├── pages/
│   │   │   ├── AdminPage.tsx         # Organizer management console & CSV export
│   │   │   ├── EventsPage.tsx        # Event explorer with filters and search
│   │   │   ├── LoginPage.tsx         # VIT institutional email login
│   │   │   └── ProfilePage.tsx       # User schedule & digital passes
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript schemas
│   │   ├── utils/
│   │   │   ├── calendar.ts           # Google Calendar & .ics file generators
│   │   │   └── qrCode.ts             # Self-contained SVG QR matrix engine
│   │   ├── App.tsx                   # Routing configuration
│   │   ├── index.css                 # Tailwind v4 configuration & cyber tokens
│   │   └── main.tsx                  # React entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or pnpm

### Installation

```bash
# 1. Clone repository
git clone https://github.com/kousthub-eswar/college-event-hub.git
cd college-event-hub/club-events-portal

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The portal will be live at `http://localhost:5173`.

### 🔑 Test Institutional Logins
- **VIT Student Account:** `sasi.kumar2023@vitstudent.ac.in` (or any `@vitstudent.ac.in`)
- **Organizer / Lead Account:** `club.lead@vit.ac.in` (or any `@vit.ac.in`)

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Declarative Component Architecture |
| **TypeScript 5.9** | Strict Type Safety |
| **Vite 7** | Next-Gen Bundler & Fast HMR |
| **Tailwind CSS v4** | Utility-First Modern Cyber/Glass Design |
| **React Router v7** | Single-Page Application Client Routing |

---

## 📄 License

Distributed under the MIT License.
