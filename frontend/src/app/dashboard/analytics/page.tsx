"use client";

import DashboardLayout from "@/components/DashboardLayout";

const FORECAST = [
  { hour: "10:00", risk: 45 }, { hour: "11:00", risk: 52 }, { hour: "12:00", risk: 58 },
  { hour: "13:00", risk: 65 }, { hour: "14:00", risk: 72 }, { hour: "15:00", risk: 78 },
  { hour: "16:00", risk: 85 }, { hour: "17:00", risk: 80 }, { hour: "18:00", risk: 74 },
  { hour: "19:00", risk: 66 }, { hour: "20:00", risk: 60 }, { hour: "21:00", risk: 55 },
];

const STATE_RISK = [
  { state: "Tamil Nadu", risk: 82, assets: 340, critical: 3 },
  { state: "Uttarakhand", risk: 68, assets: 180, critical: 1 },
  { state: "Assam", risk: 61, assets: 220, critical: 2 },
  { state: "Maharashtra", risk: 44, assets: 510, critical: 0 },
  { state: "Kerala", risk: 39, assets: 290, critical: 0 },
  { state: "Punjab", risk: 22, assets: 175, critical: 0 },
];

const maxRisk = Math.max(...FORECAST.map(f => f.risk));

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics">
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.4rem", fontWeight: 900, background: "linear-gradient(90deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            📊 Predictive Analytics
          </h2>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>AI-powered forecasting across infrastructure, weather, and risk signals</p>
        </div>

        {/* Top KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {[
            { label: "Avg National Risk", value: "42%", icon: "📈", color: "#f59e0b", delta: "+7% from yesterday" },
            { label: "Flood Probability", value: "76%", icon: "🌊", color: "#38bdf8", delta: "TN Coastal Zone" },
            { label: "Power Outage Risk", value: "23%", icon: "⚡", color: "#a78bfa", delta: "Next 24 hours" },
            { label: "Model Accuracy", value: "94.2%", icon: "🎯", color: "#34d399", delta: "LSTM v3.2" },
          ].map(k => (
            <div key={k.label} style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: `1px solid ${k.color}18`, borderRadius: "16px", padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{k.label}</span>
                <span style={{ fontSize: "20px" }}>{k.icon}</span>
              </div>
              <p style={{ margin: "0 0 4px", fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)" }}>{k.value}</p>
              <p style={{ margin: 0, fontSize: "0.68rem", color: k.color }}>{k.delta}</p>
            </div>
          ))}
        </div>

        {/* Chart + State Risk */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "16px" }}>
          {/* Risk Forecast Bar Chart */}
          <div style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ margin: "0 0 3px", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>Infrastructure Risk Forecast</h3>
                <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--text-muted)" }}>Pamban Bridge — Next 12 Hours</p>
              </div>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#f87171", background: "rgba(239,68,68,0.1)", padding: "3px 10px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.2)" }}>LSTM Model</span>
            </div>
            {/* Chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "160px", padding: "0 4px" }}>
              {FORECAST.map((f, i) => {
                const pct = (f.risk / maxRisk) * 100;
                const color = f.risk > 75 ? "#ef4444" : f.risk > 55 ? "#f59e0b" : "#10b981";
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "0.6rem", color: f.risk > 75 ? "#f87171" : "#64748b", fontWeight: 700 }}>{f.risk}%</span>
                    <div style={{ width: "100%", height: `${pct}%`, minHeight: "8px", borderRadius: "4px 4px 0 0", background: `linear-gradient(180deg, ${color}, ${color}88)`, boxShadow: f.risk > 75 ? `0 0 12px ${color}60` : "none", transition: "all 0.3s ease" }} />
                    <span style={{ fontSize: "0.55rem", color: "#334155", whiteSpace: "nowrap" }}>{f.hour}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "16px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--divider)" }}>
              {[["🔴 Critical (>75%)", "#f87171"], ["🟡 Warning (55–75%)", "#fbbf24"], ["🟢 Safe (<55%)", "#34d399"]].map(([l, c]) => (
                <div key={l as string} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "2px", background: c as string }} />
                  <span style={{ fontSize: "0.65rem", color: "#64748b" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* State Risk Ranking */}
          <div style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "20px" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>🇮🇳 State Risk Ranking</h3>
            {STATE_RISK.map((s, i) => (
              <div key={s.state} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)", width: "12px", textAlign: "right" }}>{i + 1}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.state}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {s.critical > 0 && <span style={{ fontSize: "0.6rem", color: "#f87171", fontWeight: 700 }}>⚠ {s.critical}</span>}
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: s.risk > 65 ? "#f87171" : s.risk > 40 ? "#fbbf24" : "#34d399" }}>{s.risk}%</span>
                  </div>
                </div>
                <div style={{ height: "5px", borderRadius: "5px", background: "var(--divider)" }}>
                  <div style={{ height: "100%", borderRadius: "5px", width: `${s.risk}%`, background: s.risk > 65 ? "linear-gradient(90deg,#ef4444,#f97316)" : s.risk > 40 ? "linear-gradient(90deg,#f59e0b,#eab308)" : "linear-gradient(90deg,#10b981,#34d399)", transition: "width 0.8s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Performance */}
        <div style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "20px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>🧪 Forecasting Model Performance</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
            {[
              { model: "LSTM", accuracy: 94.2, type: "Bridge Failure", color: "#38bdf8" },
              { model: "Prophet", accuracy: 91.7, type: "Traffic Flow", color: "#a78bfa" },
              { model: "XGBoost", accuracy: 89.3, type: "Power Outage", color: "#f59e0b" },
              { model: "Informer", accuracy: 96.1, type: "Flood Level", color: "#34d399" },
              { model: "PatchTST", accuracy: 93.8, type: "Hospital Load", color: "#fb923c" },
            ].map(m => (
              <div key={m.model} style={{ textAlign: "center", padding: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--divider)", borderRadius: "12px" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: m.color, marginBottom: "4px" }}>{m.accuracy}%</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>{m.model}</div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{m.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
