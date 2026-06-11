import { useState, useMemo } from "react";
import { events, clubs } from "../data/mockData";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState<string>("all");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesClub =
        selectedClub === "all" || event.club.id === selectedClub;

      return matchesSearch && matchesClub;
    });
  }, [searchQuery, selectedClub]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
      }}
    >
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
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#fafafa",
              letterSpacing: "-0.02em",
              marginBottom: "0.25rem",
            }}
          >
            Explore Clubs & Chapters
          </h1>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "#a1a1aa",
            }}
          >
            Browse hackathons, workshops, jamming sessions, and art meetups across campus.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          className="cyber-card"
          style={{
            padding: "0.75rem",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "center",
            background: "#18181b",
          }}
        >
          {/* Search Field */}
          <div style={{ flex: "1 1 240px", position: "relative" }}>
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
              placeholder="Search by title, description, tags..."
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
                transition: "border-color 0.15s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#3f3f46";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#27272a";
              }}
            />
          </div>

          {/* Club Filter Chips */}
          <div
            style={{
              display: "flex",
              gap: "0.25rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setSelectedClub("all")}
              style={{
                padding: "0.3rem 0.6rem",
                borderRadius: "0.25rem",
                border: "1px solid",
                borderColor: selectedClub === "all" ? "#fafafa" : "#27272a",
                background: selectedClub === "all" ? "#fafafa" : "transparent",
                color: selectedClub === "all" ? "#09090b" : "#a1a1aa",
                fontSize: "0.6875rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              All
            </button>
            {clubs.map((club) => (
              <button
                key={club.id}
                onClick={() => setSelectedClub(club.id)}
                style={{
                  padding: "0.3rem 0.6rem",
                  borderRadius: "0.25rem",
                  border: "1px solid",
                  borderColor: selectedClub === club.id ? club.color : "#27272a",
                  background: selectedClub === club.id ? `${club.color}15` : "transparent",
                  color: selectedClub === club.id ? club.color : "#a1a1aa",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
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
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
        </p>

        {/* Grid List */}
        {filteredEvents.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
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
              No events matched your search
            </h3>
            <p style={{ color: "#71717a", fontSize: "0.75rem" }}>
              Try adjusting filters or clear search query to find more.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
