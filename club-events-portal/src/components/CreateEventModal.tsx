import { useState } from "react";
import { clubs } from "../data/mockData";
import type { ClubEvent } from "../types";
import { useToast } from "../context/ToastContext";

interface CreateEventModalProps {
  onClose: () => void;
  onCreate: (event: Omit<ClubEvent, "id" | "registered" | "attendees">) => void;
}

export default function CreateEventModal({ onClose, onCreate }: CreateEventModalProps) {
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [selectedClubId, setSelectedClubId] = useState(clubs[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(100);
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("Workshop, Tech, Campus");
  const [perksInput, setPerksInput] = useState("Participation Certificate, Refreshments, Swags");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !date.trim() || !location.trim() || !description.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const club = clubs.find((c) => c.id === selectedClubId) || clubs[0];
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const perks = perksInput
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    onCreate({
      title,
      club,
      date,
      time,
      location,
      capacity: Number(capacity) || 50,
      description,
      tags: tags.length > 0 ? tags : ["General"],
      perks: perks.length > 0 ? perks : undefined,
      agenda: [
        { time: time, title: "Opening Remarks & Check-in" },
        { time: "01:00 PM", title: "Main Interactive Session" },
        { time: "03:30 PM", title: "Wrap-up & Certificate Distribution" },
      ],
      faqs: [
        { question: "What should attendees bring?", answer: "College ID card and a notebook or laptop if required." },
        { question: "Will certificates be provided?", answer: "Yes, all verified attendees will receive digital certificates." },
      ],
    });

    showToast(`Published event "${title}" successfully! 🚀`, "success");
    onClose();
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
          maxWidth: "580px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          background: "#121214",
          border: "1px solid #3f3f46",
          borderRadius: "0.75rem",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #27272a",
            background: "#18181b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fafafa", margin: 0 }}>
              Create New Campus Event
            </h2>
            <p style={{ fontSize: "0.75rem", color: "#71717a", margin: "0.25rem 0 0" }}>
              Publish an event for your club or student chapter
            </p>
          </div>
          <button
            onClick={onClose}
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

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "1.5rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Event Title */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI & ML Summit 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#fafafa",
                fontSize: "0.8125rem",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {/* Club & Capacity */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
                Organizing Club *
              </label>
              <select
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  background: "#09090b",
                  border: "1px solid #27272a",
                  color: "#fafafa",
                  fontSize: "0.8125rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              >
                {clubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
                Max Capacity *
              </label>
              <input
                type="number"
                min="5"
                max="1000"
                required
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  background: "#09090b",
                  border: "1px solid #27272a",
                  color: "#fafafa",
                  fontSize: "0.8125rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Date, Time, Venue */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: "0.75rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
                Date (YYYY-MM-DD) *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  background: "#09090b",
                  border: "1px solid #27272a",
                  color: "#fafafa",
                  fontSize: "0.8125rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
                Time *
              </label>
              <input
                type="text"
                placeholder="10:00 AM"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  background: "#09090b",
                  border: "1px solid #27272a",
                  color: "#fafafa",
                  fontSize: "0.8125rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
                Venue / Hall *
              </label>
              <input
                type="text"
                placeholder="e.g. Auditorium Hall 2"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  background: "#09090b",
                  border: "1px solid #27272a",
                  color: "#fafafa",
                  fontSize: "0.8125rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
              Event Description *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe the activities, speakers, who should attend, and what participants will learn..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#fafafa",
                fontSize: "0.8125rem",
                boxSizing: "border-box",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Tags & Perks */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="AI, Workshop, Hackathon, Swag"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#fafafa",
                fontSize: "0.8125rem",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#fafafa", marginBottom: "0.375rem" }}>
              Perks & Inclusions (comma separated)
            </label>
            <input
              type="text"
              placeholder="Certificate, Free Snacks, Goodie Bag"
              value={perksInput}
              onChange={(e) => setPerksInput(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#fafafa",
                fontSize: "0.8125rem",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {/* Submit Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              marginTop: "1rem",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.5rem 1rem",
                background: "transparent",
                border: "1px solid #27272a",
                borderRadius: "0.25rem",
                color: "#a1a1aa",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "0.5rem 1.25rem",
                background: "#fafafa",
                border: "none",
                borderRadius: "0.25rem",
                color: "#09090b",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Publish Event ✦
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
