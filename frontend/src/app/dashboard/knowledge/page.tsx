"use client";

import DashboardLayout from "@/components/DashboardLayout";

const NODES = [
  { label: "Pamban Bridge", type: "Bridge", connections: 8, color: "#f87171" },
  { label: "Tamil Nadu", type: "State", connections: 24, color: "#38bdf8" },
  { label: "Cyclone SITRANG", type: "Weather", connections: 6, color: "#a78bfa" },
  { label: "Rameswaram Hospital", type: "Hospital", connections: 5, color: "#34d399" },
  { label: "Sensor Cluster TN-04", type: "Sensor", connections: 12, color: "#f59e0b" },
  { label: "NH-49", type: "Road", connections: 7, color: "#fb923c" },
  { label: "Emergency Team 7", type: "Team", connections: 4, color: "#6ee7b7" },
  { label: "Kudankulam NPP", type: "Power Plant", connections: 9, color: "#818cf8" },
];

const RELATIONSHIPS = [
  { from: "Pamban Bridge", to: "Tamil Nadu", rel: "LOCATED_IN" },
  { from: "Pamban Bridge", to: "Sensor Cluster TN-04", rel: "MONITORED_BY" },
  { from: "Cyclone SITRANG", to: "Tamil Nadu", rel: "AFFECTS" },
  { from: "Cyclone SITRANG", to: "Pamban Bridge", rel: "THREATENS" },
  { from: "Rameswaram Hospital", to: "Tamil Nadu", rel: "LOCATED_IN" },
  { from: "NH-49", to: "Pamban Bridge", rel: "CONNECTED_TO" },
  { from: "Emergency Team 7", to: "Pamban Bridge", rel: "ASSIGNED_TO" },
  { from: "Kudankulam NPP", to: "Tamil Nadu", rel: "LOCATED_IN" },
];

const DOCS = [
  { title: "IRC Bridge Inspection Manual 2024", type: "PDF", pages: 340, indexed: true },
  { title: "NDMA Flood Response SOP", type: "PDF", pages: 128, indexed: true },
  { title: "IMD Cyclone Warning Protocol", type: "PDF", pages: 67, indexed: true },
  { title: "Tamil Nadu Infrastructure Audit 2024", type: "Report", pages: 210, indexed: false },
  { title: "AIIMS Emergency Capacity Plan", type: "Policy", pages: 45, indexed: true },
];

const nodeTypeColor: Record<string, string> = {
  Bridge: "#f87171", State: "#38bdf8", Weather: "#a78bfa", Hospital: "#34d399",
  Sensor: "#f59e0b", Road: "#fb923c", Team: "#6ee7b7", "Power Plant": "#818cf8",
};

export default function KnowledgePage() {
  return (
    <DashboardLayout title="Knowledge Graph & RAG">
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.4rem", fontWeight: 900, background: "linear-gradient(90deg, #6ee7b7, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            🧠 Knowledge Graph & RAG System
          </h2>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)" }}>Neo4j Graph Database • Qdrant Vector Store • LlamaIndex RAG Pipeline</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {[
            { label: "Graph Nodes", value: "14,328", icon: "🔵", color: "#38bdf8" },
            { label: "Relationships", value: "52,106", icon: "🔗", color: "#a78bfa" },
            { label: "Documents Indexed", value: "1,247", icon: "📄", color: "#34d399" },
            { label: "Vector Embeddings", value: "89.4K", icon: "🧬", color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: `1px solid ${s.color}18`, borderRadius: "14px", padding: "16px 20px" }}>
              <p style={{ margin: "0 0 6px", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)" }}>{s.value}</span>
                <span style={{ fontSize: "24px" }}>{s.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Graph Visualization + Relationships */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "16px" }}>
          {/* Graph */}
          <div style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>Graph Explorer</h3>
              <input placeholder="Search nodes..." style={{ padding: "6px 12px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "0.78rem", outline: "none", width: "200px", fontFamily: "inherit" }} />
            </div>
            {/* Visual node layout */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", padding: "20px 10px", minHeight: "260px", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid var(--bg-input)" }}>
              {NODES.map(node => (
                <div key={node.label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                  padding: "14px 16px", borderRadius: "14px", cursor: "pointer",
                  background: `${node.color}10`, border: `1px solid ${node.color}25`,
                  transition: "all 0.2s", minWidth: "110px"
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${node.color}22`, border: `2px solid ${node.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, color: node.color }}>
                    {node.connections}
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-primary)", textAlign: "center" }}>{node.label}</span>
                  <span style={{ fontSize: "0.58rem", color: "var(--text-muted)", fontWeight: 600 }}>{node.type}</span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--divider)" }}>
              {Object.entries(nodeTypeColor).map(([type, color]) => (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                  <span style={{ fontSize: "0.62rem", color: "#64748b" }}>{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Relationships + Documents */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Relationships */}
            <div style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "16px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "0.82rem", fontWeight: 800, color: "var(--text-primary)" }}>🔗 Active Relationships</h3>
              {RELATIONSHIPS.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 0", borderBottom: i < RELATIONSHIPS.length - 1 ? "1px solid var(--bg-input)" : "none" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", flex: "0 0 130px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{r.from}</span>
                  <span style={{ fontSize: "0.58rem", fontWeight: 800, color: "#38bdf8", background: "rgba(56,189,248,0.1)", padding: "1px 6px", borderRadius: "4px" }}>{r.rel}</span>
                  <span style={{ fontSize: "0.55rem", color: "#334155" }}>→</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)" }}>{r.to}</span>
                </div>
              ))}
            </div>

            {/* Indexed Documents */}
            <div style={{ background: "var(--bg-panel)", backdropFilter: "blur(16px)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "16px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "0.82rem", fontWeight: 800, color: "var(--text-primary)" }}>📄 RAG Document Store</h3>
              {DOCS.map((doc, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < DOCS.length - 1 ? "1px solid var(--bg-input)" : "none" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1" }}>{doc.title}</p>
                    <p style={{ margin: "2px 0 0", fontSize: "0.62rem", color: "var(--text-muted)" }}>{doc.type} • {doc.pages} pages</p>
                  </div>
                  <span style={{ fontSize: "0.58rem", fontWeight: 700, padding: "2px 8px", borderRadius: "6px", background: doc.indexed ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", border: doc.indexed ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(245,158,11,0.25)", color: doc.indexed ? "#34d399" : "#fbbf24" }}>
                    {doc.indexed ? "INDEXED" : "PENDING"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
