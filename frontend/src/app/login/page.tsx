"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  if (!mounted) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#04080F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-geist-sans), 'Inter', sans-serif"
      }}
    >
      {/* Grid background */}
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

      {/* Ambient orbs */}
      <div style={{
        position: "absolute", top: "-15%", left: "-10%",
        width: "55%", height: "55%",
        background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", right: "-10%",
        width: "50%", height: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none"
      }} />

      {/* Main card */}
      <div
        className="animate-fade-up"
        style={{
          width: "100%", maxWidth: "440px",
          padding: "0 20px",
          position: "relative", zIndex: 10
        }}
      >
        {/* Glowing top border */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.6), transparent)",
          marginBottom: 0, borderRadius: "16px 16px 0 0"
        }} />

        <div
          className="glass"
          style={{
            borderRadius: "20px", padding: "44px 40px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(14,165,233,0.05), inset 0 1px 0 rgba(255,255,255,0.06)"
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{
              width: 64, height: 64,
              background: "linear-gradient(135deg, #0ea5e9, #10b981)",
              borderRadius: "18px",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: "20px",
              boxShadow: "0 8px 32px rgba(14,165,233,0.4)",
              fontSize: "28px"
            }}
              className="animate-float animate-pulse-glow"
            >
              ⚡
            </div>
            <h1 style={{
              fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #38bdf8 0%, #34d399 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: "6px"
            }}>
              AstraMind
            </h1>
            <p style={{ color: "#475569", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
              AI Intelligence Gateway
            </p>
            <div style={{
              display: "inline-block", marginTop: "12px",
              padding: "3px 12px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: "20px",
              fontSize: "0.7rem", fontWeight: 700,
              color: "#34d399", letterSpacing: "0.05em"
            }}>
              SECURE GOVERNMENT PORTAL
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Username / Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", marginBottom: "8px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Username or Email
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", opacity: 0.5 }}>👤</span>
                <input
                  type="text" required value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="input-premium"
                  placeholder="admin@astramind.gov.in"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Password
                </label>
                <a href="#" style={{ fontSize: "0.75rem", color: "#38bdf8", textDecoration: "none", opacity: 0.8 }}>Forgot?</a>
              </div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", opacity: 0.5 }}>🔒</span>
                <input
                  type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-premium"
                  placeholder="••••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-brand"
              style={{ width: "100%", marginTop: "8px" }}
            >
              <span>
                {isLoading ? (
                  <>
                    <svg style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    🛡️ Authenticate & Enter
                    <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <span style={{ color: "#334155", fontSize: "0.75rem", fontWeight: 600 }}>NEW OPERATOR?</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          <Link href="/signup" style={{
            display: "block", textAlign: "center", padding: "0.75rem",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", color: "#94a3b8",
            textDecoration: "none", fontSize: "0.875rem", fontWeight: 600,
            transition: "all 0.2s ease",
            background: "rgba(255,255,255,0.02)"
          }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.borderColor = "rgba(14,165,233,0.4)";
              (e.target as HTMLElement).style.color = "#38bdf8";
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.target as HTMLElement).style.color = "#94a3b8";
            }}
          >
            Request Government Access →
          </Link>

          {/* Footer */}
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.7rem", color: "#1e293b", letterSpacing: "0.04em" }}>
            🔒 Secured by AstraMind AI Security • MoHA Certified
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
