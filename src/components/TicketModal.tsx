import { useMemo } from "react";
import type { ClubEvent, User } from "../types";
import { generateQrMatrix } from "../utils/qrCode";
import { getGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";

interface TicketModalProps {
  event: ClubEvent;
  user: User;
  onClose: () => void;
}

export default function TicketModal({ event, user, onClose }: TicketModalProps) {
  const attendee = useMemo(() => {
    return (
      event.attendees?.find((a) => a.email === user.email) || {
        ticketId: `TCK-${event.club.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        registeredAt: new Date().toISOString().split("T")[0],
      }
    );
  }, [event, user]);

  const qrData = `CAMPUS-EVENT-TICKET:${event.id}:${attendee.ticketId}:${user.email}`;
  const qrMatrix = useMemo(() => generateQrMatrix(qrData, 21), [qrData]);

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
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
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        className="cyber-card page-enter"
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#121214",
          border: `1px solid ${event.club.color}50`,
          borderRadius: "0.75rem",
          overflow: "hidden",
          boxShadow: `0 0 40px ${event.club.color}25, 0 20px 40px rgba(0,0,0,0.8)`,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Holographic Header Bar */}
        <div
          style={{
            background: `linear-gradient(135deg, ${event.club.color}, #18181b)`,
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.5rem" }}>{event.club.icon}</span>
            <div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 600,
                }}
              >
                Official Event Pass
              </div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>
                {event.club.name}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "none",
              color: "#fff",
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
        </div>

        {/* Ticket Body */}
        <div style={{ padding: "1.5rem" }}>
          {/* Event Title */}
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#fafafa",
              marginBottom: "0.5rem",
              lineHeight: 1.3,
            }}
          >
            {event.title}
          </h2>

          {/* Ticket Meta Details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "0.5rem",
              padding: "0.875rem",
              marginBottom: "1.25rem",
              fontSize: "0.75rem",
            }}
          >
            <div>
              <div style={{ color: "#71717a", fontSize: "0.6875rem", textTransform: "uppercase" }}>
                Attendee
              </div>
              <div style={{ color: "#fafafa", fontWeight: 600 }}>{user.name}</div>
              <div style={{ color: "#a1a1aa", fontSize: "0.6875rem", fontFamily: "monospace" }}>
                {user.email}
              </div>
            </div>
            <div>
              <div style={{ color: "#71717a", fontSize: "0.6875rem", textTransform: "uppercase" }}>
                Ticket ID
              </div>
              <div
                style={{
                  color: event.club.color,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                }}
              >
                {attendee.ticketId}
              </div>
            </div>

            <div>
              <div style={{ color: "#71717a", fontSize: "0.6875rem", textTransform: "uppercase" }}>
                Date & Time
              </div>
              <div style={{ color: "#fafafa", fontWeight: 500 }}>{formattedDate}</div>
              <div style={{ color: "#a1a1aa", fontSize: "0.6875rem" }}>{event.time}</div>
            </div>

            <div>
              <div style={{ color: "#71717a", fontSize: "0.6875rem", textTransform: "uppercase" }}>
                Venue
              </div>
              <div style={{ color: "#fafafa", fontWeight: 500 }}>{event.location}</div>
              <div style={{ color: "#10b981", fontSize: "0.6875rem", fontWeight: 600 }}>
                ● Confirmed Entry
              </div>
            </div>
          </div>

          {/* Perforated Divider */}
          <div
            style={{
              position: "relative",
              borderTop: "2px dashed #3f3f46",
              margin: "1.5rem -1.5rem",
            }}
          >
            {/* Left notch */}
            <div
              style={{
                position: "absolute",
                left: "-12px",
                top: "-12px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#09090b",
              }}
            />
            {/* Right notch */}
            <div
              style={{
                position: "absolute",
                right: "-12px",
                top: "-12px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#09090b",
              }}
            />
          </div>

          {/* QR Code Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem 0",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              <svg width="150" height="150" viewBox={`0 0 ${qrMatrix.length} ${qrMatrix.length}`}>
                {qrMatrix.map((row, r) =>
                  row.map((cell, c) =>
                    cell ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#000" /> : null
                  )
                )}
              </svg>
            </div>
            <div
              style={{
                fontSize: "0.6875rem",
                color: "#71717a",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
              }}
            >
              SCAN AT DOOR FOR FAST-TRACK ENTRY
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "1.25rem",
            }}
          >
            <a
              href={getGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: "0.5rem",
                background: "#27272a",
                border: "1px solid #3f3f46",
                borderRadius: "0.25rem",
                color: "#fafafa",
                fontSize: "0.75rem",
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.375rem",
              }}
            >
              📅 Google Cal
            </a>
            <button
              onClick={() => downloadIcsFile(event)}
              style={{
                flex: 1,
                padding: "0.5rem",
                background: "#27272a",
                border: "1px solid #3f3f46",
                borderRadius: "0.25rem",
                color: "#fafafa",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              📥 Save .iCal
            </button>
            <button
              onClick={handlePrint}
              style={{
                padding: "0.5rem 0.875rem",
                background: event.club.color,
                border: "none",
                borderRadius: "0.25rem",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              🖨️ Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
