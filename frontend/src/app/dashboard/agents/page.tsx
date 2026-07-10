"use client";

import DashboardLayout from "@/components/DashboardLayout";

const AGENTS = [
  { id: 1, name: "Infrastructure Monitor", icon: "🏗️", status: "ACTIVE", tasks: 12, color: "#38bdf8", desc: "Monitoring 2,847 assets. Last anomaly: Pamban Bridge vibration spike.", tools: ["SensorAPI", "AlertEngine", "RiskScorer"] },
  { id: 2, name: "Weather Intelligence", icon: "🌀", status: "ACTIVE", tasks: 8, color: "#a78bfa", desc: "Tracking Cyclone SITRANG. Severity: CAT-3. ETA landfall: 36 hours.", tools: ["IMD_API", "NASA_GFS", "OpenWeather"] },
  { id: 3, name: "Vision AI", icon: "👁️", status: "ACTIVE", tasks: 5, color: "#f59e0b", desc: "Analysing 340 satellite frames. 2 structural anomalies flagged.", tools: ["YOLOv11", "SAM2", "OpenCV"] },
  { id: 4, name: "Risk Predictor", icon: "📉", status: "ACTIVE", tasks: 24, color: "#f87171", desc: "Running LSTM + XGBoost models. 3 high-risk predictions active.", tools: ["LSTM", "XGBoost", "Prophet"] },
  { id: 5, name: "News Intelligence", icon: "📰", status: "ACTIVE", tasks: 47, color: "#34d399", desc: "Processed 47 gov advisories today. Monitoring 12 flood advisories.", tools: ["LLM_NER", "PDFReader", "SentimentAI"] },
  { id: 6, name: "Knowledge Graph", icon: "🧠", status: "ACTIVE", tasks: 3, color: "#6ee7b7", desc: "Graph updated: 128 new relationships added since 09:00 IST.", tools: ["Neo4j", "CypherQL", "Embeddings"] },
  { id: 7, name: "Decision Support", icon: "🎯", status: "ACTIVE", tasks: 6, color: "#fb923c", desc: "Generated 6 emergency response plans. Evacuation route optimized.", tools: ["RouteOptimizer", "BudgetEngine", "SOPEngine"] },
  { id: 8, name: "Chief AI Coordinator", icon: "⚡", status: "ORCHESTRATING", tasks: 100, color: "#0ea5e9", desc: "Orchestrating all agents via LangGraph. 100% task completion rate.", tools: ["LangGraph", "StateManager", "MemoryStore"] },
];

const RECENT_TASKS = [
  { agent: "Risk Predictor", task: "Calculated 85% failure probability for Pamban Bridge", time: "2m ago", severity: "CRITICAL" },
  { agent: "Weather Intel", task: "Updated cyclone trajectory — landfall shifted to Rameswaram", time: "8m ago", severity: "WARNING" },
  { agent: "Vision AI", task: "Analysed 12 drone frames of Tehri Dam spillway", time: "22m ago", severity: "INFO" },
  { agent: "News Intel", task: "Extracted 3 critical advisories from MoHA circular PDF", time: "35m ago", severity: "INFO" },
  { agent: "Decision Support", task: "Generated evacuation route: Rameswaram → Madurai via NH-49", time: "1h ago", severity: "WARNING" },
];

const severityColor: Record<string, string> = { CRITICAL: "#f87171", WARNING: "#fbbf24", INFO: "#38bdf8" };
const severityBg: Record<string, string> = { CRITICAL: "rgba(239,68,68,0.12)", WARNING: "rgba(245,158,11,0.1)", INFO: "rgba(56,189,248,0.08)" };

export default function AgentsPage() {
  return (
    <DashboardLayout title="AI Agents">
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {/* Header */}
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.4rem", fontWeight: 900, background: "linear-gradient(90deg, #a78bfa, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            🤖 Multi-Agent Intelligence System
          </h2>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#475569" }}>8 autonomous agents running on LangGraph • All operational</p>
        </div>

        {/* Agent Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {AGENTS.map(agent => (
            <div key={agent.id} style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: `1px solid ${agent.color}18`, borderRadius: "16px", padding: "18px", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
              {/* Glow */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: `radial-gradient(circle, ${agent.color}18 0%, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <span style={{ fontSize: "24px" }}>{agent.icon}</span>
                <span style={{ fontSize: "0.58rem", fontWeight: 800, padding: "2px 8px", borderRadius: "8px", background: agent.status === "ORCHESTRATING" ? "rgba(14,165,233,0.15)" : "rgba(16,185,129,0.1)", border: `1px solid ${agent.status === "ORCHESTRATING" ? "rgba(14,165,233,0.3)" : "rgba(16,185,129,0.25)"}`, color: agent.status === "ORCHESTRATING" ? "#38bdf8" : "#34d399" }}>
                  {agent.status}
                </span>
              </div>
              <h3 style={{ margin: "0 0 6px", fontSize: "0.82rem", fontWeight: 800, color: "#f0f6ff" }}>{agent.name}</h3>
              <p style={{ margin: "0 0 10px", fontSize: "0.7rem", color: "#64748b", lineHeight: 1.5 }}>{agent.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                {agent.tools.map(t => (
                  <span key={t} style={{ fontSize: "0.58rem", padding: "2px 7px", borderRadius: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#64748b" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "0.65rem", color: "#475569" }}>Tasks today</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: agent.color }}>{agent.tasks}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ask Agent + Recent Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "16px" }}>
          {/* Query Interface */}
          <div style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: "0.85rem", fontWeight: 800, color: "#f0f6ff" }}>💬 Query Chief AI Coordinator</h3>
            <p style={{ margin: "0 0 16px", fontSize: "0.72rem", color: "#475569" }}>Ask anything about infrastructure risk, weather, or emergency response</p>
            {[
              "What bridge has the highest failure probability in Tamil Nadu?",
              "Which railway stations may flood in the next 8 hours?",
              "Generate emergency response plan for Cyclone SITRANG.",
            ].map(q => (
              <div key={q} style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "8px", cursor: "pointer", fontSize: "0.78rem", color: "#94a3b8", transition: "all 0.2s" }}>
                🔍 {q}
              </div>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              <input placeholder="Ask the AI..." style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#f0f6ff", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" }} />
              <button style={{ padding: "10px 18px", background: "linear-gradient(135deg, #0ea5e9, #10b981)", border: "none", borderRadius: "10px", color: "white", fontWeight: 800, cursor: "pointer", fontSize: "0.85rem" }}>Ask →</button>
            </div>
          </div>

          {/* Recent Tasks */}
          <div style={{ background: "rgba(8,14,26,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: "0.85rem", fontWeight: 800, color: "#f0f6ff" }}>📋 Recent Agent Tasks</h3>
            {RECENT_TASKS.map((t, i) => (
              <div key={i} style={{ padding: "10px 12px", borderRadius: "10px", background: severityBg[t.severity], border: `1px solid ${severityColor[t.severity]}20`, marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: severityColor[t.severity] }}>{t.agent}</span>
                  <span style={{ fontSize: "0.65rem", color: "#334155" }}>{t.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.73rem", color: "#94a3b8" }}>{t.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
