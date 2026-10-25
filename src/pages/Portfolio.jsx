import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { INITIAL_PORTFOLIO } from "../data/initialData";
import {
  Code,
  Briefcase,
  Layers,
  Award,
  Mail,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Send,
  Terminal,
  Cpu,
  Globe,
  Database
} from "lucide-react";

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Portfolio = () => {
  const { user, setActiveTab } = useApp();
  const portfolio = INITIAL_PORTFOLIO;

  // Local state for sub-routing (Unit 43-48: Sub-route simulation inside SPA)
  const [activeSubTab, setActiveSubTab] = useState("projects"); // "projects" | "skills" | "certs" | "contact"

  const [contactState, setContactState] = useState({ name: "", email: "", message: "" });
  const [sentNotice, setSentNotice] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactState.name || !contactState.email || !contactState.message) return;
    setSentNotice(true);
    setContactState({ name: "", email: "", message: "" });
    setTimeout(() => setSentNotice(false), 4500);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
      {/* Pedagogical Header Banner for Viva Evaluation */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15))",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          borderRadius: "14px",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="badge-status badge-active" style={{ fontSize: "0.7rem", background: "rgba(168, 85, 247, 0.2)", color: "#c084fc", borderColor: "rgba(168, 85, 247, 0.4)" }}>
              UNIT 43–48 MINI-PROJECT
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Multi-Page SPA Architecture & Client-Side Sub-Routing
            </span>
          </div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0.3rem 0 0", color: "#ffffff" }}>
            Student Engineering Portfolio
          </h2>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn-pill-solid"
            onClick={() => setActiveTab("dashboard")}
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.9rem" }}
          >
            OPEN KPI DASHBOARD
          </button>
        </div>
      </div>

      {/* Hero Profile Overview Card */}
      <div
        className="module-card"
        style={{
          padding: "2rem",
          borderRadius: "16px",
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center"
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #38bdf8",
              boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)"
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "4px",
              right: "4px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#10b981",
              border: "3px solid #0d1117"
            }}
            title="Available for Internship"
          />
        </div>

        <div style={{ flex: 1, minWidth: "260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>
              {user.name}
            </h1>
            <span className="badge-status badge-verified" style={{ fontSize: "0.75rem" }}>
              CGPA {user.cgpa}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              {user.year} • {user.department}
            </span>
          </div>

          <p style={{ fontSize: "0.95rem", color: "#38bdf8", fontWeight: 600, margin: "0 0 0.6rem" }}>
            {portfolio.about.headline}
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 1rem", lineHeight: 1.5, maxWidth: "680px" }}>
            {portfolio.about.bio}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            <a
              href={portfolio.about.socials.github}
              target="_blank"
              rel="noreferrer"
              className="btn-pill-outline"
              style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem", textDecoration: "none" }}
            >
              <GithubIcon size={14} /> GitHub
            </a>
            <a
              href={portfolio.about.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-pill-outline"
              style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem", textDecoration: "none" }}
            >
              <LinkedinIcon size={14} /> LinkedIn
            </a>
            <button
              onClick={() => setActiveSubTab("contact")}
              className="btn-pill-solid"
              style={{ padding: "0.35rem 0.85rem", fontSize: "0.75rem" }}
            >
              <Mail size={14} /> Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs (SPA Sub-Routing - Units 43-48) */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: "2rem",
          overflowX: "auto",
          paddingBottom: "0.5rem"
        }}
      >
        <button
          onClick={() => setActiveSubTab("projects")}
          style={{
            background: activeSubTab === "projects" ? "rgba(56, 189, 248, 0.15)" : "transparent",
            color: activeSubTab === "projects" ? "#38bdf8" : "var(--text-muted)",
            border: activeSubTab === "projects" ? "1px solid #38bdf8" : "1px solid transparent",
            borderRadius: "8px",
            padding: "0.6rem 1.25rem",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "var(--transition-fast)"
          }}
        >
          <Code size={16} /> Featured Projects ({portfolio.projects.length})
        </button>

        <button
          onClick={() => setActiveSubTab("skills")}
          style={{
            background: activeSubTab === "skills" ? "rgba(56, 189, 248, 0.15)" : "transparent",
            color: activeSubTab === "skills" ? "#38bdf8" : "var(--text-muted)",
            border: activeSubTab === "skills" ? "1px solid #38bdf8" : "1px solid transparent",
            borderRadius: "8px",
            padding: "0.6rem 1.25rem",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "var(--transition-fast)"
          }}
        >
          <Layers size={16} /> Technical Skills ({portfolio.skills.length})
        </button>

        <button
          onClick={() => setActiveSubTab("certs")}
          style={{
            background: activeSubTab === "certs" ? "rgba(56, 189, 248, 0.15)" : "transparent",
            color: activeSubTab === "certs" ? "#38bdf8" : "var(--text-muted)",
            border: activeSubTab === "certs" ? "1px solid #38bdf8" : "1px solid transparent",
            borderRadius: "8px",
            padding: "0.6rem 1.25rem",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "var(--transition-fast)"
          }}
        >
          <Award size={16} /> Certifications ({portfolio.certifications.length})
        </button>

        <button
          onClick={() => setActiveSubTab("contact")}
          style={{
            background: activeSubTab === "contact" ? "rgba(56, 189, 248, 0.15)" : "transparent",
            color: activeSubTab === "contact" ? "#38bdf8" : "var(--text-muted)",
            border: activeSubTab === "contact" ? "1px solid #38bdf8" : "1px solid transparent",
            borderRadius: "8px",
            padding: "0.6rem 1.25rem",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "var(--transition-fast)"
          }}
        >
          <Mail size={16} /> Get In Touch
        </button>
      </div>

      {/* Sub-Route Views */}
      {activeSubTab === "projects" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {portfolio.projects.map(proj => (
            <div
              key={proj.id}
              className="module-card card-interactive"
              style={{
                padding: "1.5rem",
                borderRadius: "14px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "#38bdf8", fontWeight: 700, textTransform: "uppercase" }}>
                    {proj.category}
                  </span>
                  <span className="badge-status badge-info" style={{ fontSize: "0.65rem" }}>
                    {proj.metrics}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.5rem" }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 1rem" }}>
                  {proj.desc}
                </p>

                {/* Tech Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                  {proj.tech.map(t => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-subtle)",
                        color: "#ffffff"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.9rem", borderTop: "1px solid var(--border-subtle)" }}>
                {proj.demo === "home" ? (
                  <button
                    onClick={() => setActiveTab("home")}
                    className="btn-pill-solid"
                    style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", flex: 1, display: "flex", justifyContent: "center", gap: "0.3rem" }}
                  >
                    <ExternalLink size={13} /> Open App
                  </button>
                ) : (
                  <a
                    href={proj.demo}
                    className="btn-pill-solid"
                    style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", flex: 1, textDecoration: "none", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.3rem" }}
                  >
                    <ExternalLink size={13} /> Live Preview
                  </a>
                )}
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill-outline"
                  style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", flex: 1, textDecoration: "none", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.3rem" }}
                >
                  <GithubIcon size={13} /> Source
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === "skills" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {portfolio.skills.map((skill, index) => (
            <div
              key={index}
              className="module-card"
              style={{
                padding: "1.25rem",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.2rem" }}>
                  {skill.name}
                </h4>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  {skill.category}
                </span>
              </div>
              <span className="badge-status badge-verified" style={{ fontSize: "0.7rem" }}>
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === "certs" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {portfolio.certifications.map((cert, index) => (
            <div
              key={index}
              className="module-card"
              style={{
                padding: "1.5rem",
                borderRadius: "14px",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start"
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(56, 189, 248, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#38bdf8",
                  flexShrink: 0
                }}
              >
                <Award size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.3rem" }}>
                  {cert.title}
                </h4>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                  {cert.issuer}
                </div>
                <span className="badge-status badge-info" style={{ fontSize: "0.65rem" }}>
                  Issued {cert.year} • Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === "contact" && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="module-card" style={{ padding: "2rem", borderRadius: "16px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#ffffff" }}>
              Get in Touch with {user.name}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
              Interested in collaborating on research, hackathons, or hiring for software engineering internships? Send a direct message below.
            </p>

            {sentNotice && (
              <div
                style={{
                  background: "rgba(74, 222, 128, 0.15)",
                  border: "1px solid rgba(74, 222, 128, 0.3)",
                  borderRadius: "8px",
                  padding: "0.85rem",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#4ade80",
                  fontSize: "0.85rem"
                }}
              >
                <CheckCircle2 size={16} /> Thank you! Your message has been sent to {user.email}.
              </div>
            )}

            <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                  YOUR FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. A. Sharma / Tech Recruiter"
                  value={contactState.name}
                  onChange={(e) => setContactState({ ...contactState, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.85rem"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={contactState.email}
                  onChange={(e) => setContactState({ ...contactState, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.85rem"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                  MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details about the project, role, or question..."
                  value={contactState.message}
                  onChange={(e) => setContactState({ ...contactState, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.85rem",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-pill-solid"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}
              >
                <Send size={15} /> SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
