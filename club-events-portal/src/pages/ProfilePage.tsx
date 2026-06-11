import { useAuth } from "../context/AuthContext";
import { events } from "../data/mockData";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const { user, toggleEventRegistration, isRegistered } = useAuth();

  const registeredEvents = events.filter((evt) => isRegistered(evt.id));

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

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
          maxWidth: "720px",
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
          {/* Minimal Avatar */}
          <div
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "0.25rem",
              border: "1px solid #3f3f46",
              background: "#27272a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "#fafafa",
            }}
          >
            {initials}
          </div>

          <h1
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
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
            {user?.email}
          </p>

          {/* Stats Grid */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
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
            <div
              style={{
                width: "1px",
                background: "#27272a",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
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
        <h2
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#fafafa",
            marginBottom: "0.75rem",
          }}
        >
          My Schedule & Registrations
        </h2>

        {/* Events list */}
        {registeredEvents.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {registeredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const dateStr = eventDate.toLocaleDateString("default", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={event.id}
                  className="cyber-card"
                  style={{
                    padding: "0.75rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    background: "#18181b",
                  }}
                >
                  {/* Small Emoji badge */}
                  <div
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #27272a",
                      background: "#09090b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {event.club.icon}
                  </div>

                  {/* Title & Timing Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "#fafafa",
                        marginBottom: "0.125rem",
                      }}
                    >
                      {event.title}
                    </h3>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        color: "#a1a1aa",
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        fontFamily: "monospace",
                      }}
                    >
                      <span>{dateStr} · {event.time}</span>
                      <span style={{ color: "#71717a" }}>📍 {event.location}</span>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => toggleEventRegistration(event.id)}
                    style={{
                      padding: "0.3rem 0.6rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #27272a",
                      background: "transparent",
                      color: "#a1a1aa",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#ef4444";
                      e.currentTarget.style.color = "#ef4444";
                      e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#27272a";
                      e.currentTarget.style.color = "#a1a1aa";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    Cancel
                  </button>
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
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#fafafa",
                marginBottom: "0.25rem",
              }}
            >
              No registered events
            </h3>
            <p style={{ color: "#71717a", fontSize: "0.75rem" }}>
              Explore the events page to find and register for events.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
