import type { ClubEvent } from "../types";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useState } from "react";

interface EventCardProps {
  event: ClubEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const { isRegistered, toggleEventRegistration } = useAuth();
  const { showToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const registered = isRegistered(event.id);
  const fillPercent = Math.round((event.registered / event.capacity) * 100);
  const spotsLeft = event.capacity - event.registered;
  const almostFull = fillPercent >= 85;

  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleString("default", { month: "short" }).toUpperCase();
  const day = eventDate.getDate();

  const handleRegister = () => {
    toggleEventRegistration(event.id);
    if (!registered) {
      showToast(`Registered for "${event.title}"`, "success");
    } else {
      showToast(`Cancelled registration for "${event.title}"`, "info");
    }
  };

  return (
    <div
      className="cyber-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "1.25rem",
        position: "relative",
        borderColor: isHovered ? event.club.color : "#27272a",
        boxShadow: isHovered
          ? `0 0 20px ${event.club.color}15, 0 4px 30px rgba(0, 0, 0, 0.4)`
          : "none",
      }}
    >
      <div>
        {/* Header: Date + Club Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
          }}
        >
          {/* Club Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              background: "#27272a",
              border: "1px solid #3f3f46",
              borderRadius: "0.25rem",
              padding: "0.25rem 0.5rem",
              fontSize: "0.6875rem",
              color: "#fafafa",
            }}
          >
            <span>{event.club.icon}</span>
            <span style={{ fontWeight: 500 }}>{event.club.name}</span>
          </div>

          {/* Date Badge */}
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "#71717a",
                marginRight: "0.25rem",
              }}
            >
              {month}
            </span>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#fafafa",
              }}
            >
              {day}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
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
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: "3.375rem", // fixed height to keep cards aligned
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
            marginBottom: "1rem",
            fontFamily: "monospace",
          }}
        >
          <div>🕐 {event.time}</div>
          <div>📍 {event.location}</div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.25rem",
            marginBottom: "1.25rem",
          }}
        >
          {event.tags.map((tag) => (
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
        </div>
      </div>

      <div>
        {/* Capacity Progress Bar */}
        <div style={{ marginBottom: "1rem" }}>
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
                color: almostFull ? "#ef4444" : event.club.color,
                fontWeight: 600,
              }}
            >
              {almostFull ? `${spotsLeft} left` : `${fillPercent}%`}
            </span>
          </div>
          <div
            style={{
              height: "2px",
              background: "#27272a",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${fillPercent}%`,
                background: almostFull ? "#ef4444" : event.club.color,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: registered ? "1px solid #27272a" : "none",
            background: registered ? "transparent" : "#fafafa",
            color: registered ? "#a1a1aa" : "#09090b",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            if (registered) {
              e.currentTarget.style.borderColor = "#ef4444";
              e.currentTarget.style.color = "#ef4444";
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
            } else {
              e.currentTarget.style.background = "#e4e4e7";
            }
          }}
          onMouseLeave={(e) => {
            if (registered) {
              e.currentTarget.style.borderColor = "#27272a";
              e.currentTarget.style.color = "#a1a1aa";
              e.currentTarget.style.background = "transparent";
            } else {
              e.currentTarget.style.background = "#fafafa";
            }
          }}
        >
          {registered ? "Cancel Registration" : "Join Event"}
        </button>
      </div>
    </div>
  );
}
