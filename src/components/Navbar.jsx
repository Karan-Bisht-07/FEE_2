import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  GraduationCap,
  Bell,
  User,
  Shield,
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart3,
  Briefcase,
  Home,
  AlertCircle,
  HeartHandshake,
  MessageSquare,
  Newspaper,
  ChevronDown,
  X,
  LogOut,
  ShoppingBag,
  Sparkles,
  LayoutDashboard,
  FolderGit2
} from "lucide-react";

export const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    role,
    toggleRole,
    user,
    notifications,
    markNotificationRead,
    cartTotals,
    setIsCartOpen
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
    setShowMoreMenu(false);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div
          className="logo-brand"
          style={{ cursor: "pointer" }}
          onClick={() => handleNavClick("home")}
        >
          <GraduationCap size={30} color="#ffffff" />
          <span>CAMPUSHUB</span>
          <span className="logo-badge">V2.6</span>
        </div>

        {/* Desktop Links */}
        <div className="nav-links">
          <button
            className={`nav-link-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => handleNavClick("home")}
          >
            HOME
          </button>
          <button
            className={`nav-link-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => handleNavClick("dashboard")}
            style={{ color: "#38bdf8", fontWeight: 700 }}
          >
            DASHBOARD
          </button>
          <button
            className={`nav-link-item ${activeTab === "store" ? "active" : ""}`}
            onClick={() => handleNavClick("store")}
            style={{ color: "#facc15", fontWeight: 700 }}
          >
            STORE
          </button>
          <button
            className={`nav-link-item ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => handleNavClick("portfolio")}
            style={{ color: "#c084fc", fontWeight: 700 }}
          >
            PORTFOLIO
          </button>
          <button
            className={`nav-link-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => handleNavClick("profile")}
          >
            PROFILE
          </button>
          <button
            className={`nav-link-item ${activeTab === "tasks" ? "active" : ""}`}
            onClick={() => handleNavClick("tasks")}
          >
            TASKS
          </button>
          <button
            className={`nav-link-item ${activeTab === "events" ? "active" : ""}`}
            onClick={() => handleNavClick("events")}
          >
            EVENTS
          </button>
          <button
            className={`nav-link-item ${activeTab === "attendance" ? "active" : ""}`}
            onClick={() => handleNavClick("attendance")}
          >
            ATTENDANCE
          </button>
          <button
            className={`nav-link-item ${activeTab === "placement" ? "active" : ""}`}
            onClick={() => handleNavClick("placement")}
          >
            PLACEMENT
          </button>
          <button
            className={`nav-link-item ${activeTab === "hostel" ? "active" : ""}`}
            onClick={() => handleNavClick("hostel")}
          >
            HOSTEL
          </button>

          {/* More Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              className={`nav-link-item ${["lostfound", "blood", "feedback", "blog"].includes(activeTab) ? "active" : ""}`}
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
            >
              SERVICES <ChevronDown size={14} />
            </button>

            {showMoreMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "0.75rem",
                  width: "220px",
                  background: "#14181f",
                  border: "1px solid var(--border-hover)",
                  borderRadius: "12px",
                  padding: "0.5rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                  zIndex: 200
                }}
              >
                <button
                  className="nav-link-item"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem"
                  }}
                  onClick={() => handleNavClick("lostfound")}
                >
                  <AlertCircle size={16} /> Lost & Found
                </button>
                <button
                  className="nav-link-item"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem"
                  }}
                  onClick={() => handleNavClick("blood")}
                >
                  <HeartHandshake size={16} /> Blood Donation
                </button>
                <button
                  className="nav-link-item"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem"
                  }}
                  onClick={() => handleNavClick("feedback")}
                >
                  <MessageSquare size={16} /> Student Feedback
                </button>
                <button
                  className="nav-link-item"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem"
                  }}
                  onClick={() => handleNavClick("blog")}
                >
                  <Newspaper size={16} /> Student Blog
                </button>
              </div>
            )}
          </div>

          {/* Admin Panel link */}
          <button
            className={`nav-link-item ${activeTab === "admin" ? "active" : ""}`}
            style={{ color: "#38bdf8" }}
            onClick={() => handleNavClick("admin")}
          >
            ADMIN PANEL
          </button>
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Role Switcher Pill */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "9999px",
              padding: "0.2rem 0.3rem",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem"
            }}
          >
            <button
              style={{
                background: role === "student" ? "#ffffff" : "transparent",
                color: role === "student" ? "#000000" : "var(--text-muted)",
                border: "none",
                borderRadius: "9999px",
                padding: "0.25rem 0.65rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "uppercase"
              }}
              onClick={() => toggleRole("student")}
            >
              STUDENT
            </button>
            <button
              style={{
                background: role === "admin" ? "#38bdf8" : "transparent",
                color: role === "admin" ? "#000000" : "var(--text-muted)",
                border: "none",
                borderRadius: "9999px",
                padding: "0.25rem 0.65rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "uppercase"
              }}
              onClick={() => toggleRole("admin")}
            >
              ADMIN
            </button>
          </div>

          {/* Cart Drawer Trigger Button */}
          <div style={{ position: "relative" }}>
            <button
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                position: "relative"
              }}
              onClick={() => setIsCartOpen(true)}
              title="Open Campus Cart"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartTotals.count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    background: "#38bdf8",
                    color: "#000000",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {cartTotals.count}
                </span>
              )}
            </button>
          </div>

          {/* Notification Button */}
          <div style={{ position: "relative" }}>
            <button
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                position: "relative"
              }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    background: "#f43f5e",
                    color: "#ffffff",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  width: "320px",
                  background: "#14181f",
                  border: "1px solid var(--border-hover)",
                  borderRadius: "14px",
                  padding: "1.25rem",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
                  zIndex: 250
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    paddingBottom: "0.5rem"
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase" }}>
                    Notifications ({notifications.length})
                  </span>
                  <X
                    size={16}
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowNotifications(false)}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "280px", overflowY: "auto" }}>
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      style={{
                        background: n.read ? "rgba(255,255,255,0.02)" : "rgba(59,130,246,0.1)",
                        border: n.read ? "1px solid transparent" : "1px solid rgba(59,130,246,0.3)",
                        borderRadius: "8px",
                        padding: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => markNotificationRead(n.id)}
                    >
                      <div style={{ fontWeight: 700, fontSize: "0.85rem", color: n.read ? "var(--text-muted)" : "#ffffff" }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                        {n.message}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.4rem" }}>
                        {n.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Login / Profile CTA matching screenshot pill button */}
          <button
            className="btn-pill-solid"
            onClick={() => handleNavClick("profile")}
          >
            <User size={15} />
            {user.name.split(" ")[0].toUpperCase()}
          </button>
        </div>
      </div>
    </nav>
  );
};
