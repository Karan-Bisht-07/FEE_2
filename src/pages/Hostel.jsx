import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Shield, Plus, Clock, Wrench, CheckCircle2, AlertCircle } from "lucide-react";

export const Hostel = () => {
  const { complaints, addComplaint } = useApp();
  const [subTab, setSubTab] = useState("tickets"); // tickets, file, sla

  const [newTicket, setNewTicket] = useState({
    title: "",
    category: "Electrical",
    location: "Block B - Room 304",
    priority: "Medium",
    description: ""
  });

  const handleFileComplaint = (e) => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.description) return;
    addComplaint(newTicket);
    setNewTicket({
      title: "",
      category: "Electrical",
      location: "Block B - Room 304",
      priority: "Medium",
      description: ""
    });
    setSubTab("tickets");
  };

  const getStatusBadge = (st) => {
    if (st === "Resolved") return <span className="badge badge-green">RESOLVED</span>;
    if (st === "In Progress") return <span className="badge badge-amber">DISPATCHED</span>;
    return <span className="badge badge-rose">PENDING ASSIGNMENT</span>;
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">FACILITY MANAGEMENT</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          HOSTEL COMPLAINT DESK
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          File room maintenance complaints, electrical, plumbing, Wi-Fi issues, and track technician resolution.
        </p>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "tickets" ? "active" : ""}`} onClick={() => setSubTab("tickets")}>
          🛠️ COMPLAINT TICKETS ({complaints.length})
        </button>
        <button className={`subnav-tab ${subTab === "file" ? "active" : ""}`} onClick={() => setSubTab("file")}>
          📝 FILE NEW TICKET
        </button>
        <button className={`subnav-tab ${subTab === "sla" ? "active" : ""}`} onClick={() => setSubTab("sla")}>
          ⏱️ DISPATCH SLAs & WARDEN DIRECTORY
        </button>
      </div>

      {/* Tickets List Tab */}
      {subTab === "tickets" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {complaints.map((c) => (
            <div key={c.id} className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#38bdf8" }}>{c.id}</span>
                  {getStatusBadge(c.status)}
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#ffffff", marginBottom: "0.4rem" }}>
                  {c.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {c.description}
                </p>
              </div>

              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-dim)", borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem" }}>
                  <span>📍 Location: <strong style={{ color: "#ffffff" }}>{c.location}</strong></span>
                  <span>👷 Assigned Tech: <strong style={{ color: "#38bdf8" }}>{c.assignedTo}</strong></span>
                  <span>📅 Submitted: {c.dateSubmitted}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Ticket Tab */}
      {subTab === "file" && (
        <div className="glass-card-reference" style={{ maxWidth: "700px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            FILE HOSTEL MAINTENANCE TICKET
          </h3>

          <form onSubmit={handleFileComplaint} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Issue Title
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Bathroom Geyser Not Heating Water"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Category
                </label>
                <select
                  className="form-input-reference"
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                >
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Wi-Fi & Network">Wi-Fi & Network</option>
                  <option value="Carpentry & Door">Carpentry & Door</option>
                  <option value="Housekeeping">Housekeeping</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Urgency Level
                </label>
                <select
                  className="form-input-reference"
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                >
                  <option value="Low">Low (Within 48h)</option>
                  <option value="Medium">Medium (Within 24h)</option>
                  <option value="High">High (Immediate Dispatch)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Hostel Room / Location
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Block B - Room 304"
                value={newTicket.location}
                onChange={(e) => setNewTicket({ ...newTicket, location: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Detailed Description
              </label>
              <textarea
                className="form-input-reference"
                rows={4}
                placeholder="Describe the exact problem so electrician/plumber brings necessary replacement parts..."
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn-pill-solid" style={{ padding: "1rem" }}>
              DISPATCH TICKET TO WARDEN
            </button>
          </form>
        </div>
      )}

      {/* SLAs & Warden Tab */}
      {subTab === "sla" && (
        <div className="glass-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>
            SERVICE LEVEL AGREEMENTS (SLA) & EMERGENCY NUMBERS
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
              <span className="badge badge-rose">HIGH PRIORITY</span>
              <h4 style={{ color: "#ffffff", margin: "0.5rem 0" }}>Electrical & Power Failures</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Target SLA: Dispatch within 2 Hours</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
              <span className="badge badge-amber">MEDIUM PRIORITY</span>
              <h4 style={{ color: "#ffffff", margin: "0.5rem 0" }}>Plumbing & Water Supply</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Target SLA: Dispatch within 6 Hours</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
              <span className="badge badge-blue">STANDARD PRIORITY</span>
              <h4 style={{ color: "#ffffff", margin: "0.5rem 0" }}>Wi-Fi & LAN Connections</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Target SLA: Resolved within 24 Hours</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
