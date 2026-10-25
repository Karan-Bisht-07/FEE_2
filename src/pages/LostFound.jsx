import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { AlertCircle, Plus, Search, CheckCircle, PhoneCall, X } from "lucide-react";

export const LostFound = () => {
  const { lostFound, addLostFound, updateLostFoundStatus } = useApp();
  const [subTab, setSubTab] = useState("directory"); // directory, report
  const [typeFilter, setTypeFilter] = useState("All"); // All, Lost, Found
  const [selectedClaim, setSelectedClaim] = useState(null);

  const [newItem, setNewItem] = useState({
    type: "Lost",
    title: "",
    category: "Electronics",
    location: "",
    contact: "",
    description: "",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400"
  });

  const filteredItems = lostFound.filter(i => {
    if (typeFilter === "All") return true;
    return i.type === typeFilter;
  });

  const handleReport = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.location) return;
    addLostFound(newItem);
    setNewItem({
      type: "Lost",
      title: "",
      category: "Electronics",
      location: "",
      contact: "",
      description: "",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400"
    });
    setSubTab("directory");
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-tag">CAMPUS COMMUNITY</div>
        <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          LOST & FOUND DIRECTORY
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Report misplaced belongings, verify lost student ID cards, calculators, headphones and claim found items.
        </p>
      </div>

      {/* Subnav */}
      <div className="subnav-bar">
        <button className={`subnav-tab ${subTab === "directory" ? "active" : ""}`} onClick={() => setSubTab("directory")}>
          🔍 ITEM DIRECTORY ({lostFound.length})
        </button>
        <button className={`subnav-tab ${subTab === "report" ? "active" : ""}`} onClick={() => setSubTab("report")}>
          📢 REPORT LOST / FOUND ITEM
        </button>
      </div>

      {/* Directory View */}
      {subTab === "directory" && (
        <>
          {/* Type Filter Chips */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {["All", "Lost", "Found"].map(t => (
              <button
                key={t}
                style={{
                  background: typeFilter === t ? "#ffffff" : "rgba(255,255,255,0.05)",
                  color: typeFilter === t ? "#000000" : "var(--text-muted)",
                  border: "1px solid var(--border-subtle)",
                  padding: "0.4rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
                onClick={() => setTypeFilter(t)}
              >
                {t.toUpperCase()} ITEMS
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {filteredItems.map(item => (
              <div key={item.id} className="glass-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ position: "relative", height: "160px" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span className={`badge ${item.type === "Lost" ? "badge-rose" : "badge-green"}`} style={{ position: "absolute", top: "12px", right: "12px" }}>
                      {item.type.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <span style={{ fontSize: "0.7rem", color: "#38bdf8", fontFamily: "monospace" }}>{item.id}</span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#ffffff", margin: "0.2rem 0 0.5rem" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.4 }}>
                      {item.description}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.8rem", color: "var(--text-dim)" }}>
                      <span>📍 Found/Lost at: <strong style={{ color: "#ffffff" }}>{item.location}</strong></span>
                      <span>📅 Date: {item.date}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={`badge ${item.status === "Claimed" ? "badge-green" : "badge-amber"}`} style={{ fontSize: "0.65rem" }}>
                    STATUS: {item.status.toUpperCase()}
                  </span>

                  {item.status !== "Claimed" && (
                    <button
                      className="btn-pill-solid"
                      style={{ padding: "0.4rem 1rem", fontSize: "0.75rem" }}
                      onClick={() => setSelectedClaim(item)}
                    >
                      CLAIM ITEM
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Report View */}
      {subTab === "report" && (
        <div className="glass-card-reference" style={{ maxWidth: "700px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            REPORT LOST OR FOUND ITEM
          </h3>

          <form onSubmit={handleReport} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Report Type
                </label>
                <select
                  className="form-input-reference"
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                >
                  <option value="Lost">I Lost Something</option>
                  <option value="Found">I Found Something</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Category
                </label>
                <select
                  className="form-input-reference"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <option value="Electronics">Electronics (Headphones, Laptops)</option>
                  <option value="Personal Items">Personal Items (Wallets, Keys)</option>
                  <option value="Stationery">Stationery & Calculators</option>
                  <option value="Clothing & Accessories">Clothing & Bags</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Item Name / Model
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Sony WH-1000XM4 Noise Cancelling Headphones"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Campus Location (Where lost or found)
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Central Library 2nd Floor Reading Room Desk 14"
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Contact Details / Desk Location
              </label>
              <input
                type="text"
                className="form-input-reference"
                placeholder="e.g. Call Rohan: +91 98765 43210 or Library Desk"
                value={newItem.contact}
                onChange={(e) => setNewItem({ ...newItem, contact: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                Item Description & Unique Identification Marks
              </label>
              <textarea
                className="form-input-reference"
                rows={3}
                placeholder="Mention scratches, stickers, serial code details..."
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-pill-solid" style={{ padding: "1rem" }}>
              PUBLISH TO CAMPUS DIRECTORY
            </button>
          </form>
        </div>
      )}

      {/* Claim Modal */}
      {selectedClaim && (
        <div className="modal-overlay" onClick={() => setSelectedClaim(null)}>
          <div className="modal-content" style={{ maxWidth: "480px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span className="badge badge-blue">CLAIM VERIFICATION</span>
              <X size={20} style={{ cursor: "pointer" }} onClick={() => setSelectedClaim(null)} />
            </div>

            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff" }}>
              {selectedClaim.title}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: "0.5rem 0 1.25rem" }}>
              {selectedClaim.description}
            </p>

            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase" }}>CONTACT & RETRIEVAL POINT</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", marginTop: "0.2rem" }}>
                📞 {selectedClaim.contact}
              </div>
            </div>

            <button
              className="btn-pill-solid"
              style={{ width: "100%" }}
              onClick={() => {
                updateLostFoundStatus(selectedClaim.id, "Claimed");
                setSelectedClaim(null);
              }}
            >
              MARK ITEM AS CLAIMED & RESOLVED ✅
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
