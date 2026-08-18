import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Navbar from "../components/Navbar";
import TicketModal from "../components/TicketModal";
import { getGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";
import type { ClubEvent } from "../types";

export default function ProfilePage() {
  const { user, eventsList, toggleEventRegistration, isRegistered } = useAuth();
  const { showToast } = useToast();
  const [selectedTicketEvent, setSelectedTicketEvent] = useState<ClubEvent | null>(null);

  const registeredEvents = eventsList.filter((evt) => isRegistered(evt.id));

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleCancelRegistration = (event: ClubEvent) => {
    toggleEventRegistration(event.id);
    showToast(`Cancelled registration for "${event.title}"`, "info");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#09090b" }}>
      <Navbar />

      <main
        className="page-enter"
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "2rem 1.5rem 3rem",
        }}
      >
        {/* Profile Stats Card */}
        <div
          className="cyber-card"
          style={{
            padding: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
            background: "#18181b",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "0.5rem",
              border: "1px solid #3f3f46",
              background: "#27272a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#fafafa",
            }}
          >
            {initials}
          </div>

          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#fafafa",
              marginBottom: "0.125rem",
            }}
          >
            {user?.name}
          </h1>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#71717a",
              marginBottom: "1.5rem",
              fontFamily: "monospace",
            }}
          >
            {user?.email} {user?.role === "organizer" && <span style={{ color: "#60a5fa" }}>• [Club Organizer]</span>}
          </p>

          {/* Stats Grid */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2.5rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fafafa",
                }}
              >
                {registeredEvents.length}
              </div>
              <div
                style={{
                  fontSize: "0.625rem",
                  color: "#71717a",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Events Joined
              </div>
            </div>

            <div style={{ width: "1px", background: "#27272a" }} />

            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fafafa",
                }}
              >
                {new Set(registeredEvents.map((e) => e.club.id)).size}
              </div>
              <div
                style={{
                  fontSize: "0.625rem",
                  color: "#71717a",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Clubs & Chapters
              </div>
            </div>
          </div>
        </div>

        {/* Registered Events Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "#fafafa",
              margin: 0,
            }}
          >
            My Event Passes & Schedule
          </h2>
          <span style={{ fontSize: "0.75rem", color: "#71717a", fontFamily: "monospace" }}>
            {registeredEvents.length} active passes
          </span>
        </div>

        {/* Events list */}
        {registeredEvents.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {registeredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const dateStr = eventDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={event.id}
                  className="cyber-card"
                  style={{
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: "#18181b",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Emoji badge */}
                  <div
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      borderRadius: "0.375rem",
                      border: `1px solid ${event.club.color}40`,
                      background: "#09090b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      flexShrink: 0,
                    }}
                  >
                    {event.club.icon}
                  </div>

                  {/* Title & Timing Info */}
                  <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "#fafafa",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {event.title}
                    </h3>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        color: "#a1a1aa",
                        display: "flex",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                        fontFamily: "monospace",
                      }}
                    >
                      <span>📅 {dateStr} · {event.time}</span>
                      <span style={{ color: "#71717a" }}>📍 {event.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons: Pass, Cal, Cancel */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
                    <button
                      onClick={() => setSelectedTicketEvent(event)}
                      style={{
                        padding: "0.4rem 0.75rem",
                        borderRadius: "0.25rem",
                        border: `1px solid ${event.club.color}`,
                        background: `${event.club.color}20`,
                        color: event.club.color,
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      🎟️ Digital Pass
                    </button>

                    <a
                      href={getGoogleCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Add to Google Calendar"
                      style={{
                        padding: "0.4rem 0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #27272a",
                        background: "#09090b",
                        color: "#fafafa",
                        fontSize: "0.6875rem",
                        textDecoration: "none",
                      }}
                    >
                      📅
                    </a>

                    <button
                      onClick={() => downloadIcsFile(event)}
                      title="Download iCal file"
                      style={{
                        padding: "0.4rem 0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #27272a",
                        background: "#09090b",
                        color: "#fafafa",
                        fontSize: "0.6875rem",
                        cursor: "pointer",
                      }}
                    >
                      📥
                    </button>

                    <button
                      onClick={() => handleCancelRegistration(event)}
                      style={{
                        padding: "0.4rem 0.6rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #3f3f46",
                        background: "transparent",
                        color: "#a1a1aa",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#ef4444";
                        e.currentTarget.style.color = "#ef4444";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#3f3f46";
                        e.currentTarget.style.color = "#a1a1aa";
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="cyber-card"
            style={{
              padding: "2.5rem",
              textAlign: "center",
              background: "#18181b",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📭</div>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#fafafa",
                marginBottom: "0.25rem",
              }}
            >
              No active event registrations
            </h3>
            <p style={{ color: "#71717a", fontSize: "0.75rem" }}>
              Explore the events page to join club workshops and generate your event passes.
            </p>
          </div>
        )}

        {/* Digital Ticket Modal */}
        {selectedTicketEvent && user && (
          <TicketModal
            event={selectedTicketEvent}
            user={user}
            onClose={() => setSelectedTicketEvent(null)}
          />
        )}
      </main>
    </div>
  );
}
