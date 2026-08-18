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

  const trimmedEmail = email.trim().toLowerCase();
  const isVitStudent = trimmedEmail.endsWith("@vitstudent.ac.in");
  const isVitOrganizer = trimmedEmail.endsWith("@vit.ac.in") && !isVitStudent;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trimmedEmail) {
      showToast("Please enter your VIT email address", "error");
      return;
    }

    if (!isVitStudent && !isVitOrganizer) {
      showToast(
        "Invalid domain! Please use @vitstudent.ac.in (Student) or @vit.ac.in (Organizer)",
        "error"
      );
      return;
    }

    const success = login(trimmedEmail);
    if (success) {
      if (isVitOrganizer) {
        showToast("Signed in as VIT Club Organizer / Faculty 🛡️", "success");
        navigate("/admin");
      } else {
        showToast("Signed in as VIT Student 🎓", "success");
        navigate("/events");
      }
    } else {
      showToast("Failed to authenticate with given VIT email", "error");
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
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
          maxWidth: "420px",
          padding: "2.25rem",
          borderRadius: "0.5rem",
          background: "#121214",
          border: "1px solid #27272a",
        }}
      >
        {/* Brand Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "1.5rem",
              boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)",
            }}
          >
            ✦
          </div>
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.01em",
              marginBottom: "0.375rem",
            }}
          >
            Campus ClubHub Login
          </h1>
          <p style={{ fontSize: "0.75rem", color: "#a1a1aa", lineHeight: 1.5, margin: 0 }}>
            Enter your official VIT institutional email address to access events or event creation.
          </p>
        </div>

        {/* Domain Helper Legend */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              padding: "0.625rem",
              background: "#18181b",
              border: isVitStudent ? "1px solid #3b82f6" : "1px solid #27272a",
              borderRadius: "0.375rem",
              textAlign: "center",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#3b82f6" }}>
              🎓 Student Portal
            </div>
            <div
              style={{
                fontSize: "0.625rem",
                color: "#71717a",
                fontFamily: "monospace",
                marginTop: "0.125rem",
              }}
            >
              @vitstudent.ac.in
            </div>
          </div>

          <div
            style={{
              padding: "0.625rem",
              background: "#18181b",
              border: isVitOrganizer ? "1px solid #10b981" : "1px solid #27272a",
              borderRadius: "0.375rem",
              textAlign: "center",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#10b981" }}>
              🛡️ Organizer Console
            </div>
            <div
              style={{
                fontSize: "0.625rem",
                color: "#71717a",
                fontFamily: "monospace",
                marginTop: "0.125rem",
              }}
            >
              @vit.ac.in
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.375rem",
              }}
            >
              <label
                htmlFor="email-input"
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "#a1a1aa",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                VIT Email Address
              </label>

              {/* Dynamic status pill */}
              {isVitStudent && (
                <span
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    color: "#3b82f6",
                    background: "rgba(59,130,246,0.15)",
                    padding: "0.1rem 0.35rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  ● Student Account
                </span>
              )}
              {isVitOrganizer && (
                <span
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    color: "#10b981",
                    background: "rgba(16,185,129,0.15)",
                    padding: "0.1rem 0.35rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  ● Organizer Access
                </span>
              )}
            </div>

            <input
              id="email-input"
              type="email"
              placeholder="e.g. sasi.kumar2023@vitstudent.ac.in"
              value={email}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.55rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid",
                borderColor: isVitOrganizer
                  ? "#10b981"
                  : isVitStudent
                  ? "#3b82f6"
                  : isFocused
                  ? "#52525b"
                  : "#27272a",
                fontSize: "0.8125rem",
                fontFamily: "inherit",
                background: "#09090b",
                color: "#fafafa",
                outline: "none",
                transition: "all 0.15s ease",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.55rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              background: isVitOrganizer ? "#10b981" : isVitStudent ? "#3b82f6" : "#fafafa",
              color: isVitOrganizer || isVitStudent ? "#ffffff" : "#09090b",
              fontSize: "0.8125rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
              boxShadow: isVitOrganizer
                ? "0 0 20px rgba(16,185,129,0.25)"
                : isVitStudent
                ? "0 0 20px rgba(59,130,246,0.25)"
                : "none",
            }}
          >
            {isVitOrganizer
              ? "Sign In to Organizer Console 🛡️"
              : isVitStudent
              ? "Sign In to Student Events 🎓"
              : "Continue with VIT Email"}
          </button>
        </form>

        {/* Quick-test Presets */}
        <div
          style={{
            borderTop: "1px solid #27272a",
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
          }}
        >
          <div
            style={{
              fontSize: "0.6875rem",
              color: "#71717a",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Quick test with prefilled VIT accounts:
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() => handleQuickFill("sasi.kumar2023@vitstudent.ac.in")}
              style={{
                flex: 1,
                padding: "0.4rem 0.5rem",
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "0.25rem",
                color: "#93c5fd",
                fontSize: "0.6875rem",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              🎓 Student Mail
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("club.lead@vit.ac.in")}
              style={{
                flex: 1,
                padding: "0.4rem 0.5rem",
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "0.25rem",
                color: "#6ee7b7",
                fontSize: "0.6875rem",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              🛡️ Organizer Mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
