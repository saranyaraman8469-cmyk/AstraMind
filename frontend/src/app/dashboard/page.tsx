"use client";

import DashboardLayout from "@/components/DashboardLayout";
import dynamic from "next/dynamic";

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
  { id: "1", name: "Pamban Bridge, Tamil Nadu", risk: 0.85, status: "CRITICAL" },
  { id: "2", name: "Bhakra Nangal Dam, Punjab", risk: 0.20, status: "HEALTHY" },
  { id: "3", name: "AIIMS Delhi", risk: 0.65, status: "WARNING" },
  { id: "4", name: "Kudankulam Power Plant", risk: 0.10, status: "HEALTHY" },
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

const sevColor: Record<string, string> = { CRITICAL: "#f87171", WARNING: "#fbbf24", INFO: "#38bdf8" };
const sevBg: Record<string, string> = { CRITICAL: "rgba(239,68,68,0.07)", WARNING: "rgba(245,158,11,0.07)", INFO: "rgba(56,189,248,0.05)" };

export default function DashboardHome() {
  return (
    <DashboardLayout title="National Dashboard">
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)",
              border: `1px solid ${s.color}18`, borderRadius: "16px", padding: "18px 20px",
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "16px" }}>
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
                  background: sevBg[a.severity],
                  border: `1px solid ${a.severity === "CRITICAL" ? "rgba(239,68,68,0.18)" : a.severity === "WARNING" ? "rgba(245,158,11,0.18)" : "rgba(56,189,248,0.15)"}`
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{
                      fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.06em", padding: "1px 8px", borderRadius: "10px",
                      background: `${sevColor[a.severity]}18`, border: `1px solid ${sevColor[a.severity]}30`,
                      color: sevColor[a.severity]
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

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </DashboardLayout>
  );
}
