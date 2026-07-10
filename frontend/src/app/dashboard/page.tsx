"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";

const DigitalTwinMap = dynamic(() => import("@/components/DigitalTwinMap"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: "100%", width: "100%",
      background: "linear-gradient(135deg, #050d1a, #0a1628)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#1e3a5f", fontSize: "0.875rem", borderRadius: "16px"
    }}>
      Initialising Digital Twin Map...
    </div>
  )
});

const MOCK_ASSETS = [
  { id: "1", name: "Pamban Bridge, Tamil Nadu", type: "Bridge", risk: 0.85, status: "CRITICAL" },
  { id: "2", name: "Bhakra Nangal Dam, Punjab", type: "Dam", risk: 0.20, status: "HEALTHY" },
  { id: "3", name: "AIIMS Delhi", type: "Hospital", risk: 0.65, status: "WARNING" },
  { id: "4", name: "Kudankulam Power Plant", type: "PowerPlant", risk: 0.10, status: "HEALTHY" },
];

const LIVE_ALERTS = [
  { time: "2m ago", msg: "Pamban Bridge: Vibration 3.2σ above baseline. Risk: 85%.", severity: "CRITICAL" },
  { time: "18m ago", msg: "IMD: Cyclone SITRANG intensifying — landfall TN coast in 36hr.", severity: "WARNING" },
  { time: "1h ago", msg: "AIIMS Delhi: Bed occupancy normalized at 67%.", severity: "INFO" },
];

const STATS = [
  { label: "Active Sensors", value: "1,204", icon: "📡", color: "#38bdf8" },
  { label: "Critical Alerts", value: "3", icon: "🚨", color: "#f87171" },
  { label: "Agents Online", value: "8/8", icon: "🤖", color: "#34d399" },
  { label: "Infra Monitored", value: "2,847", icon: "🏗️", color: "#a78bfa" },
];

const AGENTS = ["Infrastructure", "Weather", "Vision AI", "Risk Predictor", "News Intel", "Knowledge Graph", "Decision Support", "Chief AI"];

const NAV = [
  { icon: "🏠", label: "Dashboard", active: true },
  { icon: "🗺️", label: "Digital Twin" },
  { icon: "🤖", label: "Agents" },
  { icon: "📊", label: "Analytics" },
  { icon: "🔔", label: "Alerts" },
  { icon: "🧠", label: "Knowledge" },
  { icon: "⚙️", label: "Settings" },
];

function ThemeToggleBtn() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 36, height: 36 }} />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
      style={{
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.06)",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "16px", transition: "all 0.2s ease"
      }}
    >{theme === "dark" ? "☀️" : "🌙"}</button>
  );
}

