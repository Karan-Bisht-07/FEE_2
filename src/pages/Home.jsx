import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  User,
  CheckSquare,
  Calendar,
  BarChart3,
  Briefcase,
  AlertCircle,
  HeartHandshake,
  MessageSquare,
  Newspaper,
  Shield,
  ArrowRight,
  Plus,
  X,
  Send,
  Sparkles,
  ShoppingBag
} from "lucide-react";

export const Home = () => {
  const { setActiveTab, faqs, events, placements, addFeedback } = useApp();
  const [openFaq, setOpenFaq] = useState("faq-1");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    addFeedback({
      category: "General Inquiry",
      subject: `Inquiry from ${contactForm.name}`,
      rating: 5,
      comments: contactForm.message,
      isAnonymous: false
    });
    setSubmittedMessage(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const modulesList = [
    { id: "dashboard", title: "ANALYTICS DASHBOARD", desc: "GPA Progression, KPI Cards & Attendance", icon: BarChart3, badge: "EVAL 2" },
    { id: "store", title: "CAMPUS STORE & CART", desc: "Order Books, Tech & Stationery with Cart", icon: ShoppingBag, badge: "EVAL 2" },
    { id: "portfolio", title: "STUDENT PORTFOLIO", desc: "Engineering Showcase, Skills & Certs", icon: Briefcase, badge: "EVAL 2" },
    { id: "profile", title: "STUDENT PROFILE", desc: "Digital ID, CGPA & Academic Badges", icon: User, badge: "VERIFIED" },
    { id: "tasks", title: "TASK PLANNER", desc: "Deadlines, Assignments & Kanban", icon: CheckSquare, badge: "ORGANIZER" },
    { id: "events", title: "COLLEGE EVENTS", desc: "Tech Fests, Workshops & QR Passes", icon: Calendar, badge: "RSVP LIVE" },
    { id: "attendance", title: "ATTENDANCE TRACKER", desc: "Subject Breakdown & Bunk Calculator", icon: BarChart3, badge: "75% RULE" },
    { id: "placement", title: "PLACEMENT PREP", desc: "Drive Schedule, Salary CTC & Q&A", icon: Briefcase, badge: "CAREER" },
    { id: "hostel", title: "HOSTEL HELP DESK", desc: "Electrical, Plumbing & Wi-Fi Tickets", icon: Shield, badge: "24/7 DISPATCH" },
    { id: "lostfound", title: "LOST & FOUND", desc: "Campus Directory & Claim Verification", icon: AlertCircle, badge: "DIRECTORY" },
    { id: "blood", title: "BLOOD DONATION", desc: "Donor Search & Emergency Requests", icon: HeartHandshake, badge: "SAVING LIVES" },
    { id: "feedback", title: "STUDENT FEEDBACK", desc: "Faculty Ratings & Grievance Desk", icon: MessageSquare, badge: "ANONYMOUS" },
    { id: "blog", title: "STUDENT BLOG", desc: "Tech Roadmaps, Life & Articles", icon: Newspaper, badge: "CAMPUS VOICE" }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section matching Screenshot 1 & 5 */}
      <section style={{ textAlign: "center", padding: "4rem 1rem 3rem" }}>
        <div className="section-tag" style={{ justifyContent: "center" }}>
          <Sparkles size={14} color="#3b82f6" /> ALL-IN-ONE CAMPUS ECOSYSTEM
        </div>
        
        <h1 className="title-giant" style={{ margin: "0.5rem 0" }}>
          CAMPUSHUB
        </h1>
        <h1 className="stroke-text title-giant">
          PORTAL SYSTEM
        </h1>

        <p style={{ maxWdth: "700px", margin: "1.5rem auto", color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.6 }}>
          Digitizing student services, academic tracking, placement preparation, maintenance dispatch, and campus events into one seamless, modern portal.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <button className="btn-pill-solid" onClick={() => setActiveTab("dashboard")}>
            ACADEMIC DASHBOARD <ArrowRight size={16} />
          </button>
          <button className="btn-pill-solid" style={{ background: "#facc15", color: "#000" }} onClick={() => setActiveTab("store")}>
            CAMPUS STORE & CART
          </button>
          <button className="btn-pill-outline" onClick={() => setActiveTab("portfolio")}>
            STUDENT PORTFOLIO
          </button>
          <button className="btn-pill-outline" onClick={() => setActiveTab("admin")}>
            ADMIN CONTROL PANEL
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section style={{ marginTop: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
          <div>
            <div className="section-tag">CORE SERVICES</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", textTransform: "uppercase" }}>
              CAMPUS MODULES
            </h2>
          </div>
          <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>13 ACTIVE MODULES</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {modulesList.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="glass-card"
                style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                onClick={() => setActiveTab(m.id)}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Icon size={22} color="#ffffff" />
                    </div>
                    <span className="badge badge-blue">{m.badge}</span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.03em", color: "#ffffff", marginBottom: "0.4rem" }}>
                    {m.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {m.desc}
                  </p>
                </div>

                <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem", color: "#ffffff", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Launch Module <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Ticker & Highlights */}
      <section style={{ marginTop: "4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {/* Upcoming Event Highlight */}
          <div className="glass-card">
            <div className="section-tag">FEATURED EVENT</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>
              {events[0]?.title}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {events[0]?.description}
            </p>
            <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#ffffff", marginBottom: "1.25rem" }}>
              <span>📅 {events[0]?.date}</span>
              <span>📍 {events[0]?.venue}</span>
            </div>
            <button className="btn-pill-solid" style={{ width: "100%" }} onClick={() => setActiveTab("events")}>
              RSVP FOR EVENT
            </button>
          </div>

          {/* Top Placement Drive */}
          <div className="glass-card">
            <div className="section-tag">TOP RECRUITER DRIVE</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>
              {placements[0]?.company} - {placements[0]?.role}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
              CTC Offer: <strong style={{ color: "#34d399" }}>{placements[0]?.ctc}</strong> | Deadline: {placements[0]?.deadline}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {placements[0]?.rounds.map((r, i) => (
                <span key={i} className="badge badge-amber" style={{ fontSize: "0.7rem" }}>
                  Round {i+1}: {r}
                </span>
              ))}
            </div>
            <button className="btn-pill-outline" style={{ width: "100%" }} onClick={() => setActiveTab("placement")}>
              VIEW PLACEMENT DETAILS
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion matching Reference Screenshot 4 & 6 */}
      <section style={{ marginTop: "5rem" }}>
        <div className="section-tag">HELP CENTRE</div>
        <h2 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: "2rem" }}>
          FREQUENTLY ASKED
        </h2>

        <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="faq-row">
                <div className="faq-header" onClick={() => setOpenFaq(isOpen ? null : faq.id)}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", color: "#3b82f6", display: "block", marginBottom: "0.2rem" }}>
                      {faq.category}
                    </span>
                    <h3 className="faq-question">{faq.question}</h3>
                  </div>
                  <button className="faq-toggle-btn">
                    {isOpen ? <X size={18} /> : <Plus size={18} />}
                  </button>
                </div>
                {isOpen && <p className="faq-answer">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form matching Reference Screenshot 1 & 7 ("GET IN TOUCH") */}
      <section style={{ marginTop: "5rem" }}>
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <h2 className="title-giant" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            GET IN TOUCH
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
            Have a question, feedback or urgent technical request for CampusHub admins? Send us a message below.
          </p>

          <div className="glass-card-reference" style={{ textAlign: "left" }}>
            {submittedMessage ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>MESSAGE RECEIVED!</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  Thank you for reaching out. Your message has been logged in CampusHub feedback database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <input
                    type="text"
                    className="form-input-reference"
                    placeholder="Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="form-input-reference"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <textarea
                    className="form-input-reference"
                    rows={4}
                    placeholder="Message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>
                <button type="submit" className="btn-pill-solid" style={{ width: "100%", padding: "1rem" }}>
                  SEND MESSAGE <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
