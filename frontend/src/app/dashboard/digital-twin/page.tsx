"use client";

import DashboardLayout from "@/components/DashboardLayout";
import dynamic from "next/dynamic";

const DigitalTwinMap = dynamic(() => import("@/components/DigitalTwinMap"), {
  ssr: false,
  loading: () => <div style={{ height: "100%", background: "rgba(8,14,26,0.7)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e3a5f" }}>Loading Digital Twin...</div>
});

const INFRA = [
  { id: "B-001", name: "Pamban Bridge", type: "Bridge", state: "Tamil Nadu", health: 15, risk: 85, sensors: 24, status: "CRITICAL", lat: 9.27, lng: 79.20, lastInspection: "12 Jan 2025" },
  { id: "D-012", name: "Bhakra Nangal Dam", type: "Dam", state: "Punjab", health: 90, risk: 10, sensors: 48, status: "HEALTHY", lat: 31.41, lng: 76.43, lastInspection: "5 Mar 2025" },
  { id: "H-045", name: "AIIMS New Delhi", type: "Hospital", state: "Delhi", health: 68, risk: 32, sensors: 16, status: "GOOD", lat: 28.56, lng: 77.21, lastInspection: "20 May 2025" },
  { id: "P-007", name: "Kudankulam NPP", type: "Power Plant", state: "Tamil Nadu", health: 94, risk: 6, sensors: 120, status: "HEALTHY", lat: 8.16, lng: 77.71, lastInspection: "1 Jun 2025" },
  { id: "R-023", name: "Bandra-Worli Sealink", type: "Bridge", state: "Maharashtra", health: 82, risk: 18, sensors: 30, status: "GOOD", lat: 19.03, lng: 72.81, lastInspection: "14 Apr 2025" },
  { id: "D-034", name: "Tehri Dam", type: "Dam", state: "Uttarakhand", health: 55, risk: 45, sensors: 66, status: "WARNING", lat: 30.38, lng: 78.48, lastInspection: "3 Feb 2025" },
];

const statusColor: Record<string, string> = {
  CRITICAL: "#f87171", HEALTHY: "#34d399", GOOD: "#38bdf8", WARNING: "#fbbf24"
};
const statusBg: Record<string, string> = {
  CRITICAL: "rgba(239,68,68,0.12)", HEALTHY: "rgba(16,185,129,0.1)", GOOD: "rgba(56,189,248,0.1)", WARNING: "rgba(245,158,11,0.1)"
};

export default function DigitalTwinPage() {
  return (
    <DashboardLayout title="Digital Twin">
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: "1.4rem", fontWeight: 900, background: "linear-gradient(90deg, #38bdf8, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              🗺️ Live Digital Twin
            </h2>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#475569" }}>Real-time synchronised state of all critical infrastructure across India</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {["All", "Bridge", "Dam", "Hospital", "Power"].map(f => (
              <button key={f} style={{ padding: "5px 14px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)", background: f === "All" ? "rgba(14,165,233,0.15)" : "transparent", color: f === "All" ? "#38bdf8" : "#475569", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Map + Table */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "16px" }}>
          {/* Map */}
          <div style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", height: "460px", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 12, left: 12, zIndex: 400, background: "rgba(4,8,15,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "7px 13px", fontSize: "0.75rem", fontWeight: 700, color: "#f0f6ff" }}>
              🛰️ Live Satellite View — {INFRA.length} Assets
            </div>
            <DigitalTwinMap />
          </div>

          {/* Asset list */}
          <div style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "16px", overflowY: "auto", maxHeight: "460px" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: "0.82rem", fontWeight: 800, color: "#f0f6ff" }}>Asset Registry</h3>
            {INFRA.map(asset => (
              <div key={asset.id} style={{ padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "10px", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <p style={{ margin: "0 0 2px", fontSize: "0.8rem", fontWeight: 800, color: "#f0f6ff" }}>{asset.name}</p>
                    <p style={{ margin: 0, fontSize: "0.68rem", color: "#475569" }}>{asset.type} · {asset.state} · {asset.sensors} sensors</p>
                  </div>
                  <span style={{ fontSize: "0.6rem", fontWeight: 800, padding: "2px 8px", borderRadius: "8px", background: statusBg[asset.status], border: `1px solid ${statusColor[asset.status]}30`, color: statusColor[asset.status] }}>{asset.status}</span>
                </div>
                {/* Health bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.65rem", color: "#334155", width: "60px" }}>Health</span>
                  <div style={{ flex: 1, height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.05)" }}>
                    <div style={{ height: "100%", borderRadius: "4px", width: `${asset.health}%`, background: asset.health < 30 ? "linear-gradient(90deg,#ef4444,#f97316)" : asset.health < 65 ? "linear-gradient(90deg,#f59e0b,#eab308)" : "linear-gradient(90deg,#10b981,#34d399)" }} />
                  </div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: asset.health < 30 ? "#f87171" : "#34d399", width: "28px", textAlign: "right" }}>{asset.health}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {[["Total Assets", "2,847", "🏗️", "#38bdf8"], ["Critical", "3", "🔴", "#f87171"], ["Healthy", "2,791", "🟢", "#34d399"], ["Under Repair", "53", "🔧", "#fbbf24"]].map(([l, v, i, c]) => (
            <div key={l as string} style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: `1px solid ${c as string}15`, borderRadius: "14px", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "0.65rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</p>
                <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 900, color: "#f0f6ff" }}>{v}</p>
              </div>
              <span style={{ fontSize: "24px" }}>{i}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
