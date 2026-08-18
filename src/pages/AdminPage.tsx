import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Navbar from "../components/Navbar";
import CreateEventModal from "../components/CreateEventModal";
import type { ClubEvent } from "../types";

export default function AdminPage() {
  const { eventsList, createEvent, deleteEvent, user, logout } = useAuth();
  const { showToast } = useToast();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedEventForRoster, setSelectedEventForRoster] = useState<ClubEvent | null>(null);

  const isOrganizer = user?.role === "organizer" || user?.email.endsWith("@vit.ac.in");

  const totalRegistered = eventsList.reduce((acc, curr) => acc + curr.registered, 0);
  const totalCapacity = eventsList.reduce((acc, curr) => acc + curr.capacity, 0);
  const avgOccupancy = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0;

  const handleExportCsv = (event: ClubEvent) => {
    const attendees = event.attendees || [];
    if (attendees.length === 0) {
      showToast("No attendees registered for this event yet.", "info");
      return;
    }

    const headers = ["Ticket ID", "Attendee Name", "Email Address", "Registration Date"];
    const rows = attendees.map((a) => [a.ticketId, a.name, a.email, a.registeredAt]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `attendees-${event.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${attendees.length} attendee records as CSV! 📊`, "success");
  };

  const handleDelete = (event: ClubEvent) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      deleteEvent(event.id);
      showToast(`Event "${event.title}" deleted`, "info");
      if (selectedEventForRoster?.id === event.id) {
        setSelectedEventForRoster(null);
      }
    }
  };

  // If logged in as student, show access control prompt
  if (!isOrganizer) {
    return (
      <div style={{ minHeight: "100vh", background: "#09090b" }}>
        <Navbar />
        <main
          className="page-enter"
          style={{
            maxWidth: "600px",
            margin: "4rem auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <div
            className="cyber-card"
            style={{
              padding: "2.5rem 2rem",
              background: "#18181b",
              borderRadius: "0.75rem",
              border: "1px solid #3f3f46",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔒</div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fafafa", marginBottom: "0.5rem" }}>
              Organizer Access Restricted
            </h1>
            <p style={{ fontSize: "0.8125rem", color: "#a1a1aa", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              You are currently signed in as a student (<strong>{user?.email}</strong>). Publishing new
              campus events and viewing attendee rosters is restricted to club organizers & faculty with an{" "}
              <code
                style={{
                  color: "#10b981",
                  background: "#09090b",
                  padding: "0.2rem 0.4rem",
                  borderRadius: "0.25rem",
                }}
              >
                @vit.ac.in
              </code>{" "}
              email.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <Link
                to="/events"
                style={{
                  padding: "0.55rem 1rem",
                  background: "#27272a",
                  border: "1px solid #3f3f46",
                  borderRadius: "0.25rem",
                  color: "#fafafa",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                ← Back to Student Events
              </Link>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                style={{
                  padding: "0.55rem 1rem",
                  background: "#10b981",
                  border: "none",
                  borderRadius: "0.25rem",
                  color: "#09090b",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Switch to @vit.ac.in Account 🛡️
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.25rem 0.5rem",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "0.25rem",
                fontSize: "0.6875rem",
                color: "#10b981",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              🛡️ VIT Organizer Console (Verified @vit.ac.in)
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Campus Events & Club Management
            </h1>
            <p style={{ fontSize: "0.8125rem", color: "#a1a1aa", margin: "0.25rem 0 0" }}>
              Publish new events for student chapters, inspect registered student rosters, and export
              attendance CSVs.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            style={{
              padding: "0.625rem 1.25rem",
              background: "#10b981",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.375rem",
              fontSize: "0.8125rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 0 20px rgba(16,185,129,0.3)",
            }}
          >
            <span>+</span> Publish New Event
          </button>
        </div>

        {/* Quick KPI Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div className="cyber-card" style={{ padding: "1.25rem", background: "#18181b" }}>
            <div style={{ fontSize: "0.75rem", color: "#71717a", textTransform: "uppercase" }}>
              Total Campus Events
            </div>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#fafafa",
                marginTop: "0.25rem",
              }}
            >
              {eventsList.length}
            </div>
          </div>

          <div className="cyber-card" style={{ padding: "1.25rem", background: "#18181b" }}>
            <div style={{ fontSize: "0.75rem", color: "#71717a", textTransform: "uppercase" }}>
              Total Student RSVPs
            </div>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#3b82f6",
                marginTop: "0.25rem",
              }}
            >
              {totalRegistered}
            </div>
          </div>

          <div className="cyber-card" style={{ padding: "1.25rem", background: "#18181b" }}>
            <div style={{ fontSize: "0.75rem", color: "#71717a", textTransform: "uppercase" }}>
              Available Capacity
            </div>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#10b981",
                marginTop: "0.25rem",
              }}
            >
              {totalCapacity}
            </div>
          </div>

          <div className="cyber-card" style={{ padding: "1.25rem", background: "#18181b" }}>
            <div style={{ fontSize: "0.75rem", color: "#71717a", textTransform: "uppercase" }}>
              Average Fill Rate
            </div>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#f59e0b",
                marginTop: "0.25rem",
              }}
            >
              {avgOccupancy}%
            </div>
          </div>
        </div>

        {/* Events Table / List */}
        <div
          className="cyber-card"
          style={{
            background: "#18181b",
            borderRadius: "0.5rem",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid #27272a",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#fafafa", margin: 0 }}>
              Live Event Listings
            </h2>
            <span style={{ fontSize: "0.75rem", color: "#71717a", fontFamily: "monospace" }}>
              {eventsList.length} events published
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "0.75rem",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#121214",
                    color: "#71717a",
                    borderBottom: "1px solid #27272a",
                  }}
                >
                  <th style={{ padding: "0.75rem 1rem" }}>Event Title</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Club</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Date & Time</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Venue</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Registrations</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventsList.map((evt) => {
                  const pct = Math.round((evt.registered / evt.capacity) * 100);
                  return (
                    <tr
                      key={evt.id}
                      style={{
                        borderBottom: "1px solid #27272a",
                        color: "#fafafa",
                      }}
                    >
                      <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>{evt.title}</td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <span
                          style={{
                            padding: "0.2rem 0.5rem",
                            borderRadius: "0.25rem",
                            background: `${evt.club.color}15`,
                            color: evt.club.color,
                            fontWeight: 600,
                            fontSize: "0.6875rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <span>{evt.club.icon}</span>
                          <span>{evt.club.name}</span>
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "0.75rem 1rem",
                          color: "#a1a1aa",
                          fontFamily: "monospace",
                        }}
                      >
                        {evt.date} · {evt.time}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", color: "#a1a1aa" }}>{evt.location}</td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span>
                            {evt.registered} / {evt.capacity}
                          </span>
                          <span
                            style={{
                              color: pct >= 85 ? "#ef4444" : "#10b981",
                              fontSize: "0.6875rem",
                            }}
                          >
                            ({pct}%)
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.375rem" }}>
                          <button
                            onClick={() => setSelectedEventForRoster(evt)}
                            style={{
                              padding: "0.3rem 0.6rem",
                              background: "#27272a",
                              border: "1px solid #3f3f46",
                              borderRadius: "0.25rem",
                              color: "#fafafa",
                              cursor: "pointer",
                              fontSize: "0.6875rem",
                              fontWeight: 600,
                            }}
                          >
                            👥 Roster
                          </button>
                          <button
                            onClick={() => handleExportCsv(evt)}
                            style={{
                              padding: "0.3rem 0.6rem",
                              background: "#27272a",
                              border: "1px solid #3f3f46",
                              borderRadius: "0.25rem",
                              color: "#60a5fa",
                              cursor: "pointer",
                              fontSize: "0.6875rem",
                              fontWeight: 600,
                            }}
                          >
                            📥 CSV
                          </button>
                          <button
                            onClick={() => handleDelete(evt)}
                            style={{
                              padding: "0.3rem 0.6rem",
                              background: "rgba(239, 68, 68, 0.1)",
                              border: "1px solid rgba(239, 68, 68, 0.3)",
                              borderRadius: "0.25rem",
                              color: "#ef4444",
                              cursor: "pointer",
                              fontSize: "0.6875rem",
                              fontWeight: 600,
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendee Roster Modal */}
        {selectedEventForRoster && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "1rem",
            }}
            onClick={() => setSelectedEventForRoster(null)}
          >
            <div
              className="cyber-card page-enter"
              style={{
                width: "100%",
                maxWidth: "680px",
                maxHeight: "85vh",
                display: "flex",
                flexDirection: "column",
                background: "#121214",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1px solid #3f3f46",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid #27272a",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#18181b",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "#fafafa",
                      margin: 0,
                    }}
                  >
                    Attendee Roster: {selectedEventForRoster.title}
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "#a1a1aa", margin: "0.25rem 0 0" }}>
                    {selectedEventForRoster.attendees?.length || 0} Registered Students
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEventForRoster(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#a1a1aa",
                    fontSize: "1.25rem",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: "1.25rem", overflowY: "auto", flex: 1 }}>
                {(selectedEventForRoster.attendees || []).length > 0 ? (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      textAlign: "left",
                      fontSize: "0.75rem",
                    }}
                  >
                    <thead>
                      <tr style={{ color: "#71717a", borderBottom: "1px solid #27272a" }}>
                        <th style={{ padding: "0.5rem" }}>Ticket ID</th>
                        <th style={{ padding: "0.5rem" }}>Student Name</th>
                        <th style={{ padding: "0.5rem" }}>VIT Email</th>
                        <th style={{ padding: "0.5rem" }}>Registration Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEventForRoster.attendees?.map((a) => (
                        <tr
                          key={a.ticketId}
                          style={{ borderBottom: "1px solid #27272a", color: "#fafafa" }}
                        >
                          <td
                            style={{
                              padding: "0.5rem",
                              fontFamily: "monospace",
                              color: "#60a5fa",
                            }}
                          >
                            {a.ticketId}
                          </td>
                          <td style={{ padding: "0.5rem", fontWeight: 600 }}>{a.name}</td>
                          <td style={{ padding: "0.5rem", color: "#a1a1aa" }}>{a.email}</td>
                          <td
                            style={{
                              padding: "0.5rem",
                              color: "#71717a",
                              fontFamily: "monospace",
                            }}
                          >
                            {a.registeredAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ textAlign: "center", padding: "2rem", color: "#71717a" }}>
                    No student registrations found yet.
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: "1rem 1.5rem",
                  borderTop: "1px solid #27272a",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                  background: "#18181b",
                }}
              >
                <button
                  onClick={() => handleExportCsv(selectedEventForRoster)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#10b981",
                    border: "none",
                    borderRadius: "0.25rem",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  📥 Export Attendance CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {isCreateOpen && (
          <CreateEventModal
            onClose={() => setIsCreateOpen(false)}
            onCreate={createEvent}
          />
        )}
      </main>
    </div>
  );
}
