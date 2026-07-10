"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";

const DigitalTwinMap = dynamic(() => import("@/components/DigitalTwinMap"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: "100%", width: "100%", borderRadius: "16px",
      background: "linear-gradient(135deg, #050d1a, #0a1628)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#1e3a5f", fontSize: "0.875rem"
    }}>
      Initialising Digital Twin...
    </div>
  )
});

const MOCK_ASSETS = [
  { id: "1", type: "Bridge", name: "Pamban Bridge, Tamil Nadu", risk: 0.85, status: "CRITICAL", trend: "+12%" },
  { id: "2", type: "Dam", name: "Bhakra Nangal, Punjab", risk: 0.20, status: "HEALTHY", trend: "-2%" },
  { id: "3", type: "Hospital", name: "AIIMS Delhi", risk: 0.65, status: "WARNING", trend: "+5%" },
  { id: "4", type: "PowerPlant", name: "Kudankulam, TN", risk: 0.10, status: "HEALTHY", trend: "0%" },
];

const LIVE_ALERTS = [
  { time: "2m ago", icon: "🔴", msg: "Pamban Bridge: Vibration anomaly 3.2σ above baseline. Risk elevated to 85%.", severity: "CRITICAL" },
  { time: "18m ago", icon: "🌀", msg: "IMD Alert: Cyclone SITRANG intensifying — landfall predicted TN coast in 36hr.", severity: "WARNING" },
  { time: "1h ago", icon: "✅", msg: "AIIMS Delhi: Bed occupancy normalised at 67%. Forecast stable.", severity: "INFO" },
];

