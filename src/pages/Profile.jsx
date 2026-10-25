import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { User, QrCode, Award, BookOpen, Edit, Save, CheckCircle, ShieldCheck } from "lucide-react";

export const Profile = () => {
  const { user, setUser } = useApp();
  const [subTab, setSubTab] = useState("idcard"); // idcard, academics, achievements, edit
  const [editForm, setEditForm] = useState({ ...user });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(editForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!newAchievement) return;
    const updated = {
      ...user,
      achievements: [newAchievement, ...user.achievements]
    };
    setUser(updated);
    setEditForm(updated);
    setNewAchievement("");
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">STUDENT PORTAL</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          STUDENT PROFILE
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Manage your verified digital campus credentials, academic records, and personal hostel settings.
        </p>
      </div>

      {/* Sub-nav Tab Bar */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "idcard" ? "active" : ""}`} onClick={() => setSubTab("idcard")}>
          🪪 DIGITAL ID CARD
        </button>
        <button className={`subnav-tab ${subTab === "academics" ? "active" : ""}`} onClick={() => setSubTab("academics")}>
          📚 ACADEMIC RECORDS
        </button>
        <button className={`subnav-tab ${subTab === "achievements" ? "active" : ""}`} onClick={() => setSubTab("achievements")}>
          🏆 ACHIEVEMENTS ({user.achievements.length})
        </button>
        <button className={`subnav-tab ${subTab === "edit" ? "active" : ""}`} onClick={() => setSubTab("edit")}>
          ✏️ EDIT PROFILE
        </button>
      </div>

      {/* Sub-tab 1: Digital ID Card */}
      {subTab === "idcard" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {/* Visual ID Card Card */}
          <div
            className="glass-card"
            style={{
              background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "2rem",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.2em", color: "#38bdf8" }}>
                  STATE TECHNICAL UNIVERSITY
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", margin: 0 }}>
                  CAMPUS DIGITAL ID
                </h3>
              </div>
              <ShieldCheck size={28} color="#34d399" />
            </div>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1.5rem" }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  objectFit: "cover",
                  border: "2px solid rgba(255, 255, 255, 0.2)"
                }}
              />
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff" }}>
                  {user.name.toUpperCase()}
                </h2>
                <div style={{ fontSize: "0.85rem", color: "#38bdf8", fontWeight: 700 }}>
                  ROLL NO: {user.rollNo}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  {user.department}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase" }}>YEAR & SEM</span>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#ffffff" }}>{user.year}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase" }}>HOSTEL ROOM</span>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#ffffff" }}>{user.hostel}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase" }}>BLOOD GROUP</span>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f87171" }}>{user.bloodGroup}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase" }}>CUMULATIVE CGPA</span>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#34d399" }}>{user.cgpa} / 10.0</div>
              </div>
            </div>

            {/* QR Verification Barcode Mock */}
            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px stroke rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>VERIFIED ENCRYPTED QR PASS</span>
                <div style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)" }}>HASH: 8f92a0149c</div>
              </div>
              <div style={{ background: "#ffffff", padding: "0.4rem", borderRadius: "6px" }}>
                <QrCode size={40} color="#000000" />
              </div>
            </div>
          </div>

          {/* Quick Info Summary */}
          <div className="glass-card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "1rem" }}>
              SECURITY & METRICS
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>EMAIL ADDRESS</span>
                <div style={{ fontWeight: 600, color: "#ffffff" }}>{user.email}</div>
              </div>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>PHONE NUMBER</span>
                <div style={{ fontWeight: 600, color: "#ffffff" }}>{user.phone}</div>
              </div>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SYSTEM ROLE PERMISSIONS</span>
                <div style={{ fontWeight: 600, color: "#38bdf8", textTransform: "uppercase" }}>{user.role} PERMITTED ACCESS</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Academic Records */}
      {subTab === "academics" && (
        <div className="glass-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>
            SEMESTER-WISE PERFORMANCE HISTORY
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { sem: "Sem 1", sgpa: "8.75", credits: 24, status: "Passed" },
              { sem: "Sem 2", sgpa: "8.90", credits: 24, status: "Passed" },
              { sem: "Sem 3", sgpa: "9.12", credits: 26, status: "Dean's List" },
              { sem: "Sem 4", sgpa: "8.85", credits: 24, status: "Passed" },
              { sem: "Sem 5", sgpa: "9.00", credits: 25, status: "Dean's List" },
              { sem: "Sem 6 (Current)", sgpa: "Pending", credits: 24, status: "In Progress" }
            ].map((s, idx) => (
              <div key={idx} style={{ background: "rgba(15,20,26,0.6)", padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.sem}</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: s.sgpa === "Pending" ? "var(--text-dim)" : "#34d399" }}>
                  {s.sgpa}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Credits: {s.credits}</div>
                <span className={`badge ${s.status.includes("Dean") ? "badge-amber" : "badge-blue"}`} style={{ marginTop: "0.5rem", fontSize: "0.65rem" }}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(59, 130, 246, 0.08)", padding: "1.25rem", borderRadius: "10px", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
            <span style={{ fontWeight: 700, color: "#60a5fa" }}>📊 Cumulative Grade Point Average (CGPA): {user.cgpa} / 10.0</span>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
              Ranked in top 5% of Department of Computer Science & Engineering. Eligible for all tier-1 campus recruitment drives.
            </p>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Achievements */}
      {subTab === "achievements" && (
        <div className="glass-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>
            HONORS & CERTIFICATIONS
          </h3>

          <form onSubmit={handleAddAchievement} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <input
              type="text"
              className="form-input-dark"
              placeholder="Add new hackathon win, publication or badge..."
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
            />
            <button type="submit" className="btn-pill-solid" style={{ flexShrink: 0 }}>
              ADD BADGE
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {user.achievements.map((ach, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "10px"
                }}
              >
                <Award size={24} color="#f59e0b" />
                <span style={{ fontWeight: 600, color: "#ffffff", fontSize: "0.95rem" }}>{ach}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 4: Edit Profile */}
      {subTab === "edit" && (
        <div className="glass-card-reference" style={{ maxWidth: "700px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            UPDATE STUDENT RECORDS
          </h3>

          {savedSuccess && (
            <div style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.3)", marginBottom: "1.5rem" }}>
              ✅ Profile details updated successfully!
            </div>
          )}

          <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-input-reference"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>
                  Hostel & Room
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  value={editForm.hostel}
                  onChange={(e) => setEditForm({ ...editForm, hostel: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>
                  Blood Group
                </label>
                <select
                  className="form-input-reference"
                  value={editForm.bloodGroup}
                  onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                >
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>
                  Department
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-pill-solid" style={{ marginTop: "1rem", padding: "1rem" }}>
              SAVE CHANGES <Save size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