export default function Dashboard() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#04080F", color: "#f0f6ff", fontFamily: "'Inter', -apple-system, sans-serif", display: "flex" }}>

      {/* ===== SIDEBAR ===== */}
      <div style={{
        width: "64px", flexShrink: 0, height: "100vh", position: "sticky", top: 0,
        background: "rgba(4,8,15,0.95)", backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "18px 0", gap: "6px", zIndex: 100
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: "12px",
          background: "linear-gradient(135deg, #0ea5e9, #10b981)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", marginBottom: "14px",
          boxShadow: "0 4px 20px rgba(14,165,233,0.4)"
        }}>⚡</div>

        {NAV.map(item => (
          <div key={item.label} title={item.label} style={{
            width: 44, height: 44, borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", cursor: "pointer",
            background: item.active ? "rgba(14,165,233,0.15)" : "transparent",
            border: item.active ? "1px solid rgba(14,165,233,0.3)" : "1px solid transparent",
            transition: "all 0.2s"
          }}>
            {item.icon}
          </div>
        ))}
      </div>

      {/* ===== MAIN ===== */}
      <div style={{ flex: 1, minHeight: "100vh", overflow: "auto", position: "relative" }}>

        {/* Grid & Orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ position: "fixed", top: "-20%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0, borderRadius: "50%" }} />
        <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "450px", height: "450px", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0, borderRadius: "50%" }} />

        {/* ===== TOPBAR ===== */}
        <div style={{
          height: "60px", position: "sticky", top: 0, zIndex: 50,
          background: "rgba(4,8,15,0.9)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1rem", fontWeight: 900, background: "linear-gradient(90deg, #38bdf8, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AstraMind</span>
            <span style={{ color: "#1e293b", fontSize: "0.85rem" }}>/</span>
            <span style={{ color: "#334155", fontSize: "0.85rem" }}>National Dashboard</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#1e3a5f", letterSpacing: "0.05em" }}>IST {time}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "blink 2s infinite" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#34d399", letterSpacing: "0.08em" }}>ALL SYSTEMS NOMINAL</span>
            </div>
            <ThemeToggleBtn />
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", border: "2px solid rgba(99,102,241,0.4)" }}>👤</div>
          </div>
        </div>

        {/* ===== BODY ===== */}
        <div style={{ padding: "22px", position: "relative", zIndex: 10 }}>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "18px" }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)",
                border: `1px solid ${s.color}18`,
                borderRadius: "16px", padding: "18px 20px",
                boxShadow: `0 0 30px ${s.color}08`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: "0 0 8px", fontSize: "0.65rem", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                    <p style={{ margin: 0, fontSize: "1.75rem", fontWeight: 900, color: "#f0f6ff", letterSpacing: "-0.04em" }}>{s.value}</p>
                  </div>
                  <div style={{ width: 42, height: 42, borderRadius: "12px", fontSize: "20px", background: `${s.color}12`, border: `1px solid ${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {s.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MAP + SIDE PANEL */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "16px", marginBottom: "16px" }}>

            {/* MAP */}
            <div style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", height: "500px", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, left: 14, zIndex: 400, display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ background: "rgba(4,8,15,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "7px 13px", fontSize: "0.75rem", fontWeight: 700, color: "#f0f6ff" }}>
                  🛰️ Real-time Asset Status
                </div>
                <div style={{ padding: "4px 10px", borderRadius: "8px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", fontSize: "0.65rem", fontWeight: 800, color: "#f87171", letterSpacing: "0.08em", animation: "blink 1.5s infinite" }}>
                  ● LIVE
                </div>
              </div>
              <DigitalTwinMap />
            </div>

            {/* SIDE PANEL */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Alerts */}
              <div style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <h3 style={{ margin: 0, fontSize: "0.8rem", fontWeight: 800, color: "#f0f6ff" }}>🔔 Live Intelligence Feed</h3>
                  <span style={{ fontSize: "0.6rem", color: "#34d399", fontWeight: 800, background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "6px", border: "1px solid rgba(16,185,129,0.2)" }}>STREAMING</span>
                </div>
                {LIVE_ALERTS.map((a, i) => (
                  <div key={i} style={{
                    padding: "11px 12px", borderRadius: "10px", marginBottom: i < LIVE_ALERTS.length - 1 ? "10px" : 0,
                    background: a.severity === "CRITICAL" ? "rgba(239,68,68,0.07)" : a.severity === "WARNING" ? "rgba(245,158,11,0.07)" : "rgba(16,185,129,0.05)",
                    border: `1px solid ${a.severity === "CRITICAL" ? "rgba(239,68,68,0.18)" : a.severity === "WARNING" ? "rgba(245,158,11,0.18)" : "rgba(16,185,129,0.15)"}`
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.06em", padding: "1px 8px", borderRadius: "10px",
                        background: a.severity === "CRITICAL" ? "rgba(239,68,68,0.15)" : a.severity === "WARNING" ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)",
                        border: `1px solid ${a.severity === "CRITICAL" ? "rgba(239,68,68,0.3)" : a.severity === "WARNING" ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.25)"}`,
                        color: a.severity === "CRITICAL" ? "#f87171" : a.severity === "WARNING" ? "#fbbf24" : "#34d399"
                      }}>{a.severity}</span>
                      <span style={{ fontSize: "0.65rem", color: "#334155" }}>{a.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.5 }}>{a.msg}</p>
                  </div>
                ))}
              </div>

              {/* Health Index */}
              <div style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px" }}>
                <h3 style={{ margin: "0 0 14px", fontSize: "0.8rem", fontWeight: 800, color: "#f0f6ff" }}>🏗️ Asset Health Index</h3>
                {MOCK_ASSETS.map(a => (
                  <div key={a.id} style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: 600 }}>{a.name}</span>
                      <span style={{ fontSize: "0.7rem", fontWeight: 800, color: a.risk > 0.7 ? "#f87171" : a.risk > 0.5 ? "#fbbf24" : "#34d399" }}>{(a.risk * 100).toFixed(0)}%</span>
                    </div>
                    <div style={{ height: "5px", borderRadius: "10px", background: "rgba(255,255,255,0.05)" }}>
                      <div style={{ height: "100%", borderRadius: "10px", width: `${a.risk * 100}%`, background: a.risk > 0.7 ? "linear-gradient(90deg,#ef4444,#f97316)" : a.risk > 0.5 ? "linear-gradient(90deg,#f59e0b,#eab308)" : "linear-gradient(90deg,#10b981,#34d399)", transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AGENT STATUS */}
          <div style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em" }}>🤖 Agent Status</span>
            {AGENTS.map(name => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "8px", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "#6ee7b7" }}>{name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}