const STATS = [
  { label: "Active Sensors", value: "1,204", icon: "📡", color: "#38bdf8", trend: "+8" },
  { label: "Critical Alerts", value: "3", icon: "🚨", color: "#f87171", trend: "+2" },
  { label: "Agents Online", value: "8/8", icon: "🤖", color: "#34d399", trend: "" },
  { label: "Infra Monitored", value: "2,847", icon: "🏗️", color: "#a78bfa", trend: "+12" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 40, height: 40 }} />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px", transition: "all 0.2s ease"
      }}
      title="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#04080F",
      color: "#f0f6ff",
      fontFamily: "var(--font-geist-sans), 'Inter', sans-serif",
      position: "relative", overflow: "hidden"
    }}>
      {/* Grid background */}
      <div className="bg-grid" style={{ position: "fixed", inset: 0, opacity: 0.4, zIndex: 0 }} />

      {/* Ambient orbs */}
      <div style={{ position: "fixed", top: "-20%", left: "-15%", width: "55%", height: "55%", background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "45%", height: "45%", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />

      {/* ======================== SIDEBAR ======================== */}
      <div style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: "64px",
        background: "rgba(4,8,15,0.95)", backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "20px 0", gap: "8px", zIndex: 100
      }}>
        {/* Logo */}
        <div style={{
          width: 40, height: 40,
          background: "linear-gradient(135deg, #0ea5e9, #10b981)",
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", marginBottom: "16px",
          boxShadow: "0 4px 20px rgba(14,165,233,0.4)"
        }}>
          ⚡
        </div>
        {[
          { icon: "🏠", label: "Dashboard", active: true },
          { icon: "🗺️", label: "Digital Twin" },
          { icon: "🤖", label: "Agents" },
          { icon: "📊", label: "Analytics" },
          { icon: "🔔", label: "Alerts" },
          { icon: "🧠", label: "Knowledge" },
          { icon: "⚙️", label: "Settings" },
        ].map((item) => (
          <div
            key={item.label}
            title={item.label}
            style={{
              width: 44, height: 44, borderRadius: "12px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
              background: item.active ? "rgba(14,165,233,0.15)" : "transparent",
              border: item.active ? "1px solid rgba(14,165,233,0.3)" : "1px solid transparent",
              transition: "all 0.2s ease"
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* ======================== MAIN CONTENT ======================== */}
      <div style={{ marginLeft: "64px", minHeight: "100vh", position: "relative", zIndex: 10 }}>

        {/* ====== TOPBAR ====== */}
        <div style={{
          height: "64px", borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px",
          background: "rgba(4,8,15,0.8)", backdropFilter: "blur(20px)",
          position: "sticky", top: 0, zIndex: 50
        }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
              <span style={{ background: "linear-gradient(90deg, #38bdf8, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AstraMind
              </span>
              <span style={{ color: "#334155", fontWeight: 400, marginLeft: "8px", fontSize: "0.875rem" }}>/ National Dashboard</span>
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Live clock */}
            <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#334155", letterSpacing: "0.05em" }}>
              {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            {/* Status pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "4px 12px", borderRadius: "20px",
              background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)"
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#34d399", letterSpacing: "0.06em" }}>ALL SYSTEMS NOMINAL</span>
            </div>
            <ThemeToggle />
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "2px solid rgba(99,102,241,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px"
            }}>
              👤
            </div>
          </div>
        </div>

        {/* ====== BODY ====== */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* STATS ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {STATS.map((stat) => (
              <div key={stat.label} className="glass animate-fade-up" style={{
                borderRadius: "16px", padding: "20px 22px",
                boxShadow: `0 0 30px ${stat.color}10`,
                borderColor: `${stat.color}15`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px 0" }}>{stat.label}</p>
                    <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f0f6ff", letterSpacing: "-0.03em", margin: 0 }}>{stat.value}</p>
                    {stat.trend && <p style={{ fontSize: "0.72rem", color: stat.label === "Critical Alerts" ? "#f87171" : "#34d399", marginTop: "4px", fontWeight: 600 }}>{stat.trend} from last hour</p>}
                  </div>
                  <div style={{
                    width: 44, height: 44, borderRadius: "12px", fontSize: "22px",
                    background: `${stat.color}15`, border: `1px solid ${stat.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MAP + ALERTS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px" }}>

            {/* MAP */}
            <div className="glass" style={{
              borderRadius: "20px", overflow: "hidden", height: "520px", position: "relative",
              boxShadow: "0 0 60px rgba(14,165,233,0.06)"
            }}>
              {/* Map header overlay */}
              <div style={{
                position: "absolute", top: "14px", left: "14px", zIndex: 400,
                display: "flex", gap: "10px", alignItems: "center"
              }}>
                <div className="glass" style={{ borderRadius: "10px", padding: "8px 14px", fontSize: "0.78rem", fontWeight: 700, color: "#f0f6ff", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                  🛰️ Real-time Asset Status
                </div>
                <div style={{ padding: "4px 10px", borderRadius: "8px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)", fontSize: "0.7rem", fontWeight: 700, color: "#34d399" }}>
                  LIVE
                </div>
              </div>
              {/* Legend */}
              <div style={{
                position: "absolute", bottom: "14px", left: "14px", zIndex: 400,
                display: "flex", gap: "10px"
              }}>
                {[["🔴", "Critical"], ["🟡", "Warning"], ["🟢", "Healthy"]].map(([dot, label]) => (
                  <div key={label} className="glass" style={{ padding: "4px 10px", borderRadius: "8px", fontSize: "0.7rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span>{dot}</span> {label}
                  </div>
                ))}
              </div>
              <DigitalTwinMap />
            </div>

            {/* RIGHT PANEL */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* LIVE ALERTS */}
              <div className="glass" style={{ borderRadius: "16px", padding: "18px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h3 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 800, color: "#f0f6ff", letterSpacing: "0.03em" }}>
                    🔔 Live Intelligence Feed
                  </h3>
                  <span style={{ fontSize: "0.65rem", color: "#10b981", fontWeight: 700, background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "6px", border: "1px solid rgba(16,185,129,0.2)" }}>STREAMING</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {LIVE_ALERTS.map((alert, i) => (
                    <div key={i} style={{
                      padding: "12px", borderRadius: "12px",
                      background: alert.severity === "CRITICAL" ? "rgba(239,68,68,0.06)" : alert.severity === "WARNING" ? "rgba(245,158,11,0.06)" : "rgba(16,185,129,0.04)",
                      border: `1px solid ${alert.severity === "CRITICAL" ? "rgba(239,68,68,0.15)" : alert.severity === "WARNING" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.1)"}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em" }}
                          className={alert.severity === "CRITICAL" ? "badge-critical" : alert.severity === "WARNING" ? "badge-warning" : "badge-healthy"}>
                          {alert.severity}
                        </span>
                        <span style={{ fontSize: "0.68rem", color: "#334155" }}>{alert.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5 }}>{alert.msg}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ASSET HEALTH */}
              <div className="glass" style={{ borderRadius: "16px", padding: "18px" }}>
                <h3 style={{ margin: "0 0 14px 0", fontSize: "0.85rem", fontWeight: 800, color: "#f0f6ff" }}>
                  🏗️ Asset Health Index
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {MOCK_ASSETS.map(asset => (
                    <div key={asset.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1" }}>{asset.name}</span>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: asset.risk > 0.7 ? "#f87171" : asset.risk > 0.5 ? "#fbbf24" : "#34d399" }}>{(asset.risk * 100).toFixed(0)}%</span>
                        </div>
                        <div style={{ height: "5px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                          <div style={{
                            height: "100%", borderRadius: "10px",
                            width: `${asset.risk * 100}%`,
                            background: asset.risk > 0.7 ? "linear-gradient(90deg,#ef4444,#f97316)" : asset.risk > 0.5 ? "linear-gradient(90deg,#f59e0b,#eab308)" : "linear-gradient(90deg,#10b981,#34d399)",
                            transition: "width 1s ease"
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* AGENT STATUS BAR */}
          <div className="glass" style={{ borderRadius: "16px", padding: "16px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: "8px" }}>
                🤖 Agent Status
              </span>
              {["Infrastructure", "Weather", "Vision AI", "Risk Predictor", "News Intel", "Knowledge Graph", "Decision Support", "Chief AI"].map((agent) => (
                <div key={agent} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "4px 10px", borderRadius: "8px",
                  background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)"
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#6ee7b7" }}>{agent}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
