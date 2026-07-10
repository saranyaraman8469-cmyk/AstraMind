"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEPARTMENTS = [
  { value: "disaster", label: "🚨  Disaster Management" },
  { value: "infra",    label: "🏗️  Infrastructure" },
  { value: "medical",  label: "🏥  Medical / Health" },
  { value: "power",    label: "⚡  Power & Energy" },
  { value: "railways", label: "🚆  Railways" },
  { value: "coast",    label: "⚓  Coast Guard" },
];

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "", department: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  };

  if (!mounted) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#04080F",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      fontFamily: "var(--font-geist-sans), 'Inter', sans-serif",
      padding: "40px 20px"
    }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      
      {/* Orbs */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "45%", height: "45%", background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="animate-fade-up" style={{ width: "100%", maxWidth: "500px", position: "relative", zIndex: 10 }}>
        <div className="glass" style={{
          borderRadius: "20px", padding: "40px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(16,185,129,0.05), inset 0 1px 0 rgba(255,255,255,0.06)"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{
              width: 60, height: 60,
              background: "linear-gradient(135deg, #10b981, #059669)",
              borderRadius: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: "16px", fontSize: "26px",
              boxShadow: "0 8px 32px rgba(16,185,129,0.4)"
            }}>
              🛡️
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #34d399, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "6px" }}>
              Request Access
            </h1>
            <p style={{ color: "#475569", fontSize: "0.85rem" }}>Join the AstraMind intelligence network</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Username + Department row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#64748b", marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Username</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", opacity: 0.5 }}>👤</span>
                  <input type="text" name="username" required onChange={handleChange} className="input-premium" placeholder="officer_01" style={{ fontSize: "0.85rem" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#64748b", marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Department</label>
                <select name="department" required onChange={handleChange} className="input-premium" style={{ paddingLeft: "14px", fontSize: "0.85rem", cursor: "pointer" }}>
                  <option value="">Select...</option>
                  {DEPARTMENTS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#64748b", marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Official Government Email</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", opacity: 0.5 }}>✉️</span>
                <input type="email" name="email" required onChange={handleChange} className="input-premium" placeholder="name@nic.gov.in" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#64748b", marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Secure Password</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", opacity: 0.5 }}>🔒</span>
                <input type="password" name="password" required onChange={handleChange} className="input-premium" placeholder="••••••••" />
              </div>
              <p style={{ marginTop: "6px", fontSize: "0.7rem", color: "#334155" }}>Must be at least 12 characters</p>
            </div>

            {/* Terms */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
              <input type="checkbox" required style={{ marginTop: "3px", accentColor: "#10b981" }} />
              <span style={{ fontSize: "0.775rem", color: "#475569", lineHeight: 1.5 }}>
                I agree to the AstraMind <a href="#" style={{ color: "#34d399", textDecoration: "none" }}>Terms of Access</a> and understand data handling under the <a href="#" style={{ color: "#34d399", textDecoration: "none" }}>IT Act 2000</a>.
              </span>
            </label>

            <button type="submit" disabled={isLoading} className="btn-brand" style={{ width: "100%", marginTop: "4px", background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 8px 32px rgba(16,185,129,0.4)" }}>
              <span>
                {isLoading ? (
                  <>
                    <svg style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                    </svg>
                    Submitting for review...
                  </>
                ) : (
                  "Submit Access Request →"
                )}
              </span>
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem" }}>
            <span style={{ color: "#334155" }}>Already authorized? </span>
            <Link href="/login" style={{ color: "#34d399", fontWeight: 700, textDecoration: "none" }}>Authenticate →</Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
