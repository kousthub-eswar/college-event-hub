import { useState } from "react";
import type { ClubEvent } from "../types";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";

interface EventDetailModalProps {
  event: ClubEvent;
  onClose: () => void;
  onOpenTicket: () => void;
}

export default function EventDetailModal({ event, onClose, onOpenTicket }: EventDetailModalProps) {
  const { isRegistered, toggleEventRegistration } = useAuth();
  const { showToast } = useToast();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const registered = isRegistered(event.id);
  const fillPercent = Math.round((event.registered / event.capacity) * 100);
  const spotsLeft = event.capacity - event.registered;
  const isFull = spotsLeft <= 0;

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRegisterToggle = () => {
    if (!registered && isFull) {
      showToast("This event has reached full capacity!", "error");
      return;
    }
    toggleEventRegistration(event.id);
    if (!registered) {
      showToast(`Registered for "${event.title}"! 🎉`, "success");
    } else {
      showToast(`Registration cancelled for "${event.title}"`, "info");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        className="cyber-card page-enter"
        style={{
          width: "100%",
          maxWidth: "650px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          background: "#121214",
          border: `1px solid ${event.club.color}40`,
          borderRadius: "0.75rem",
          overflow: "hidden",
          boxShadow: `0 0 35px ${event.club.color}20, 0 20px 40px rgba(0,0,0,0.8)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Banner Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${event.club.color}30, #18181b)`,
            borderBottom: "1px solid #27272a",
            padding: "1.5rem",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "#fafafa",
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            ✕
          </button>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(0,0,0,0.4)",
              border: `1px solid ${event.club.color}60`,
              padding: "0.25rem 0.625rem",
              borderRadius: "1rem",
              fontSize: "0.75rem",
              color: "#fafafa",
              marginBottom: "0.75rem",
            }}
          >
            <span>{event.club.icon}</span>
            <span style={{ fontWeight: 600 }}>{event.club.name}</span>
          </div>

          <h2
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.3,
              marginBottom: "0.5rem",
            }}
          >
            {event.title}
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              fontSize: "0.75rem",
              color: "#a1a1aa",
              fontFamily: "monospace",
            }}
          >
            <span>📅 {formattedDate}</span>
            <span>🕐 {event.time}</span>
            <span>📍 {event.location}</span>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div
          style={{
            padding: "1.5rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Capacity and Registration Bar */}
          <div
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "0.5rem",
              padding: "0.875rem 1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
                fontSize: "0.75rem",
              }}
            >
              <span style={{ color: "#a1a1aa" }}>
                👥 Capacity: <strong style={{ color: "#fafafa" }}>{event.registered}</strong> /{" "}
                {event.capacity} Registered
              </span>
              <span
                style={{
                  fontWeight: 600,
                  color: isFull ? "#ef4444" : event.club.color,
                }}
              >
                {isFull ? "Event Full" : `${spotsLeft} spots available (${fillPercent}%)`}
              </span>
            </div>
            <div
              style={{
                height: "4px",
                background: "#27272a",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, fillPercent)}%`,
                  background: isFull ? "#ef4444" : event.club.color,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* About Event */}
          <div>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#fafafa",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              About the Event
            </h3>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "#d4d4d8",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {event.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
            {event.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.6875rem",
                  color: "#a1a1aa",
                  background: "#18181b",
                  border: "1px solid #27272a",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "0.25rem",
                  fontWeight: 500,
                }}
              >
                #{t.toLowerCase()}
              </span>
            ))}
          </div>

          {/* Perks & Highlights */}
          {event.perks && event.perks.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#fafafa",
                  marginBottom: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Perks & Inclusions
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "0.5rem",
                }}
              >
                {event.perks.map((perk, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "#18181b",
                      border: "1px solid #27272a",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      color: "#e4e4e7",
                    }}
                  >
                    <span style={{ color: "#10b981" }}>✓</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Itinerary / Agenda */}
          {event.agenda && event.agenda.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#fafafa",
                  marginBottom: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Schedule & Agenda
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  borderLeft: `2px solid ${event.club.color}60`,
                  paddingLeft: "1rem",
                  marginLeft: "0.25rem",
                }}
              >
                {event.agenda.map((item, idx) => (
                  <div key={idx} style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-1.35rem",
                        top: "0.25rem",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: event.club.color,
                      }}
                    />
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        color: event.club.color,
                        fontFamily: "monospace",
                        fontWeight: 600,
                      }}
                    >
                      {item.time}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#fafafa", fontWeight: 500 }}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {event.faqs && event.faqs.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#fafafa",
                  marginBottom: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Frequently Asked Questions
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {event.faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div
                      key={index}
                      style={{
                        background: "#18181b",
                        border: "1px solid #27272a",
                        borderRadius: "0.375rem",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        style={{
                          width: "100%",
                          padding: "0.625rem 0.875rem",
                          background: "none",
                          border: "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          color: "#fafafa",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          textAlign: "left",
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        <span>{faq.question}</span>
                        <span style={{ color: "#71717a" }}>{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div
                          style={{
                            padding: "0 0.875rem 0.625rem",
                            fontSize: "0.75rem",
                            color: "#a1a1aa",
                            lineHeight: 1.5,
                          }}
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: "1rem 1.5rem",
            background: "#18181b",
            borderTop: "1px solid #27272a",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Calendar sync quick links */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <a
              href={getGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0.4rem 0.65rem",
                background: "#27272a",
                border: "1px solid #3f3f46",
                borderRadius: "0.25rem",
                color: "#fafafa",
                fontSize: "0.6875rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              📅 GCal
            </a>
            <button
              onClick={() => downloadIcsFile(event)}
              style={{
                padding: "0.4rem 0.65rem",
                background: "#27272a",
                border: "1px solid #3f3f46",
                borderRadius: "0.25rem",
                color: "#fafafa",
                fontSize: "0.6875rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              📥 .iCal
            </button>
          </div>

          {/* Primary RSVP / Ticket Action */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {registered && (
              <button
                onClick={onOpenTicket}
                style={{
                  padding: "0.5rem 0.875rem",
                  background: "transparent",
                  border: `1px solid ${event.club.color}`,
                  color: event.club.color,
                  borderRadius: "0.25rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                🎟️ View Pass
              </button>
            )}

            <button
              onClick={handleRegisterToggle}
              disabled={!registered && isFull}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "0.25rem",
                border: registered ? "1px solid #ef4444" : "none",
                background: registered
                  ? "rgba(239, 68, 68, 0.1)"
                  : isFull
                  ? "#27272a"
                  : event.club.color,
                color: registered ? "#ef4444" : isFull ? "#71717a" : "#ffffff",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: !registered && isFull ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s ease",
              }}
            >
              {registered ? "Cancel Registration" : isFull ? "Event Full" : "Register Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
