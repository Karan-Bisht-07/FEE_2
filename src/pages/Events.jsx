import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Calendar, MapPin, Users, Ticket, Plus, CheckCircle, QrCode, X } from "lucide-react";

export const Events = () => {
  const { events, toggleEventRegistration, addEvent } = useApp();
  const [subTab, setSubTab] = useState("explore"); // explore, mypasses, add
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedPass, setSelectedPass] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Technical",
    date: "",
    time: "",
    venue: "",
    organizer: "",
    description: "",
    totalSeats: 200,
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
  });

  const categories = ["All", "Technical", "Cultural", "Sports", "Workshops"];

  const filteredEvents = events.filter(e => {
    if (categoryFilter === "All") return true;
    return e.category === categoryFilter;
  });

  const registeredEvents = events.filter(e => e.registered);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.venue) return;
    addEvent(newEvent);
    setNewEvent({
      title: "",
      category: "Technical",
      date: "",
      time: "",
      venue: "",
      organizer: "",
      description: "",
      totalSeats: 200,
      banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
    });
    setSubTab("explore");
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">CAMPUS HAPPENINGS</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          COLLEGE EVENTS
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Discover upcoming tech symposiums, cultural nights, sports tournaments, and hands-on workshops.
        </p>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "explore" ? "active" : ""}`} onClick={() => setSubTab("explore")}>
          🎉 EXPLORE ALL EVENTS
        </button>
        <button className={`subnav-tab ${subTab === "mypasses" ? "active" : ""}`} onClick={() => setSubTab("mypasses")}>
          🎟️ MY EVENT PASSES ({registeredEvents.length})
        </button>
        <button className={`subnav-tab ${subTab === "add" ? "active" : ""}`} onClick={() => setSubTab("add")}>
          ➕ HOST / CREATE EVENT
        </button>
      </div>

      {/* Explore View */}
      {subTab === "explore" && (
        <>
          {/* Category Chips */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {categories.map(cat => (
              <button
                key={cat}
                style={{
                  background: categoryFilter === cat ? "#ffffff" : "rgba(255,255,255,0.05)",
                  color: categoryFilter === cat ? "#000000" : "var(--text-muted)",
                  border: "1px solid var(--border-subtle)",
                  padding: "0.4rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
            {filteredEvents.map(evt => (
              <div key={evt.id} className="glass-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ position: "relative", height: "180px" }}>
                    <img
                      src={evt.banner}
                      alt={evt.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span className="badge badge-blue" style={{ position: "absolute", top: "12px", right: "12px" }}>
                      {evt.category}
                    </span>
                  </div>

                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#ffffff", marginBottom: "0.5rem" }}>
                      {evt.title}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                      {evt.description}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-dim)" }}>
                      <span>📅 <strong>{evt.date}</strong> at {evt.time}</span>
                      <span>📍 {evt.venue}</span>
                      <span>🎓 Organized by: {evt.organizer}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "1rem 1.5rem 1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: evt.seatsLeft < 10 ? "#f87171" : "#34d399", fontWeight: 700 }}>
                    🔥 {evt.seatsLeft} SEATS REMAINING
                  </span>

                  <button
                    className={evt.registered ? "btn-pill-outline" : "btn-pill-solid"}
                    style={{ padding: "0.5rem 1.2rem", fontSize: "0.75rem" }}
                    onClick={() => toggleEventRegistration(evt.id)}
                  >
                    {evt.registered ? "CANCEL RSVP" : "REGISTER NOW"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* My Passes View */}
      {subTab === "mypasses" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {registeredEvents.length === 0 ? (
            <div className="glass-card" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
              <Ticket size={48} color="var(--text-dim)" style={{ marginBottom: "1rem" }} />
              <h3>No Registered Events Yet</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Explore events tab to register and generate your digital entry pass.</p>
            </div>
          ) : (
            registeredEvents.map(evt => (
              <div key={evt.id} className="glass-card">
                <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>CONFIRMED ENTRY PASS</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff", margin: "0.5rem 0" }}>
                  {evt.title}
                </h3>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  📅 {evt.date} | 📍 {evt.venue}
                </div>

                <button
                  className="btn-pill-solid"
                  style={{ width: "100%" }}
                  onClick={() => setSelectedPass(evt)}
                >
                  SHOW DIGITAL QR PASS <QrCode size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Event View */}
      {subTab === "add" && (
        <div className="glass-card-reference" style={{ maxWidth: "750px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            SUBMIT COLLEGE EVENT PROPOSAL
          </h3>

          <form onSubmit={handleCreateEvent} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Event Title
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Robo Wars & Drone Racing Competition"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
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
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                >
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Workshops">Workshops</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Total Capacity Seats
                </label>
                <input
                  type="number"
                  className="form-input-reference"
                  value={newEvent.totalSeats}
                  onChange={(e) => setNewEvent({ ...newEvent, totalSeats: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Event Date
                </label>
                <input
                  type="date"
                  className="form-input-reference"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Time & Duration
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  placeholder="e.g. 10:00 AM - 04:00 PM"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Campus Venue
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  placeholder="e.g. Main Auditorium Ground"
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Organizing Student Body / Dept
                </label>
                <input
                  type="text"
                  className="form-input-reference"
                  placeholder="e.g. Robotics Club & Mechanical Society"
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Event Description & Schedule
              </label>
              <textarea
                className="form-input-reference"
                rows={4}
                placeholder="Details regarding rules, prizes, and chief guests..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-pill-solid" style={{ padding: "1rem" }}>
              SUBMIT PROPOSAL FOR APPROVAL
            </button>
          </form>
        </div>
      )}

      {/* QR Pass Modal */}
      {selectedPass && (
        <div className="modal-overlay" onClick={() => setSelectedPass(null)}>
          <div className="modal-content" style={{ textAlign: "center", maxWidth: "420px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span className="badge badge-green">OFFICIAL ENTRY PASS</span>
              <X size={20} style={{ cursor: "pointer" }} onClick={() => setSelectedPass(null)} />
            </div>

            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff" }}>
              {selectedPass.title}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "0.5rem 0 1.5rem" }}>
              📍 {selectedPass.venue} | 📅 {selectedPass.date}
            </p>

            <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "16px", display: "inline-block", margin: "0 auto 1.5rem" }}>
              <QrCode size={180} color="#000000" />
            </div>

            <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "monospace" }}>
              PASS CODE: CH-PASS-{selectedPass.id}-88912
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
