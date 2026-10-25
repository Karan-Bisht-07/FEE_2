import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MessageSquare, Star, Send, ShieldCheck, UserX } from "lucide-react";

export const Feedback = () => {
  const { feedback, addFeedback } = useApp();
  const [subTab, setSubTab] = useState("submit"); // submit, trends

  const [fdbForm, setFdbForm] = useState({
    category: "Infrastructure & Labs",
    subject: "",
    rating: 5,
    comments: "",
    isAnonymous: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fdbForm.subject || !fdbForm.comments) return;
    addFeedback(fdbForm);
    setSubmitted(true);
    setFdbForm({
      category: "Infrastructure & Labs",
      subject: "",
      rating: 5,
      comments: "",
      isAnonymous: false
    });
    setTimeout(() => {
      setSubmitted(false);
      setSubTab("trends");
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">VOICE & GOVERNANCE</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          STUDENT FEEDBACK PORTAL
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Submit anonymous course ratings, canteen quality reviews, library facilities feedback, and track resolution.
        </p>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "submit" ? "active" : ""}`} onClick={() => setSubTab("submit")}>
          ✍️ SUBMIT FEEDBACK & GRIEVANCE
        </button>
        <button className={`subnav-tab ${subTab === "trends" ? "active" : ""}`} onClick={() => setSubTab("trends")}>
          💬 PUBLIC TRENDS & RESPONSES ({feedback.length})
        </button>
      </div>

      {/* Submit Tab */}
      {subTab === "submit" && (
        <div className="glass-card-reference" style={{ maxWidth: "680px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            SHARE YOUR FEEDBACK
          </h3>

          {submitted && (
            <div style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", padding: "1rem", borderRadius: "8px", marginBottom: "1.25rem" }}>
              ✅ Thank you! Feedback recorded into CampusHub governance desk.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Feedback Category
                </label>
                <select
                  className="form-input-reference"
                  value={fdbForm.category}
                  onChange={(e) => setFdbForm({ ...fdbForm, category: e.target.value })}
                >
                  <option value="Infrastructure & Labs">Infrastructure & Labs</option>
                  <option value="Canteen & Food">Canteen & Food Quality</option>
                  <option value="Faculty & Curriculum">Faculty & Curriculum</option>
                  <option value="Wi-Fi & Digital Portal">Wi-Fi & Digital Portal</option>
                  <option value="Hostel & Sanitation">Hostel & Sanitation</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Star Rating (1 to 5)
                </label>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", paddingTop: "0.4rem" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      color={star <= fdbForm.rating ? "#f59e0b" : "rgba(255,255,255,0.2)"}
                      fill={star <= fdbForm.rating ? "#f59e0b" : "transparent"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setFdbForm({ ...fdbForm, rating: star })}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Subject / Topic Header
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Air Conditioning in Lab 3 or Night Canteen Menu"
                value={fdbForm.subject}
                onChange={(e) => setFdbForm({ ...fdbForm, subject: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Detailed Suggestions / Grievance
              </label>
              <textarea
                className="form-input-reference"
                rows={4}
                placeholder="Provide constructive feedback for administration review..."
                value={fdbForm.comments}
                onChange={(e) => setFdbForm({ ...fdbForm, comments: e.target.value })}
                required
              />
            </div>

            {/* Anonymous Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.03)", padding: "0.85rem", borderRadius: "8px" }}>
              <input
                type="checkbox"
                id="anon"
                checked={fdbForm.isAnonymous}
                onChange={(e) => setFdbForm({ ...fdbForm, isAnonymous: e.target.checked })}
                style={{ width: "18px", height: "18px", accentColor: "#ffffff" }}
              />
              <label htmlFor="anon" style={{ color: "#ffffff", fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <UserX size={16} /> Submit Anonymously (Hide my student profile name & roll no)
              </label>
            </div>

            <button type="submit" className="btn-pill-solid" style={{ padding: "1rem" }}>
              SUBMIT FEEDBACK TO DEAN DESK
            </button>
          </form>
        </div>
      )}

      {/* Trends Tab */}
      {subTab === "trends" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {feedback.map(f => (
            <div key={f.id} className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="badge badge-blue">{f.category}</span>
                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    {[...Array(f.rating)].map((_, i) => (
                      <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />
                    ))}
                  </div>
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#ffffff", marginBottom: "0.4rem" }}>
                  {f.subject}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                  "{f.comments}"
                </p>

                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "1rem" }}>
                  Submitted by: <strong style={{ color: f.isAnonymous ? "#f87171" : "#ffffff" }}>{f.author}</strong> | {f.date}
                </div>
              </div>

              {f.adminResponse && (
                <div style={{ background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "0.85rem", borderRadius: "8px", marginTop: "0.5rem" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#60a5fa", textTransform: "uppercase" }}>
                    🏛️ ADMIN DEAN RESPONSE:
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#ffffff", marginTop: "0.2rem" }}>
                    {f.adminResponse}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
