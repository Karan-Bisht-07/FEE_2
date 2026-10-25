import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { BarChart3, Calculator, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export const Attendance = () => {
  const { attendance, setAttendance } = useApp();
  const [subTab, setSubTab] = useState("overview"); // overview, logs, calculator

  // Calculator State
  const [calcSubject, setCalcSubject] = useState(attendance[0]?.subject || "");
  const [conductedInput, setConductedInput] = useState(36);
  const [attendedInput, setAttendedInput] = useState(31);
  const [futureMissInput, setFutureMissInput] = useState(3);
  const [futureAttendInput, setFutureAttendInput] = useState(5);

  const totalConducted = attendance.reduce((acc, curr) => acc + curr.conducted, 0);
  const totalAttended = attendance.reduce((acc, curr) => acc + curr.attended, 0);
  const overallPercentage = ((totalAttended / totalConducted) * 100).toFixed(1);

  // Calc metrics
  const projectedTotal = conductedInput + futureMissInput + futureAttendInput;
  const projectedAttended = attendedInput + futureAttendInput;
  const projectedPct = projectedTotal > 0 ? ((projectedAttended / projectedTotal) * 100).toFixed(1) : 0;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">ACADEMIC AUDIT</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          ATTENDANCE TRACKER
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Monitor course attendance, verify the 75% mandatory threshold, and simulate bunk margins.
        </p>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "overview" ? "active" : ""}`} onClick={() => setSubTab("overview")}>
          📊 OVERVIEW & SUMMARY
        </button>
        <button className={`subnav-tab ${subTab === "logs" ? "active" : ""}`} onClick={() => setSubTab("logs")}>
          📋 SUBJECT LOGS ({attendance.length})
        </button>
        <button className={`subnav-tab ${subTab === "calculator" ? "active" : ""}`} onClick={() => setSubTab("calculator")}>
          🧮 BUNK & MARGIN CALCULATOR
        </button>
      </div>

      {/* Overview Tab */}
      {subTab === "overview" && (
        <>
          {/* Overall Health Gauge Header Card */}
          <div
            className="glass-card"
            style={{
              background: parseFloat(overallPercentage) >= 75 ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)",
              border: parseFloat(overallPercentage) >= 75 ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(244, 63, 94, 0.3)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div>
              <span className={`badge ${parseFloat(overallPercentage) >= 75 ? "badge-green" : "badge-rose"}`}>
                {parseFloat(overallPercentage) >= 75 ? "SAFE ELIGIBILITY STATUS" : "ATTENDANCE WARNING"}
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "#ffffff", marginTop: "0.4rem" }}>
                OVERALL ATTENDANCE: {overallPercentage}%
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Total Conducted Lectures: {totalConducted} | Attended: {totalAttended} | Minimum Required: 75.0%
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", color: parseFloat(overallPercentage) >= 75 ? "#34d399" : "#f87171", lineHeight: 1 }}>
                {overallPercentage}%
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase" }}>SEMESTER AVERAGE</span>
            </div>
          </div>

          {/* Subject-wise Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {attendance.map((sub, idx) => {
              const pct = parseFloat(((sub.attended / sub.conducted) * 100).toFixed(1));
              const isSafe = pct >= 75;

              return (
                <div key={idx} className="glass-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span className="badge badge-blue">{sub.code}</span>
                    <span className={`badge ${isSafe ? "badge-green" : "badge-rose"}`}>{pct}%</span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#ffffff", marginBottom: "0.2rem" }}>
                    {sub.subject}
                  </h3>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    👨‍🏫 Faculty: {sub.faculty}
                  </div>

                  {/* Progress Bar */}
                  <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "9999px", height: "8px", overflow: "hidden", marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: isSafe ? "#10b981" : "#f43f5e",
                        transition: "width 0.4s ease"
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-dim)" }}>
                    <span>Attended: {sub.attended} / {sub.conducted}</span>
                    <span>{isSafe ? "✅ Threshold Met" : "⚠️ Needs + classes"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Logs Table Tab */}
      {subTab === "logs" && (
        <div className="glass-card" style={{ overflowX: "auto" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>
            DETAILED COURSE ATTENDANCE AUDIT LOG
          </h3>

          <table style={{ width: "100%", borderCollapse: "collapse", color: "#ffffff", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>
                <th style={{ padding: "0.75rem" }}>Course Code</th>
                <th style={{ padding: "0.75rem" }}>Subject Name</th>
                <th style={{ padding: "0.75rem" }}>Faculty</th>
                <th style={{ padding: "0.75rem" }}>Conducted</th>
                <th style={{ padding: "0.75rem" }}>Attended</th>
                <th style={{ padding: "0.75rem" }}>Percentage</th>
                <th style={{ padding: "0.75rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((sub, idx) => {
                const pct = parseFloat(((sub.attended / sub.conducted) * 100).toFixed(1));
                return (
                  <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "0.9rem 0.75rem", fontFamily: "monospace", color: "#38bdf8" }}>{sub.code}</td>
                    <td style={{ padding: "0.9rem 0.75rem", fontWeight: 600 }}>{sub.subject}</td>
                    <td style={{ padding: "0.9rem 0.75rem", color: "var(--text-muted)" }}>{sub.faculty}</td>
                    <td style={{ padding: "0.9rem 0.75rem" }}>{sub.conducted}</td>
                    <td style={{ padding: "0.9rem 0.75rem" }}>{sub.attended}</td>
                    <td style={{ padding: "0.9rem 0.75rem", fontWeight: 700, color: pct >= 75 ? "#34d399" : "#f87171" }}>
                      {pct}%
                    </td>
                    <td style={{ padding: "0.9rem 0.75rem" }}>
                      <span className={`badge ${pct >= 75 ? "badge-green" : "badge-rose"}`} style={{ fontSize: "0.65rem" }}>
                        {pct >= 75 ? "ELIGIBLE" : "SHORTAGE"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Bunk Calculator Tab */}
      {subTab === "calculator" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          <div className="glass-card-reference">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
              BUNK & MARGIN SIMULATOR
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Current Conducted Classes
                </label>
                <input
                  type="number"
                  className="form-input-reference"
                  value={conductedInput}
                  onChange={(e) => setConductedInput(parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Current Attended Classes
                </label>
                <input
                  type="number"
                  className="form-input-reference"
                  value={attendedInput}
                  onChange={(e) => setAttendedInput(parseInt(e.target.value) || 0)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                    Future Classes to Attend
                  </label>
                  <input
                    type="number"
                    className="form-input-reference"
                    value={futureAttendInput}
                    onChange={(e) => setFutureAttendInput(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                    Future Classes to Miss (Bunk)
                  </label>
                  <input
                    type="number"
                    className="form-input-reference"
                    value={futureMissInput}
                    onChange={(e) => setFutureMissInput(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <Calculator size={48} color="#3b82f6" style={{ margin: "0 auto 1rem" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              PROJECTED ATTENDANCE
            </span>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "4.5rem", color: parseFloat(projectedPct) >= 75 ? "#34d399" : "#f87171", lineHeight: 1, margin: "0.5rem 0" }}>
              {projectedPct}%
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWdth: "340px", margin: "0 auto" }}>
              {parseFloat(projectedPct) >= 75
                ? "🎉 Safe! Your projected attendance remains above the mandatory 75% threshold."
                : "⚠️ Danger! Missing these classes will bring your attendance below 75%."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
