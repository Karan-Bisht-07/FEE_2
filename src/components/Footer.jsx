import React from "react";
import { GraduationCap, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer style={{ marginTop: "5rem", borderTop: "1px solid var(--border-subtle)", background: "#060709" }}>
      {/* Metric Stat Bar matching Reference Screenshot 3 */}
      <div className="stat-bar">
        <div className="stat-item">
          <div className="stat-number">12.5K+</div>
          <div className="stat-label">ACTIVE STUDENTS</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">98.4%</div>
          <div className="stat-label">PLACEMENT SUCCESS</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">HOSTEL & IT SUPPORT</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.9★</div>
          <div className="stat-label">CAMPUS RATING</div>
        </div>
      </div>

      {/* Giant Statement matching Reference Screenshot 2 ("LET'S CREATE") */}
      <div className="page-container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div className="section-tag">CAMPUS CONNECTIVITY PORTAL</div>
          <h2 className="title-giant">LET'S TRANSFORM</h2>
          <h2 className="stroke-text title-giant">CAMPUS LIFE</h2>
          
          <div style={{ marginTop: "2rem" }}>
            <a
              href="mailto:support@campushub.edu"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "underline",
                textUnderlineOffset: "8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              support@campushub.edu <ArrowUpRight size={32} />
            </a>
          </div>
        </div>

        {/* Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--border-subtle)"
          }}
        >
          <div>
            <div className="logo-brand" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              <GraduationCap size={24} color="#ffffff" />
              <span>CAMPUSHUB</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
              Centralized digital portal for student profile management, attendance, events, placement prep, hostel complaints, and campus emergency services.
            </p>
          </div>

          <div>
            <h4 style={{ color: "#ffffff", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              QUICK MODULES
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              <span>• Student ID & Profile</span>
              <span>• Attendance Calculator</span>
              <span>• Event Passes & RSVP</span>
              <span>• Placement Test Tracker</span>
              <span>• Hostel Maintenance Desk</span>
            </div>
          </div>

          <div>
            <h4 style={{ color: "#ffffff", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              EMERGENCY CONTACTS
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={14} /> Medical Emergency: +91 1800-425-9999
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={14} /> Hostel Warden: +91 98765 11223
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={14} /> Admin Building, Sector 4 Campus
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.75rem",
            color: "var(--text-dim)",
            textTransform: "uppercase",
            letterSpacing: "0.1em"
          }}
        >
          <div>© 2026 CAMPUSHUB PORTAL. ALL RIGHTS RESERVED.</div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ cursor: "pointer" }}>PRIVACY POLICY</span>
            <span style={{ cursor: "pointer" }}>TERMS OF SERVICE</span>
            <span style={{ cursor: "pointer" }}>ACADEMIC GUIDELINES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
