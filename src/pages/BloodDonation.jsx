import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { HeartHandshake, Plus, PhoneCall, Search, ShieldAlert, CheckCircle } from "lucide-react";

export const BloodDonation = () => {
  const { bloodDonors, bloodRequests, addBloodDonor, addBloodRequest } = useApp();
  const [subTab, setSubTab] = useState("requests"); // requests, donors, regdonor, postreq
  const [selectedGroupFilter, setSelectedGroupFilter] = useState("All");

  const [donorForm, setDonorForm] = useState({
    name: "",
    bloodGroup: "O+",
    phone: "",
    hostel: "",
    department: ""
  });

  const [reqForm, setReqForm] = useState({
    patientName: "",
    bloodGroup: "O-",
    units: 2,
    hospital: "",
    urgency: "Immediate",
    contactPerson: "",
    contactNumber: ""
  });

  const [postedSuccess, setPostedSuccess] = useState(false);

  const filteredDonors = bloodDonors.filter(d => {
    if (selectedGroupFilter === "All") return true;
    return d.bloodGroup === selectedGroupFilter;
  });

  const handleRegDonor = (e) => {
    e.preventDefault();
    if (!donorForm.name || !donorForm.phone) return;
    addBloodDonor(donorForm);
    setDonorForm({ name: "", bloodGroup: "O+", phone: "", hostel: "", department: "" });
    setSubTab("donors");
  };

  const handlePostReq = (e) => {
    e.preventDefault();
    if (!reqForm.patientName || !reqForm.contactNumber) return;
    addBloodRequest(reqForm);
    setPostedSuccess(true);
    setTimeout(() => {
      setPostedSuccess(false);
      setSubTab("requests");
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">SAVING LIVES NETWORK</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          BLOOD DONATION NETWORK
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Campus emergency blood donor directory, urgent blood requirement posts, and student donor registration.
        </p>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "requests" ? "active" : ""}`} onClick={() => setSubTab("requests")}>
          🚨 URGENT BLOOD REQUESTS ({bloodRequests.length})
        </button>
        <button className={`subnav-tab ${subTab === "donors" ? "active" : ""}`} onClick={() => setSubTab("donors")}>
          🩸 VOLUNTEER DONOR DIRECTORY ({bloodDonors.length})
        </button>
        <button className={`subnav-tab ${subTab === "regdonor" ? "active" : ""}`} onClick={() => setSubTab("regdonor")}>
          ➕ REGISTER AS DONOR
        </button>
        <button className={`subnav-tab ${subTab === "postreq" ? "active" : ""}`} onClick={() => setSubTab("postreq")}>
          📢 POST EMERGENCY REQUEST
        </button>
      </div>

      {/* Requests View */}
      {subTab === "requests" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {bloodRequests.map(r => (
            <div
              key={r.id}
              className="glass-card"
              style={{
                borderLeft: r.status === "Urgent" ? "4px solid #f43f5e" : "4px solid #10b981",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="badge badge-rose" style={{ fontSize: "1rem", fontWeight: 800, padding: "0.3rem 0.9rem" }}>
                    BLOOD GROUP: {r.bloodGroup}
                  </span>
                  <span className={`badge ${r.status === "Urgent" ? "badge-rose" : "badge-green"}`}>
                    {r.status.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#ffffff", marginBottom: "0.4rem" }}>
                  {r.patientName} ({r.units} Units Needed)
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  <span>🏥 Hospital: <strong style={{ color: "#ffffff" }}>{r.hospital}</strong></span>
                  <span>⏳ Timeline: <strong style={{ color: "#f87171" }}>{r.urgency}</strong></span>
                  <span>📅 Posted: {r.datePosted}</span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>CONTACT PERSON</div>
                  <div style={{ fontSize: "0.85rem", color: "#ffffff", fontWeight: 700 }}>{r.contactPerson} ({r.contactNumber})</div>
                </div>

                <a href={`tel:${r.contactNumber}`} className="btn-pill-solid" style={{ fontSize: "0.75rem", padding: "0.5rem 1rem" }}>
                  CALL NOW <PhoneCall size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Donor Directory Tab */}
      {subTab === "donors" && (
        <>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
              <button
                key={bg}
                style={{
                  background: selectedGroupFilter === bg ? "#f43f5e" : "rgba(255,255,255,0.05)",
                  color: "#ffffff",
                  border: "1px solid var(--border-subtle)",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
                onClick={() => setSelectedGroupFilter(bg)}
              >
                {bg}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {filteredDonors.map(d => (
              <div key={d.id} className="glass-card" style={{ display: "flex", alignItems: "center", justify: "space-between", gap: "1rem" }}>
                <div>
                  <span className="badge badge-rose" style={{ fontSize: "0.9rem", fontWeight: 800 }}>{d.bloodGroup}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#ffffff", marginTop: "0.3rem" }}>
                    {d.name}
                  </h3>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {d.department} | {d.hostel}
                  </div>
                </div>

                <a href={`tel:${d.phone}`} className="btn-pill-outline" style={{ fontSize: "0.75rem" }}>
                  <PhoneCall size={14} /> CALL
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Register Donor View */}
      {subTab === "regdonor" && (
        <div className="glass-card-reference" style={{ maxWidth: "650px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            REGISTER AS VOLUNTEER BLOOD DONOR
          </h3>

          <form onSubmit={handleRegDonor} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Arjun Verma"
                value={donorForm.name}
                onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Blood Group
                </label>
                <select
                  className="form-input-reference"
                  value={donorForm.bloodGroup}
                  onChange={(e) => setDonorForm({ ...donorForm, bloodGroup: e.target.value })}
                >
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Contact Phone
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  placeholder="+91 98765 43210"
                  value={donorForm.phone}
                  onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Hostel Block & Room
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  placeholder="Block B - Room 102"
                  value={donorForm.hostel}
                  onChange={(e) => setDonorForm({ ...donorForm, hostel: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Department
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  placeholder="CSE / ECE / ME"
                  value={donorForm.department}
                  onChange={(e) => setDonorForm({ ...donorForm, department: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-pill-solid" style={{ padding: "1rem" }}>
              JOIN EMERGENCY DONOR NETWORK
            </button>
          </form>
        </div>
      )}

      {/* Post Emergency Request Tab */}
      {subTab === "postreq" && (
        <div className="glass-card-reference" style={{ maxWidth: "650px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            POST EMERGENCY BLOOD REQUIREMENT
          </h3>

          {postedSuccess && (
            <div style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
              ✅ Emergency Blood Request Published! Alerting campus donors...
            </div>
          )}

          <form onSubmit={handlePostReq} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Patient / Case Description
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Surgery Patient at City Civil Hospital"
                value={reqForm.patientName}
                onChange={(e) => setReqForm({ ...reqForm, patientName: e.target.value })}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Required Blood Group
                </label>
                <select
                  className="form-input-reference"
                  value={reqForm.bloodGroup}
                  onChange={(e) => setReqForm({ ...reqForm, bloodGroup: e.target.value })}
                >
                  {["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Units Required
                </label>
                <input
                  type="number"
                  className="form-input-reference"
                  value={reqForm.units}
                  onChange={(e) => setReqForm({ ...reqForm, units: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Hospital & Location Address
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. City Civil Hospital, Blood Bank Dept, 3rd Floor"
                value={reqForm.hospital}
                onChange={(e) => setReqForm({ ...reqForm, hospital: e.target.value })}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Contact Person Name
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  placeholder="Dr. S. K. Roy"
                  value={reqForm.contactPerson}
                  onChange={(e) => setReqForm({ ...reqForm, contactPerson: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Emergency Phone Number
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  placeholder="+91 98989 12345"
                  value={reqForm.contactNumber}
                  onChange={(e) => setReqForm({ ...reqForm, contactNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-pill-solid" style={{ padding: "1rem" }}>
              BROADCAST URGENT BLOOD REQUEST
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
