import { useState, useMemo } from "react";
import { clubs } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import EventDetailModal from "../components/EventDetailModal";
import TicketModal from "../components/TicketModal";
import type { ClubEvent } from "../types";

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "coding", label: "💻 Tech & Code" },
  { id: "workshop", label: "🛠️ Workshops" },
  { id: "art", label: "🎨 Arts & Creative" },
  { id: "music", label: "🎵 Music & Social" },
];

export default function EventsPage() {
  const { eventsList, user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "popular" | "spots">("date");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Modals state
  const [detailedEvent, setDetailedEvent] = useState<ClubEvent | null>(null);
  const [ticketEvent, setTicketEvent] = useState<ClubEvent | null>(null);

  const filteredAndSortedEvents = useMemo(() => {
    return eventsList
      .filter((event) => {
        // Search query
        const matchesSearch =
          searchQuery === "" ||
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        // Club filter
        const matchesClub = selectedClub === "all" || event.club.id === selectedClub;

        // Category filter
        const matchesCategory =
          selectedCategory === "all" ||
          event.tags.some((tag) => tag.toLowerCase().includes(selectedCategory.toLowerCase())) ||
          (selectedCategory === "coding" &&
            (event.tags.includes("Coding") ||
              event.tags.includes("Blockchain") ||
              event.tags.includes("Android"))) ||
          (selectedCategory === "workshop" && event.tags.includes("Workshop")) ||
          (selectedCategory === "art" && event.tags.includes("Art")) ||
          (selectedCategory === "music" && event.tags.includes("Music"));

        // Only Available filter
        const spotsLeft = event.capacity - event.registered;
        const matchesAvailable = !onlyAvailable || spotsLeft > 0;

        return matchesSearch && matchesClub && matchesCategory && matchesAvailable;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === "popular") {
          return b.registered - a.registered;
        }
        if (sortBy === "spots") {
          const spotsA = a.capacity - a.registered;
          const spotsB = b.capacity - b.registered;
          return spotsA - spotsB;
        }
        return 0;
      });
  }, [eventsList, searchQuery, selectedClub, selectedCategory, sortBy, onlyAvailable]);

  return (
    <div style={{ minHeight: "100vh", background: "#09090b" }}>
      <Navbar />

      <main
        className="page-enter"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "2rem 1.5rem 3rem",
        }}
      >
        {/* Header Title */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.02em",
              marginBottom: "0.25rem",
            }}
          >
            Explore Clubs & Events
          </h1>
          <p style={{ fontSize: "0.8125rem", color: "#a1a1aa", margin: 0 }}>
            Discover student workshops, hackathons, open mics, and exhibitions across campus.
          </p>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div
          className="cyber-card"
          style={{
            padding: "1rem",
            marginBottom: "1.5rem",
            background: "#18181b",
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
          }}
        >
          {/* Top row: Search + Sort + Available Filter */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Search Input */}
            <div style={{ flex: "1 1 260px", position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "0.75rem",
                  color: "#71717a",
                  pointerEvents: "none",
                }}
              >
                🔍
              </span>
              <input
                id="search-input"
                type="text"
                placeholder="Search events, topics, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.45rem 0.75rem 0.45rem 2rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #27272a",
                  fontSize: "0.75rem",
                  fontFamily: "inherit",
                  background: "#09090b",
                  color: "#fafafa",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Sort & Availability Toggles */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "popular" | "spots")}
                style={{
                  padding: "0.45rem 0.75rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #27272a",
                  background: "#09090b",
                  color: "#fafafa",
                  fontSize: "0.75rem",
                  fontFamily: "inherit",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="date">📅 Sort: Upcoming Soonest</option>
                <option value="popular">🔥 Sort: Most Popular</option>
                <option value="spots">⚡ Sort: Fewest Spots Left</option>
              </select>

              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.75rem",
                  color: "#a1a1aa",
                  cursor: "pointer",
                  userSelect: "none",
                  background: "#09090b",
                  padding: "0.35rem 0.6rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #27272a",
                }}
              >
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                <span>Spots Open Only</span>
              </label>
            </div>
          </div>

          {/* Category Pills */}
          <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "0.3rem 0.6rem",
                  borderRadius: "0.25rem",
                  border: "1px solid",
                  borderColor: selectedCategory === cat.id ? "#3b82f6" : "#27272a",
                  background: selectedCategory === cat.id ? "rgba(59, 130, 246, 0.15)" : "#09090b",
                  color: selectedCategory === cat.id ? "#60a5fa" : "#a1a1aa",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Club Filter Chips */}
          <div
            style={{
              display: "flex",
              gap: "0.25rem",
              flexWrap: "wrap",
              borderTop: "1px solid #27272a",
              paddingTop: "0.75rem",
            }}
          >
            <button
              onClick={() => setSelectedClub("all")}
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid",
                borderColor: selectedClub === "all" ? "#fafafa" : "#27272a",
                background: selectedClub === "all" ? "#fafafa" : "transparent",
                color: selectedClub === "all" ? "#09090b" : "#a1a1aa",
                fontSize: "0.6875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              All Clubs
            </button>
            {clubs.map((club) => (
              <button
                key={club.id}
                onClick={() => setSelectedClub(club.id)}
                style={{
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                  border: "1px solid",
                  borderColor: selectedClub === club.id ? club.color : "#27272a",
                  background: selectedClub === club.id ? `${club.color}15` : "transparent",
                  color: selectedClub === club.id ? club.color : "#a1a1aa",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <span>{club.icon}</span>
                {club.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter Label */}
        <p
          style={{
            fontSize: "0.6875rem",
            color: "#71717a",
            marginBottom: "1rem",
            fontFamily: "monospace",
          }}
        >
          Showing {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? "s" : ""}
        </p>

        {/* Grid List */}
        {filteredAndSortedEvents.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {filteredAndSortedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onOpenDetails={(e) => setDetailedEvent(e)}
                onOpenTicket={(e) => setTicketEvent(e)}
              />
            ))}
          </div>
        ) : (
          <div
            className="cyber-card"
            style={{
              padding: "3rem",
              textAlign: "center",
              background: "#18181b",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔎</div>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#fafafa",
                marginBottom: "0.25rem",
              }}
            >
              No matching campus events found
            </h3>
            <p style={{ color: "#71717a", fontSize: "0.75rem" }}>
              Try clearing some filters or changing your search terms.
            </p>
          </div>
        )}

        {/* Event Detail Modal */}
        {detailedEvent && (
          <EventDetailModal
            event={detailedEvent}
            onClose={() => setDetailedEvent(null)}
            onOpenTicket={() => {
              const evt = detailedEvent;
              setDetailedEvent(null);
              setTicketEvent(evt);
            }}
          />
        )}

        {/* Ticket Modal */}
        {ticketEvent && user && (
          <TicketModal
            event={ticketEvent}
            user={user}
            onClose={() => setTicketEvent(null)}
          />
        )}
      </main>
    </div>
  );
}
