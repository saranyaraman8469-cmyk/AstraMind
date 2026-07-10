"use client";

import { useState } from "react";
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

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  padding: "12px 16px 12px 40px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px", color: "#f0f6ff", fontSize: "0.875rem",
  outline: "none", transition: "all 0.2s ease", fontFamily: "inherit"
};

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "", department: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const loginRes = await fetch("http://localhost:8000/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: form.username, password: form.password }),
        });
        if (loginRes.ok) {
          const data = await loginRes.json();
          localStorage.setItem("token", data.access_token);
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      } else {
        const err = await res.json();
        alert(err.detail || "Signup failed");
      }
    } catch (err) {
      alert("Network error connecting to API");
    } finally {
      setIsLoading(false);
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(16,185,129,0.5)";
    e.target.style.background = "rgba(16,185,129,0.06)";
    e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.12)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.08)";
    e.target.style.background = "rgba(255,255,255,0.04)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#04080F",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: "40px 20px"
    }}>
      {/* Orbs */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "450px", height: "450px", background: "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", borderRadius: "50%" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "500px" }}>
        {/* Glow line */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.7), rgba(14,165,233,0.5), transparent)", borderRadius: "20px 20px 0 0" }} />

        <div style={{
          background: "rgba(8, 14, 26, 0.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)", borderTop: "none",
          borderRadius: "0 0 20px 20px", padding: "40px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{
              width: 62, height: 62,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: "18px", display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: "26px", marginBottom: "16px",
              boxShadow: "0 8px 32px rgba(16,185,129,0.5), 0 0 0 1px rgba(16,185,129,0.2)"
            }}>🛡️</div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 900, margin: "0 0 6px", background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.03em" }}>
              Request Access
            </h1>
            <p style={{ color: "#475569", fontSize: "0.82rem", margin: 0 }}>Join the AstraMind intelligence network</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#64748b", marginBottom: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Username</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", opacity: 0.4 }}>👤</span>
                  <input type="text" name="username" required onChange={handleChange} style={inputStyle} placeholder="officer_01" onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#64748b", marginBottom: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Department</label>
                <select name="department" required onChange={handleChange} style={{ ...inputStyle, paddingLeft: "14px", cursor: "pointer" }} onFocus={focusStyle} onBlur={blurStyle}>
                  <option value="" style={{ background: "#0a1628" }}>Select...</option>
                  {DEPARTMENTS.map(d => <option key={d.value} value={d.value} style={{ background: "#0a1628" }}>{d.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#64748b", marginBottom: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Official Government Email</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", opacity: 0.4 }}>✉️</span>
                <input type="email" name="email" required onChange={handleChange} style={inputStyle} placeholder="name@nic.gov.in" onFocus={focusStyle} onBlur={blurStyle} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#64748b", marginBottom: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Secure Password</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", opacity: 0.4 }}>🔒</span>
                <input type="password" name="password" required onChange={handleChange} style={inputStyle} placeholder="••••••••" onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "0.68rem", color: "#334155" }}>Minimum 12 characters required</p>
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
              <input type="checkbox" required style={{ marginTop: "2px", accentColor: "#10b981", width: 14, height: 14 }} />
              <span style={{ fontSize: "0.75rem", color: "#475569", lineHeight: 1.6 }}>
                I agree to the <a href="#" style={{ color: "#34d399" }}>Terms of Access</a> and acknowledge data handling under the <a href="#" style={{ color: "#34d399" }}>IT Act 2000</a>.
              </span>
            </label>

            <button type="submit" disabled={isLoading} style={{
              padding: "14px", border: "none", borderRadius: "12px",
              background: isLoading ? "rgba(16,185,129,0.4)" : "linear-gradient(135deg, #10b981, #059669)",
              color: "white", fontSize: "0.95rem", fontWeight: 800,
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 32px rgba(16,185,129,0.4)",
              fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
            }}>
              {isLoading ? (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" /></svg>Submitting...</>
              ) : "Submit Access Request →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.85rem", color: "#334155" }}>
            Already authorized? <Link href="/login" style={{ color: "#34d399", fontWeight: 700, textDecoration: "none" }}>Authenticate →</Link>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, select::placeholder { color: #334155; }
      `}</style>
    </div>
  );
}
