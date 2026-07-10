"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
      } else {
        const err = await res.json();
        alert(err.detail || "Login failed");
      }
    } catch (err) {
      alert("Network error connecting to API");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#04080F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* Animated orbs */}
      <div style={{
        position: "absolute", top: "-20%", left: "-15%",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", borderRadius: "50%"
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", right: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", borderRadius: "50%"
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "430px",
        margin: "20px",
      }}>
        {/* Top glow line */}
        <div style={{
          height: "1px", marginBottom: "-1px",
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.7), rgba(16,185,129,0.5), transparent)",
          borderRadius: "20px 20px 0 0"
        }} />

        {/* Glass panel */}
        <div style={{
          background: "rgba(8, 14, 26, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderTop: "none",
          borderRadius: "0 0 20px 20px",
          padding: "44px 40px 40px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)"
        }}>
          {/* Logo section */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{
              width: 68, height: 68,
              background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
              borderRadius: "20px",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: "30px",
              boxShadow: "0 8px 32px rgba(14,165,233,0.5), 0 0 0 1px rgba(14,165,233,0.2)",
              marginBottom: "20px",
              animation: "floatIcon 4s ease-in-out infinite"
            }}>⚡</div>
            <h1 style={{
              fontSize: "2.1rem", fontWeight: 900, margin: "0 0 6px",
              background: "linear-gradient(135deg, #38bdf8 0%, #34d399 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "-0.04em"
            }}>
              AstraMind
            </h1>
            <p style={{ color: "#475569", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 12px" }}>
              AI Intelligence Gateway
            </p>
            <span style={{
              display: "inline-block",
              padding: "3px 14px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "20px",
              fontSize: "0.65rem", fontWeight: 800,
              color: "#34d399", letterSpacing: "0.08em"
            }}>
              🔐 SECURE GOVERNMENT PORTAL
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Username */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                display: "block", fontSize: "0.7rem", fontWeight: 700,
                color: "#64748b", marginBottom: "8px",
                letterSpacing: "0.1em", textTransform: "uppercase"
              }}>
                Username or Email
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", opacity: 0.4 }}>
                  👤
                </span>
                <input
                  type="text" required value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="admin@astramind.gov.in"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    padding: "13px 16px 13px 42px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px", color: "#f0f6ff", fontSize: "0.9rem",
                    outline: "none", transition: "all 0.2s ease",
                    fontFamily: "inherit"
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(14,165,233,0.5)";
                    e.target.style.background = "rgba(14,165,233,0.06)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.12)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = "rgba(255,255,255,0.08)";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Password</label>
                <a href="#" style={{ fontSize: "0.72rem", color: "#38bdf8", textDecoration: "none" }}>Forgot?</a>
              </div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", opacity: 0.4 }}>🔒</span>
                <input
                  type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    padding: "13px 16px 13px 42px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px", color: "#f0f6ff", fontSize: "0.9rem",
                    outline: "none", transition: "all 0.2s ease",
                    fontFamily: "inherit"
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(14,165,233,0.5)";
                    e.target.style.background = "rgba(14,165,233,0.06)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.12)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = "rgba(255,255,255,0.08)";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit" disabled={isLoading}
              style={{
                width: "100%", padding: "14px",
                background: isLoading ? "rgba(14,165,233,0.5)" : "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
                border: "none", borderRadius: "12px",
                color: "white", fontSize: "0.95rem", fontWeight: 800,
                cursor: isLoading ? "not-allowed" : "pointer",
                boxShadow: "0 8px 32px rgba(14,165,233,0.4)",
                transition: "all 0.25s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                fontFamily: "inherit", letterSpacing: "0.02em"
              }}
              onMouseEnter={e => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              {isLoading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>🛡️ Authenticate & Enter →</>
              )}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0 18px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
            <span style={{ color: "#1e293b", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em" }}>NEW OPERATOR</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
          </div>

          <Link href="/signup" style={{
            display: "block", textAlign: "center", padding: "13px",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px", color: "#64748b",
            textDecoration: "none", fontSize: "0.875rem", fontWeight: 600,
            transition: "all 0.2s ease",
            background: "rgba(255,255,255,0.02)"
          }}>
            Request Government Access →
          </Link>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.65rem", color: "#1e293b", letterSpacing: "0.05em" }}>
            🔒 Secured by AstraMind • MoHA Certified • IT Act 2000
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        input::placeholder { color: #334155; }
      `}</style>
    </div>
  );
}
