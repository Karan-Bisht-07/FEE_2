import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Shield, Users, Calendar, Wrench, Megaphone, CheckCircle, XCircle, Send, AlertTriangle } from "lucide-react";

export const AdminDashboard = () => {
  const {
    events,
    complaints,
    updateComplaintStatus,
    role,
    toggleRole
  } = useApp();

  const [subTab, setSubTab] = useState("telemetry"); // telemetry, events, complaints, broadcast
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const pendingComplaints = complaints.filter(c => c.status === "Pending" || c.status === "In Progress");

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!broadcastText) return;
    setBroadcastSent(true);
    setBroadcastText("");
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <div className="section-tag" style={{ color: "#38bdf8" }}>ADMINISTRATION CONTROL DESK</div>
          <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            CAMPUSHUB ADMIN
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Oversee user management, approve event proposals, dispatch hostel maintenance, and broadcast campus alerts.
          </p>
        </div>

        <div className="badge badge-blue" style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>
          <Shield size={16} /> LOGGED IN AS: {role.toUpperCase()}
        </div>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "telemetry" ? "active" : ""}`} onClick={() => setSubTab("telemetry")}>
          📊 SYSTEM TELEMETRY
        </button>
        <button className={`subnav-tab ${subTab === "complaints" ? "active" : ""}`} onClick={() => setSubTab("complaints")}>
          🛠️ COMPLAINT DISPATCH DESK ({pendingComplaints.length})
        </button>
        <button className={`subnav-tab ${subTab === "broadcast" ? "active" : ""}`} onClick={() => setSubTab("broadcast")}>
          📢 CAMPUS BROADCASTER
        </button>
      </div>

      {/* Telemetry Tab */}
      {subTab === "telemetry" && (
        <>
          {/* Stat Overview Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            <div className="glass-card">
              <span className="badge badge-blue">REGISTERED</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: "#ffffff", margin: "0.4rem 0 0" }}>
                12,540
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>TOTAL STUDENTS</span>
            </div>

            <div className="glass-card">
              <span className="badge badge-amber">PENDING DISPATCH</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: "#fbbf24", margin: "0.4rem 0 0" }}>
                {pendingComplaints.length}
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>ACTIVE COMPLAINTS</span>
            </div>

            <div className="glass-card">
              <span className="badge badge-green">LIVE EVENTS</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: "#34d399", margin: "0.4rem 0 0" }}>
                {events.length}
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>SCHEDULED EVENTS</span>
            </div>

            <div className="glass-card">
              <span className="badge badge-rose">EMERGENCY</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: "#f87171", margin: "0.4rem 0 0" }}>
                1
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>URGENT BLOOD CASES</span>
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "1rem" }}>
              ADMINISTRATIVE ROLE & SECURITY
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              You are currently viewing CampusHub in Admin mode. You can toggle back to Student view anytime using the navbar role switcher at the top right.
            </p>
            <button className="btn-pill-solid" onClick={() => toggleRole("student")}>
              SWITCH TO STUDENT VIEW
            </button>
          </div>
        </>
      )}

      {/* Complaints Dispatch Tab */}
      {subTab === "complaints" && (
        <div className="glass-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>
            MANAGE & ASSIGN HOSTEL TECHNICIANS
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {complaints.map(c => (
              <div
                key={c.id}
                style={{
                  padding: "1.25rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontFamily: "monospace", color: "#38bdf8", fontSize: "0.8rem" }}>{c.id}</span>
                    <span className="badge badge-amber">{c.category}</span>
                  </div>
                  <h4 style={{ color: "#ffffff", fontSize: "1.1rem" }}>{c.title}</h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                    📍 Location: {c.location} | Assigned: <strong style={{ color: "#34d399" }}>{c.assignedTo}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn-pill-solid"
                    style={{ fontSize: "0.75rem", padding: "0.4rem 0.9rem" }}
                    onClick={() => updateComplaintStatus(c.id, "In Progress", "Ramesh Electrician (Dispatched)")}
                  >
                    ASSIGN TECH
                  </button>
                  <button
                    className="btn-pill-outline"
                    style={{ fontSize: "0.75rem", padding: "0.4rem 0.9rem" }}
                    onClick={() => updateComplaintStatus(c.id, "Resolved")}
                  >
                    MARK RESOLVED ✅
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Broadcast Tab */}
      {subTab === "broadcast" && (
        <div className="glass-card-reference" style={{ maxWidth: "650px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            CAMPUS-WIDE PUSH BROADCASTER
          </h3>

          {broadcastSent && (
            <div style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", padding: "1rem", borderRadius: "8px", marginBottom: "1.25rem" }}>
              📢 Broadcast notification sent to all 12,500+ active student mobile apps & portal homepages!
            </div>
          )}

          <form onSubmit={handleBroadcastSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Announcement Message
              </label>
              <textarea
                className="form-input-reference"
                rows={5}
                placeholder="e.g. End Semester Exam dates released. Mid-term hall tickets available for download under Student Profile..."
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-pill-solid" style={{ padding: "1rem" }}>
              SEND PUSH NOTIFICATION <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
