import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Briefcase, Building, CheckCircle, ExternalLink, FileText, Code, Check } from "lucide-react";

export const Placement = () => {
  const { placements } = useApp();
  const [subTab, setSubTab] = useState("drives"); // drives, repository, resume
  const [appliedList, setAppliedList] = useState([]);

  const handleApply = (id) => {
    if (appliedList.includes(id)) return;
    setAppliedList([...appliedList, id]);
  };

  const sampleQuestions = [
    { category: "Data Structures", title: "Topological Sort & Cycle Detection in Directed Graphs", diff: "Hard", company: "Google, Microsoft" },
    { category: "System Design", title: "Design a High-Throughput URL Shortener like Bit.ly", diff: "Medium", company: "Atlassian, Amazon" },
    { category: "Operating Systems", title: "Virtual Memory Paging & LRU Cache Eviction Policy", diff: "Medium", company: "Qualcomm, NVIDIA" },
    { category: "DBMS", title: "ACID Transactions vs Eventual Consistency in NoSQL", diff: "Easy", company: "Oracle, Walmart" }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">CAREER DEVELOPMENT CELL</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          PLACEMENT PREPARATION
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Campus recruitment schedule, CTC compensation benchmarks, company technical rounds, and interview prep.
        </p>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "drives" ? "active" : ""}`} onClick={() => setSubTab("drives")}>
          🏢 ACTIVE RECRUITMENT DRIVES ({placements.length})
        </button>
        <button className={`subnav-tab ${subTab === "repository" ? "active" : ""}`} onClick={() => setSubTab("repository")}>
          💡 INTERVIEW QUESTION BANK
        </button>
        <button className={`subnav-tab ${subTab === "resume" ? "active" : ""}`} onClick={() => setSubTab("resume")}>
          📄 RESUME CHECKLIST
        </button>
      </div>

      {/* Drives Tab */}
      {subTab === "drives" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
          {placements.map((p) => {
            const hasApplied = appliedList.includes(p.id);

            return (
              <div key={p.id} className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img
                        src={p.logo}
                        alt={p.company}
                        style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover" }}
                      />
                      <div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff" }}>
                          {p.company}
                        </h3>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{p.role}</span>
                      </div>
                    </div>
                    <span className="badge badge-green" style={{ fontSize: "0.9rem" }}>{p.ctc}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem", background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "10px" }}>
                    <span>🎓 <strong>Eligibility:</strong> {p.eligibility}</span>
                    <span>⏳ <strong>Deadline:</strong> {p.deadline}</span>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      RECRUITMENT STAGES
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {p.rounds.map((r, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#ffffff" }}>
                          <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: "50%", width: "18px", height: "18px", fontSize: "0.65rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {i+1}
                          </span>
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className={hasApplied ? "btn-pill-outline" : "btn-pill-solid"}
                  style={{ width: "100%" }}
                  onClick={() => handleApply(p.id)}
                >
                  {hasApplied ? "APPLICATION SUBMITTED ✅" : "APPLY TO DRIVE"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Question Bank Tab */}
      {subTab === "repository" && (
        <div className="glass-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>
            SENIOR INTERVIEW REPOSITORY & FREQUENT QUESTIONS
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sampleQuestions.map((q, idx) => (
              <div
                key={idx}
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
                    <span className="badge badge-blue">{q.category}</span>
                    <span className={`badge ${q.diff === "Hard" ? "badge-rose" : "badge-amber"}`}>{q.diff}</span>
                  </div>
                  <h4 style={{ color: "#ffffff", fontSize: "1.1rem" }}>{q.title}</h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                    Asked in recent drives: {q.company}
                  </div>
                </div>

                <button className="btn-pill-outline" style={{ fontSize: "0.75rem" }}>
                  PRACTICE SOLUTION
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resume Checklist Tab */}
      {subTab === "resume" && (
        <div className="glass-card" style={{ maxWidth: "700px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: "1.5rem" }}>
            ATS RESUME COMPLIANCE CHECKLIST
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              "Quantified Project Results (e.g. Improved latency by 35%)",
              "Single-page PDF layout with clean sans-serif typography",
              "Link to active GitHub repository with live deployed web apps",
              "Verified College CGPA & Departmental Roll Number",
              "Core Computer Science coursework listed (OS, DBMS, Networks, Data Structures)"
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(16, 185, 129, 0.08)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                <Check size={18} color="#34d399" />
                <span style={{ color: "#ffffff", fontSize: "0.9rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
