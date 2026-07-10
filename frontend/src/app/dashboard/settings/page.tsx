"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const USERS = [
  { name: "Dr. Saranya Raman", role: "Administrator", email: "saranya@astramind.gov.in", dept: "System Admin", lastLogin: "Just now", status: "ACTIVE" },
  { name: "Cmdr. Rajesh Nair", role: "Govt Officer", email: "rajesh.nair@nic.gov.in", dept: "Disaster Mgmt", lastLogin: "2h ago", status: "ACTIVE" },
  { name: "Eng. Priya Sharma", role: "Engineer", email: "priya.s@nhai.gov.in", dept: "Infrastructure", lastLogin: "1d ago", status: "ACTIVE" },
];

const API_KEYS = [
  { name: "OpenWeather API", status: "Active", usage: "2,340 / 10,000 calls", expires: "30 Dec 2026" },
  { name: "IMD Data Feed", status: "Active", usage: "890 / 5,000 calls", expires: "15 Mar 2027" },
  { name: "Mapbox Tiles", status: "Active", usage: "18,900 / 50,000 calls", expires: "1 Jan 2027" },
  { name: "Gemini API", status: "Active", usage: "1,204 / 5,000 calls", expires: "31 Dec 2026" },
];

const MODELS = [
  { name: "Gemini 2.0 Flash", provider: "Google", status: "Primary", latency: "1.2s" },
  { name: "GPT-4o", provider: "OpenAI", status: "Fallback", latency: "1.8s" },
  { name: "Claude Sonnet", provider: "Anthropic", status: "Available", latency: "1.5s" },
  { name: "Llama 3.1 70B", provider: "Meta (Local)", status: "Available", latency: "0.9s" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sectionStyle: React.CSSProperties = {
    background: "var(--bg-panel)", backdropFilter: "blur(16px)",
    border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "20px"
  };

  return (
    <DashboardLayout title="Settings">
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.4rem", fontWeight: 900, background: "linear-gradient(90deg, var(--text-secondary), #64748b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ⚙️ System Configuration
          </h2>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>Manage users, API integrations, LLM routing, and preferences</p>
        </div>

        {/* Theme + General */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Appearance */}
          <div style={sectionStyle}>
            <h3 style={{ margin: "0 0 14px", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>🎨 Appearance</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              {(["dark", "light", "system"] as const).map(t => (
                <button key={t} onClick={() => setTheme(t)} style={{
                  flex: 1, padding: "14px", borderRadius: "12px", cursor: "pointer",
                  background: mounted && theme === t ? "rgba(14,165,233,0.12)" : "var(--bg-panel-hover)",
                  border: mounted && theme === t ? "1px solid rgba(14,165,233,0.35)" : "1px solid var(--border-subtle)",
                  color: mounted && theme === t ? "#38bdf8" : "#64748b",
                  textAlign: "center", fontSize: "0.78rem", fontWeight: 700, transition: "all 0.2s"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "6px" }}>{t === "dark" ? "🌙" : t === "light" ? "☀️" : "💻"}</div>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notification Channels */}
          <div style={sectionStyle}>
            <h3 style={{ margin: "0 0 14px", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>📲 Notification Channels</h3>
            {[
              { channel: "SMS Alerts", icon: "📱", enabled: true },
              { channel: "Email Digest", icon: "📧", enabled: true },
              { channel: "WhatsApp Broadcast", icon: "💬", enabled: false },
              { channel: "Push Notifications", icon: "🔔", enabled: true },
            ].map(n => (
              <div key={n.channel} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--bg-input)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px" }}>{n.icon}</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#cbd5e1" }}>{n.channel}</span>
                </div>
                <div style={{ width: 42, height: 22, borderRadius: "12px", background: n.enabled ? "#10b981" : "rgba(255,255,255,0.1)", cursor: "pointer", position: "relative", transition: "all 0.2s" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: n.enabled ? 22 : 2, transition: "all 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LLM Configuration */}
        <div style={sectionStyle}>
          <h3 style={{ margin: "0 0 14px", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>🧠 LLM Model Routing</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {MODELS.map(m => (
              <div key={m.name} style={{ padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: `1px solid ${m.status === "Primary" ? "rgba(14,165,233,0.3)" : "var(--border-subtle)"}`, textAlign: "center" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>{m.name}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginBottom: "8px" }}>{m.provider}</div>
                <span style={{
                  fontSize: "0.6rem", fontWeight: 800, padding: "2px 8px", borderRadius: "6px",
                  background: m.status === "Primary" ? "rgba(14,165,233,0.12)" : m.status === "Fallback" ? "rgba(245,158,11,0.1)" : "var(--bg-input)",
                  border: `1px solid ${m.status === "Primary" ? "rgba(14,165,233,0.3)" : m.status === "Fallback" ? "rgba(245,158,11,0.25)" : "var(--border-input)"}`,
                  color: m.status === "Primary" ? "#38bdf8" : m.status === "Fallback" ? "#fbbf24" : "#64748b",
                }}>{m.status}</span>
                <div style={{ marginTop: "8px", fontSize: "0.65rem", color: "#334155" }}>Avg: {m.latency}</div>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys + Users */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* API Keys */}
          <div style={sectionStyle}>
            <h3 style={{ margin: "0 0 14px", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>🔑 API Integrations</h3>
            {API_KEYS.map(key => (
              <div key={key.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--bg-input)" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 700, color: "#cbd5e1" }}>{key.name}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "0.65rem", color: "var(--text-muted)" }}>{key.usage} • Expires: {key.expires}</p>
                </div>
                <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#34d399", background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "6px", border: "1px solid rgba(16,185,129,0.25)" }}>
                  {key.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          {/* Users */}
          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>👥 User Management</h3>
              <button style={{ padding: "5px 12px", borderRadius: "8px", background: "linear-gradient(135deg, #0ea5e9, #10b981)", border: "none", color: "white", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer" }}>+ Add User</button>
            </div>
            {USERS.map(u => (
              <div key={u.email} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--bg-input)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>👤</div>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>{u.name}</p>
                    <p style={{ margin: "1px 0 0", fontSize: "0.62rem", color: "var(--text-muted)" }}>{u.role} • {u.dept} • {u.lastLogin}</p>
                  </div>
                </div>
                <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#34d399", background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "6px" }}>{u.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
