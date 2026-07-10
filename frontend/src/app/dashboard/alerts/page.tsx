"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

const ALL_ALERTS = [
  { id: "A-001", time: "2 min ago", source: "Infrastructure Agent", msg: "Pamban Bridge: Vibration anomaly 3.2σ above baseline. Structural integrity at 15%.", severity: "CRITICAL", region: "Tamil Nadu", acknowledged: false },
  { id: "A-002", time: "18 min ago", source: "Weather Agent", msg: "Cyclone SITRANG intensifying to CAT-3. Predicted landfall: Rameswaram coast in 36hr.", severity: "CRITICAL", region: "Tamil Nadu", acknowledged: false },
  { id: "A-003", time: "45 min ago", source: "Risk Predictor", msg: "Tehri Dam: Water level rising 0.8m/hr. Spillway capacity at 72%. Overflow risk in 18hr.", severity: "WARNING", region: "Uttarakhand", acknowledged: false },
  { id: "A-004", time: "1h ago", source: "Vision AI", msg: "Satellite scan: Road subsidence detected on NH-44 near Hyderabad. 3 frames flagged.", severity: "WARNING", region: "Telangana", acknowledged: true },
  { id: "A-005", time: "1.5h ago", source: "News Intelligence", msg: "MoHA Advisory: Pre-monsoon preparedness directive issued for all coastal districts.", severity: "INFO", region: "National", acknowledged: true },
  { id: "A-006", time: "2h ago", source: "Infrastructure Agent", msg: "AIIMS Delhi: ICU occupancy at 89%. Predicted to reach 95% within 6hr.", severity: "WARNING", region: "Delhi", acknowledged: false },
  { id: "A-007", time: "3h ago", source: "Decision Support", msg: "Evacuation plan generated: Rameswaram → Madurai via NH-49. Est. 4hr transit.", severity: "INFO", region: "Tamil Nadu", acknowledged: true },
  { id: "A-008", time: "4h ago", source: "Knowledge Graph", msg: "Dependency alert: Pamban Bridge closure would isolate 3 hospitals, 2 schools.", severity: "WARNING", region: "Tamil Nadu", acknowledged: true },
];

const sevColor: Record<string, string> = { CRITICAL: "#f87171", WARNING: "#fbbf24", INFO: "#38bdf8" };
const sevBg: Record<string, string> = { CRITICAL: "rgba(239,68,68,0.08)", WARNING: "rgba(245,158,11,0.06)", INFO: "rgba(56,189,248,0.05)" };
const sevBorder: Record<string, string> = { CRITICAL: "rgba(239,68,68,0.2)", WARNING: "rgba(245,158,11,0.18)", INFO: "rgba(56,189,248,0.15)" };

export default function AlertsPage() {
  const [filter, setFilter] = useState("ALL");
  const filtered = filter === "ALL" ? ALL_ALERTS : ALL_ALERTS.filter(a => a.severity === filter);

  return (
    <DashboardLayout title="Alerts & Notifications">
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: "1.4rem", fontWeight: 900, background: "linear-gradient(90deg, #f87171, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              🔔 Alert Command Center
            </h2>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>{ALL_ALERTS.filter(a => !a.acknowledged).length} unacknowledged alerts • {ALL_ALERTS.filter(a => a.severity === "CRITICAL").length} critical</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["ALL", "CRITICAL", "WARNING", "INFO"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: "20px", border: `1px solid ${filter === f ? (sevColor[f] || "#38bdf8") + "50" : "var(--border-input)"}`, background: filter === f ? (sevBg[f] || "rgba(56,189,248,0.08)") : "transparent", color: filter === f ? (sevColor[f] || "#38bdf8") : "var(--text-muted)", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                {f === "ALL" ? `ALL (${ALL_ALERTS.length})` : `${f} (${ALL_ALERTS.filter(a => a.severity === f).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {[
            { label: "Critical", value: ALL_ALERTS.filter(a => a.severity === "CRITICAL").length, icon: "🔴", color: "#f87171" },
            { label: "Warnings", value: ALL_ALERTS.filter(a => a.severity === "WARNING").length, icon: "🟡", color: "#fbbf24" },
            { label: "Informational", value: ALL_ALERTS.filter(a => a.severity === "INFO").length, icon: "🔵", color: "#38bdf8" },
            { label: "Unacknowledged", value: ALL_ALERTS.filter(a => !a.acknowledged).length, icon: "⏳", color: "#a78bfa" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: `1px solid ${s.color}18`, borderRadius: "14px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)" }}>{s.value}</p>
              </div>
              <span style={{ fontSize: "24px" }}>{s.icon}</span>
            </div>
          ))}
        </div>

        {/* Alert List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(alert => (
            <div key={alert.id} style={{
              background: sevBg[alert.severity], border: `1px solid ${sevBorder[alert.severity]}`,
              borderRadius: "14px", padding: "16px 20px",
              display: "flex", gap: "16px", alignItems: "flex-start",
              opacity: alert.acknowledged ? 0.6 : 1, transition: "all 0.2s"
            }}>
              {/* Severity indicator */}
              <div style={{ width: 4, minHeight: "50px", borderRadius: "4px", background: sevColor[alert.severity], flexShrink: 0, marginTop: "2px" }} />

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 800, padding: "2px 8px", borderRadius: "8px", background: `${sevColor[alert.severity]}18`, border: `1px solid ${sevColor[alert.severity]}30`, color: sevColor[alert.severity] }}>{alert.severity}</span>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-secondary)" }}>{alert.source}</span>
                    <span style={{ fontSize: "0.65rem", color: "#334155" }}>• {alert.region}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "0.65rem", color: "#334155" }}>{alert.time}</span>
                    {alert.acknowledged ? (
                      <span style={{ fontSize: "0.6rem", color: "#34d399", fontWeight: 700, background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "6px" }}>✓ ACK</span>
                    ) : (
                      <button style={{ fontSize: "0.6rem", color: "var(--text-primary)", fontWeight: 700, background: "var(--border-subtle)", padding: "3px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Acknowledge</button>
                    )}
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.6 }}>{alert.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
