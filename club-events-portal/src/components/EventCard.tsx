import type { ClubEvent } from "../types";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getGoogleCalendarUrl } from "../utils/calendar";
import { useState } from "react";

interface EventCardProps {
  event: ClubEvent;
  onOpenDetails: (event: ClubEvent) => void;
  onOpenTicket: (event: ClubEvent) => void;
}

export default function EventCard({ event, onOpenDetails, onOpenTicket }: EventCardProps) {
  const { isRegistered, toggleEventRegistration } = useAuth();
  const { showToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const registered = isRegistered(event.id);
  const fillPercent = Math.round((event.registered / event.capacity) * 100);
  const spotsLeft = event.capacity - event.registered;
  const almostFull = fillPercent >= 85;
  const isFull = spotsLeft <= 0;

  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleString("default", { month: "short" }).toUpperCase();
  const day = eventDate.getDate();

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!registered && isFull) {
      showToast("Event is already fully booked!", "error");
      return;
    }
    toggleEventRegistration(event.id);
    if (!registered) {
      showToast(`Registered for "${event.title}"! 🎉`, "success");
    } else {
      showToast(`Cancelled registration for "${event.title}"`, "info");
    }
  };

  return (
    <div
      className="cyber-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(event)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "1.25rem",
        position: "relative",
        cursor: "pointer",
        borderColor: isHovered ? event.club.color : "#27272a",
        boxShadow: isHovered
          ? `0 0 24px ${event.club.color}20, 0 8px 32px rgba(0, 0, 0, 0.5)`
          : "none",
        transition: "all 0.2s ease-in-out",
        transform: isHovered ? "translateY(-2px)" : "none",
      }}
    >
      <div>
        {/* Header: Date + Club Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.875rem",
          }}
        >
          {/* Club Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              background: "#27272a",
              border: `1px solid ${event.club.color}40`,
              borderRadius: "0.25rem",
              padding: "0.25rem 0.5rem",
              fontSize: "0.6875rem",
              color: "#fafafa",
            }}
          >
            <span>{event.club.icon}</span>
            <span style={{ fontWeight: 600 }}>{event.club.name}</span>
          </div>

          {/* Date Badge */}
          <div
            style={{
              textAlign: "center",
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "0.375rem",
              padding: "0.25rem 0.5rem",
              minWidth: "2.5rem",
            }}
          >
            <div
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                color: event.club.color,
                letterSpacing: "0.05em",
              }}
            >
              {month}
            </div>
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: 800,
                color: "#fafafa",
                lineHeight: 1,
              }}
            >
              {day}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "0.9375rem",
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.4,
            marginBottom: "0.5rem",
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.75rem",
            color: "#a1a1aa",
            lineHeight: 1.5,
            marginBottom: "0.875rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: "2.25rem",
          }}
        >
          {event.description}
        </p>

        {/* Details Meta */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            fontSize: "0.6875rem",
            color: "#71717a",
            marginBottom: "0.875rem",
            fontFamily: "monospace",
          }}
        >
          <div>🕐 {event.time}</div>
          <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            📍 {event.location}
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.25rem",
            marginBottom: "1rem",
          }}
        >
          {event.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.625rem",
                fontWeight: 500,
                color: "#a1a1aa",
                background: "#18181b",
                border: "1px solid #27272a",
                padding: "0.125rem 0.375rem",
                borderRadius: "0.25rem",
              }}
            >
              #{tag.toLowerCase()}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span
              style={{
                fontSize: "0.625rem",
                color: "#71717a",
                padding: "0.125rem 0.25rem",
              }}
            >
              +{event.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      <div>
        {/* Capacity Progress Bar */}
        <div style={{ marginBottom: "0.875rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.625rem",
              color: "#a1a1aa",
              marginBottom: "0.25rem",
            }}
          >
            <span>
              {event.registered} / {event.capacity} joined
            </span>
            <span
              style={{
                color: isFull ? "#ef4444" : almostFull ? "#f59e0b" : event.club.color,
                fontWeight: 600,
              }}
            >
              {isFull ? "Sold Out" : almostFull ? `${spotsLeft} left` : `${fillPercent}%`}
            </span>
          </div>
          <div
            style={{
              height: "3px",
              background: "#27272a",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, fillPercent)}%`,
                background: isFull ? "#ef4444" : almostFull ? "#f59e0b" : event.club.color,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", gap: "0.375rem" }}>
          {registered ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenTicket(event);
                }}
                style={{
                  flex: 1,
                  padding: "0.45rem 0.5rem",
                  borderRadius: "0.25rem",
                  border: `1px solid ${event.club.color}`,
                  background: `${event.club.color}15`,
                  color: event.club.color,
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.25rem",
                }}
              >
                🎟️ Pass
              </button>
              <button
                onClick={handleRegister}
                style={{
                  padding: "0.45rem 0.6rem",
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
            </>
          ) : (
            <>
              <button
                onClick={handleRegister}
                disabled={isFull}
                style={{
                  flex: 1,
                  padding: "0.45rem 0.5rem",
                  borderRadius: "0.25rem",
                  border: "none",
                  background: isFull ? "#27272a" : "#fafafa",
                  color: isFull ? "#71717a" : "#09090b",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  cursor: isFull ? "not-allowed" : "pointer",
                  transition: "all 0.15s ease",
                  fontFamily: "inherit",
                }}
              >
                {isFull ? "Full" : "Join Event"}
              </button>
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Add to Google Calendar"
                style={{
                  padding: "0.45rem 0.5rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #27272a",
                  background: "#18181b",
                  color: "#a1a1aa",
                  fontSize: "0.6875rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                📅
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
