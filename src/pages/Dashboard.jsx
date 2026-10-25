import React from "react";
import { useApp } from "../context/AppContext";
import { INITIAL_DASHBOARD_METRICS } from "../data/initialData";
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  ShoppingBag,
  Briefcase,
  ChevronRight,
  BookOpen,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export const Dashboard = () => {
  const { user, attendance, tasks, cartTotals, setActiveTab } = useApp();

  const metrics = INITIAL_DASHBOARD_METRICS;

  // Derive dynamic tasks count from actual global tasks state if available
  const completedTasksCount = tasks.filter(t => t.status === "Done" || t.status === "Completed").length;
  const totalTasksCount = tasks.length;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
      {/* Pedagogical Header Banner for Viva Evaluation */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))",
          border: "1px solid rgba(16, 185, 129, 0.3)",
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
            <span className="badge-status badge-active" style={{ fontSize: "0.7rem" }}>
              UNIT 49–54 MINI-PROJECT
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Centralized Analytics Dashboard & State Composition
            </span>
          </div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0.3rem 0 0", color: "#ffffff" }}>
            Academic Performance & Campus KPI Dashboard
          </h2>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn-pill-solid"
            onClick={() => setActiveTab("portfolio")}
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.9rem" }}
          >
            VIEW PORTFOLIO <ArrowUpRight size={13} />
          </button>
          <button
            className="btn-pill-outline"
            onClick={() => setActiveTab("store")}
            style={{ fontSize: "0.75rem", padding: "0.4rem 0.9rem" }}
          >
            CAMPUS STORE <ShoppingBag size={13} />
          </button>
        </div>
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem"
        }}
      >
        {/* KPI 1: CGPA */}
        <div className="module-card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
              Cumulative CGPA
            </span>
            <div style={{ padding: "0.35rem", borderRadius: "8px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
              <Award size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
            {user.cgpa || metrics.kpis.cgpa}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#4ade80", marginTop: "0.5rem" }}>
            <TrendingUp size={13} /> Top 5% in CSE Department
          </div>
        </div>

        {/* KPI 2: Overall Attendance */}
        <div className="module-card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
              Attendance Compliance
            </span>
            <div style={{ padding: "0.35rem", borderRadius: "8px", background: "rgba(74, 222, 128, 0.15)", color: "#4ade80" }}>
              <BarChart3 size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
            {metrics.kpis.attendanceOverall}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#4ade80", marginTop: "0.5rem" }}>
            <CheckCircle size={13} /> Above 75% Regulatory Cutoff
          </div>
        </div>

        {/* KPI 3: Tasks Completed */}
        <div className="module-card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
              Tasks Completed
            </span>
            <div style={{ padding: "0.35rem", borderRadius: "8px", background: "rgba(168, 85, 247, 0.15)", color: "#a855f7" }}>
              <CheckCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
            {completedTasksCount} / {totalTasksCount}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            <Clock size={13} /> {Math.round((completedTasksCount / (totalTasksCount || 1)) * 100)}% completion rate
          </div>
        </div>

        {/* KPI 4: Campus Store Credits */}
        <div className="module-card" style={{ padding: "1.25rem", borderRadius: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
              Smart ID Card Balance
            </span>
            <div style={{ padding: "0.35rem", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
              <CreditCard size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
            {metrics.kpis.campusStoreCredits}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#38bdf8", marginTop: "0.5rem", cursor: "pointer" }} onClick={() => setActiveTab("store")}>
            Cart Active: {cartTotals.count} items <ChevronRight size={13} />
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        
        {/* Left: Semester GPA Progression Chart */}
        <div className="module-card" style={{ padding: "1.5rem", borderRadius: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                Semester SGPA Trajectory
              </h3>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Calculated across 5 completed academic terms
              </span>
            </div>
            <span className="badge-status badge-verified" style={{ fontSize: "0.7rem" }}>
              AUTONOMOUS CGPA: 8.92
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              height: "220px",
              paddingTop: "2rem",
              borderBottom: "1px solid var(--border-subtle)"
            }}
          >
            {metrics.gpaHistory.map((item, index) => {
              // Scale GPA out of 10 to a percentage height
              const heightPct = (item.gpa / 10) * 100;
              return (
                <div
                  key={item.sem}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    height: "100%",
                    justifyContent: "flex-end"
                  }}
                >
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#38bdf8" }}>
                    {item.gpa}
                  </span>
                  <div
                    style={{
                      width: "36px",
                      height: `${heightPct}%`,
                      background: index === 2 ? "linear-gradient(180deg, #38bdf8, #3b82f6)" : "rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px 6px 0 0",
                      transition: "height 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease"
                    }}
                    title={`${item.sem}: ${item.gpa} SGPA`}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#38bdf8")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = index === 2 ? "linear-gradient(180deg, #38bdf8, #3b82f6)" : "rgba(255, 255, 255, 0.12)")}
                  />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                    {item.sem}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <span>Min: 8.75 (Sem 1)</span>
            <span>Peak: 9.12 (Sem 3)</span>
          </div>
        </div>

        {/* Right: Subject-wise Attendance Breakdown */}
        <div className="module-card" style={{ padding: "1.5rem", borderRadius: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                Course Attendance Breakdown
              </h3>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Threshold: 75% mandatory exam compliance
              </span>
            </div>
            <button
              onClick={() => setActiveTab("attendance")}
              style={{ background: "transparent", border: "none", color: "#38bdf8", fontSize: "0.75rem", cursor: "pointer", fontWeight: 600 }}
            >
              Full Details →
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {metrics.attendanceTrajectory.map(course => {
              const isSafe = course.pct >= 75;
              return (
                <div key={course.code}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <div>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#ffffff" }}>
                        {course.name}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginLeft: "0.4rem" }}>
                        ({course.code})
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {course.attended}/{course.total} hrs
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: isSafe ? "#4ade80" : "#f43f5e"
                        }}
                      >
                        {course.pct}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${course.pct}%`,
                        background: isSafe ? "#10b981" : "#f43f5e",
                        borderRadius: "3px",
                        transition: "width 0.5s ease"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity Feed & Module Jump Links */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        
        {/* Recent Activity Timeline */}
        <div className="module-card" style={{ padding: "1.5rem", borderRadius: "14px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 1rem", color: "#ffffff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Clock size={16} color="#38bdf8" /> Real-Time Campus Activity
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {metrics.recentActivities.map((act, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.9rem",
                  alignItems: "flex-start",
                  borderLeft: "2px solid rgba(56, 189, 248, 0.3)",
                  paddingLeft: "0.9rem"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>
                      {act.title}
                    </h4>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{act.time}</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Hub Navigation Cards */}
        <div className="module-card" style={{ padding: "1.5rem", borderRadius: "14px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 1rem", color: "#ffffff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={16} color="#facc15" /> Evaluation Modules Quick Access
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div
              className="card-interactive"
              onClick={() => setActiveTab("store")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 1rem",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-subtle)",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <ShoppingBag size={18} color="#38bdf8" />
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>Campus Store & Cart</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Shopping Cart Mini-Project (Units 49–54)</div>
                </div>
              </div>
              <ChevronRight size={16} color="var(--text-dim)" />
            </div>

            <div
              className="card-interactive"
              onClick={() => setActiveTab("portfolio")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 1rem",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-subtle)",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Briefcase size={18} color="#a855f7" />
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>Student Portfolio Site</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Multi-page SPA Routing Mini-Project (Units 43–48)</div>
                </div>
              </div>
              <ChevronRight size={16} color="var(--text-dim)" />
            </div>

            <div
              className="card-interactive"
              onClick={() => setActiveTab("tasks")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 1rem",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-subtle)",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <BookOpen size={18} color="#10b981" />
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>Task Planner & Kanban</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Organize assignments & deadlines</div>
                </div>
              </div>
              <ChevronRight size={16} color="var(--text-dim)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
