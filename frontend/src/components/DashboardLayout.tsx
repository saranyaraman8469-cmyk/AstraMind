"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const NAV = [
  { icon: "🏠", label: "Dashboard",    href: "/dashboard" },
  { icon: "🗺️", label: "Digital Twin", href: "/dashboard/digital-twin" },
  { icon: "🤖", label: "AI Agents",    href: "/dashboard/agents" },
  { icon: "📊", label: "Analytics",    href: "/dashboard/analytics" },
  { icon: "🔔", label: "Alerts",       href: "/dashboard/alerts" },
  { icon: "🧠", label: "Knowledge",    href: "/dashboard/knowledge" },
  { icon: "⚙️", label: "Settings",     href: "/dashboard/settings" },
];

function ThemeBtn() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 36, height: 36 }} />;
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme"
      style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default function DashboardLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const pathname = usePathname();
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#04080F", color: "#f0f6ff", fontFamily: "'Inter', -apple-system, sans-serif", display: "flex" }}>
      {/* Grid Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(14,165,233,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "fixed", top: "-20%", left: "0", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0, borderRadius: "50%" }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "0", width: "450px", height: "450px", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0, borderRadius: "50%" }} />

      {/* SIDEBAR */}
      <div style={{ width: "64px", flexShrink: 0, height: "100vh", position: "sticky", top: 0, background: "rgba(4,8,15,0.96)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", gap: "4px", zIndex: 100 }}>
        {/* Logo */}
        <Link href="/dashboard" style={{ textDecoration: "none", marginBottom: "12px" }}>
          <div style={{ width: 40, height: 40, borderRadius: "12px", background: "linear-gradient(135deg, #0ea5e9, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 20px rgba(14,165,233,0.4)" }}>⚡</div>
        </Link>
        {NAV.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} title={item.label} style={{ textDecoration: "none" }}>
              <div style={{ width: 44, height: 44, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", cursor: "pointer", background: isActive ? "rgba(14,165,233,0.15)" : "transparent", border: isActive ? "1px solid rgba(14,165,233,0.35)" : "1px solid transparent", transition: "all 0.2s", position: "relative" }}>
                {item.icon}
                {isActive && <div style={{ position: "absolute", right: "-2px", top: "50%", transform: "translateY(-50%)", width: 3, height: 20, borderRadius: "2px", background: "linear-gradient(180deg, #0ea5e9, #10b981)" }} />}
              </div>
            </Link>
          );
        })}
        {/* Bottom avatar */}
        <div style={{ marginTop: "auto", width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", border: "2px solid rgba(99,102,241,0.3)" }}>👤</div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, minHeight: "100vh", overflow: "auto", position: "relative", zIndex: 10 }}>
        {/* TOPBAR */}
        <div style={{ height: "60px", position: "sticky", top: 0, zIndex: 50, background: "rgba(4,8,15,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1rem", fontWeight: 900, background: "linear-gradient(90deg, #38bdf8, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AstraMind</span>
            <span style={{ color: "#1e293b" }}>/</span>
            <span style={{ color: "#475569", fontSize: "0.85rem" }}>{title || "Dashboard"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#1e3a5f", letterSpacing: "0.05em" }}>IST {time}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "blink 2s infinite" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#34d399", letterSpacing: "0.08em" }}>ALL SYSTEMS NOMINAL</span>
            </div>
            <ThemeBtn />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ padding: "22px" }}>
          {children}
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
