# 🎪 Club Events Portal

A modern, responsive web app for discovering and registering for college club events. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

![Events Page](https://img.shields.io/badge/React-19-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwindcss)

## ✨ Features

- **🔐 Email Authentication** — Simple sign-in with email validation and protected routes
- **📋 Event Discovery** — Browse events with search and club-based filtering
- **🎟️ One-Click Registration** — Register/unregister for events with instant feedback
- **👤 User Profile** — View your registered events and activity stats
- **🔔 Toast Notifications** — Elegant, auto-dismissing notifications for all actions
- **📱 Responsive Design** — Works beautifully on desktop and mobile
- **🪟 Glass Morphism UI** — Modern glassmorphism design with smooth animations

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd Club_Events/club-events-portal

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
club-events-portal/
├── public/
├── src/
│   ├── components/
│   │   ├── EventCard.tsx      # Event card with date badge, tags, capacity bar
│   │   ├── Navbar.tsx         # Sticky glass-morphism navbar with mobile menu
│   │   └── ProtectedRoute.tsx # Auth guard wrapper
│   ├── context/
│   │   ├── AuthContext.tsx     # Auth state + event registration management
│   │   └── ToastContext.tsx    # Toast notification system
│   ├── data/
│   │   └── mockData.ts        # Sample clubs and events
│   ├── pages/
│   │   ├── LoginPage.tsx      # Sign-in with email validation
│   │   ├── EventsPage.tsx     # Browse, search, filter, register
│   │   └── ProfilePage.tsx    # User info, stats, registered events
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces (Club, ClubEvent, User)
│   ├── App.tsx                # Root routing with auth/toast providers
│   ├── main.tsx               # Entry point
│   └── index.css              # Tailwind v4 config + design tokens
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [TypeScript 5.9](https://typescriptlang.org) | Type safety |
| [Vite 7](https://vite.dev) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [React Router 7](https://reactrouter.com) | Client-side routing |

## 📄 License

MIT
