import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { showToast } = useToast();

  if (user) {
    navigate("/events", { replace: true });
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    login(email);
    showToast("Signed in successfully", "success");
    navigate("/events");
  };

  return (
    <div
      className="page-enter"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        backgroundColor: "#09090b",
      }}
    >
      <div
        className="cyber-card"
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "2rem",
          borderRadius: "0.25rem",
        }}
      >
        {/* Brand Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "1.75rem",
              color: "#fafafa",
              marginBottom: "0.5rem",
              fontWeight: 300,
            }}
          >
            ✦
          </div>
          <h1
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "#fafafa",
              letterSpacing: "-0.01em",
              marginBottom: "0.25rem",
            }}
          >
            Sign in to Campus ClubHub
          </h1>
          <p style={{ fontSize: "0.75rem", color: "#a1a1aa" }}>
            Enter your university or student email to access the portal.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              htmlFor="email-input"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "#71717a",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "block",
                marginBottom: "0.375rem",
              }}
            >
              Student / Faculty Email
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="name@student.university.edu"
              value={email}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.25rem",
                border: "1px solid",
                borderColor: isFocused ? "#3b82f6" : "#27272a",
                fontSize: "0.8125rem",
                fontFamily: "inherit",
                background: "#09090b",
                color: "#fafafa",
                outline: "none",
                transition: "all 0.15s ease",
                boxSizing: "border-box",
                boxShadow: isFocused ? "0 0 10px rgba(59, 130, 246, 0.15)" : "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              border: "none",
              background: "#fafafa",
              color: "#09090b",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e4e4e7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fafafa";
            }}
          >
            Continue
          </button>
        </form>

        <div
          style={{
            borderTop: "1px solid #27272a",
            marginTop: "1.5rem",
            paddingTop: "1rem",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "0.6875rem", color: "#71717a" }}>
            No password required. Secure login session.
          </span>
        </div>
      </div>
    </div>
  );
}
