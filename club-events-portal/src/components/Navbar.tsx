import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOrganizer = user?.role === "organizer" || user?.email.endsWith("@vit.ac.in");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    textDecoration: "none",
    color: isActive ? "#fafafa" : "#a1a1aa",
    fontWeight: 600,
    fontSize: "0.8125rem",
    padding: "0.375rem 0.75rem",
    borderRadius: "0.25rem",
    background: isActive ? "#27272a" : "transparent",
    transition: "all 0.15s ease",
    border: isActive ? "1px solid #3f3f46" : "1px solid transparent",
  });

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(9, 9, 11, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #27272a",
        padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "3.75rem",
        }}
      >
        {/* Logo */}
        <NavLink
          to="/events"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "1.25rem", color: isOrganizer ? "#10b981" : "#3b82f6" }}>✦</span>
          <span
            style={{
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.01em",
            }}
          >
            campus.clubhub
          </span>
          <span
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              padding: "0.15rem 0.375rem",
              borderRadius: "0.25rem",
              background: isOrganizer ? "rgba(16,185,129,0.15)" : "rgba(59,130,246,0.15)",
              color: isOrganizer ? "#10b981" : "#3b82f6",
              border: isOrganizer
                ? "1px solid rgba(16,185,129,0.3)"
                : "1px solid rgba(59,130,246,0.3)",
            }}
          >
            {isOrganizer ? "ORGANIZER" : "VIT STUDENT"}
          </span>
        </NavLink>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
          }}
          className="nav-links-desktop"
        >
          <NavLink to="/events" style={({ isActive }) => linkStyle(isActive)}>
            Events
          </NavLink>
          <NavLink to="/profile" style={({ isActive }) => linkStyle(isActive)}>
            Passes & Profile
          </NavLink>
          {isOrganizer && (
            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                ...linkStyle(isActive),
                color: isActive ? "#10b981" : "#6ee7b7",
                background: isActive ? "rgba(16, 185, 129, 0.15)" : "transparent",
                border: isActive ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid transparent",
              })}
            >
              🛡️ Organizer Console
            </NavLink>
          )}
        </div>

        {/* User Info & Logout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
          }}
        >
          <div className="user-email-desktop" style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fafafa" }}>
              {user?.name}
            </div>
            <div
              style={{
                color: "#71717a",
                fontSize: "0.6875rem",
                fontFamily: "monospace",
              }}
            >
              {user?.email}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#fafafa",
              fontSize: "1.25rem",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

          <button
            onClick={handleLogout}
            className="logout-btn-desktop"
            style={{
              background: "transparent",
              border: "1px solid #27272a",
              color: "#a1a1aa",
              padding: "0.375rem 0.75rem",
              borderRadius: "0.25rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "inherit",
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
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            padding: "1rem 0",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            borderTop: "1px solid #27272a",
          }}
        >
          <NavLink
            to="/events"
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              ...linkStyle(isActive),
              display: "block",
            })}
          >
            Events
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              ...linkStyle(isActive),
              display: "block",
            })}
          >
            Passes & Profile
          </NavLink>
          {isOrganizer && (
            <NavLink
              to="/admin"
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                ...linkStyle(isActive),
                display: "block",
                color: "#10b981",
              })}
            >
              🛡️ Organizer Console
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "1px solid #27272a",
              color: "#a1a1aa",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.25rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "inherit",
              marginTop: "0.5rem",
            }}
          >
            Sign Out
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .user-email-desktop { display: none !important; }
          .logout-btn-desktop { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
