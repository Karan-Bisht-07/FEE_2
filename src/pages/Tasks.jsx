import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { CheckSquare, Plus, Trash2, Clock, Calendar, CheckCircle2 } from "lucide-react";

export const Tasks = () => {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useApp();
  const [filter, setFilter] = useState("All"); // All, Pending, In Progress, Completed
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    dueDate: "",
    priority: "Medium",
    notes: ""
  });

  const filteredTasks = tasks.filter(t => {
    if (filter === "All") return true;
    return t.status === filter;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate) return;
    addTask(newTask);
    setNewTask({ title: "", subject: "", dueDate: "", priority: "Medium", notes: "" });
    setShowAddForm(false);
  };

  const getPriorityBadge = (p) => {
    if (p === "High") return <span className="badge badge-rose">HIGH PRIORITY</span>;
    if (p === "Medium") return <span className="badge badge-amber">MEDIUM</span>;
    return <span className="badge badge-blue">LOW</span>;
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <div className="section-tag">ACADEMIC PLANNER</div>
          <h1 className="title-giant" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            TASK MANAGEMENT
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Track assignment deadlines, lab report submissions, project milestones, and placement goals.
          </p>
        </div>

        <button className="btn-pill-solid" onClick={() => setShowAddForm(true)}>
          <Plus size={16} /> NEW ACADEMIC TASK
        </button>
      </div>

      {/* Filter Subnav */}
      <div className="subnav-bar">
        {["All", "Pending", "In Progress", "Completed"].map((st) => (
          <button
            key={st}
            className={`subnav-tab ${filter === st ? "active" : ""}`}
            onClick={() => setFilter(st)}
          >
            {st.toUpperCase()} ({tasks.filter(t => st === "All" ? true : t.status === st).length})
          </button>
        ))}
      </div>

      {/* Task List Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {filteredTasks.map((t) => (
          <div key={t.id} className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>{t.subject}</span>
                {getPriorityBadge(t.priority)}
              </div>

              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#ffffff", marginBottom: "0.5rem" }}>
                {t.title}
              </h3>

              {t.notes && (
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {t.notes}
                </p>
              )}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-dim)", marginBottom: "1rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem" }}>
                <Calendar size={14} /> Due Date: <strong style={{ color: "#ffffff" }}>{t.dueDate}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Status Switcher Buttons */}
                <div style={{ display: "flex", gap: "0.3rem" }}>
                  <button
                    style={{
                      padding: "0.3rem 0.6rem",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      background: t.status === "Pending" ? "#f59e0b" : "rgba(255,255,255,0.05)",
                      color: t.status === "Pending" ? "#000000" : "var(--text-muted)",
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={() => updateTaskStatus(t.id, "Pending")}
                  >
                    PENDING
                  </button>
                  <button
                    style={{
                      padding: "0.3rem 0.6rem",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      background: t.status === "In Progress" ? "#3b82f6" : "rgba(255,255,255,0.05)",
                      color: t.status === "In Progress" ? "#ffffff" : "var(--text-muted)",
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={() => updateTaskStatus(t.id, "In Progress")}
                  >
                    IN PROGRESS
                  </button>
                  <button
                    style={{
                      padding: "0.3rem 0.6rem",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      background: t.status === "Completed" ? "#10b981" : "rgba(255,255,255,0.05)",
                      color: t.status === "Completed" ? "#000000" : "var(--text-muted)",
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={() => updateTaskStatus(t.id, "Completed")}
                  >
                    DONE
                  </button>
                </div>

                <button
                  style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "0.2rem" }}
                  onClick={() => deleteTask(t.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
              CREATE ACADEMIC TASK
            </h3>

            <form onSubmit={handleCreateTask} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Task Title
                </label>
                <input
                  type="text"
                  className="form-input-dark"
                  placeholder="e.g. Submit Microprocessors Lab Report #3"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                    Subject / Course
                  </label>
                  <input
                    type="text"
                    className="form-input-dark"
                    placeholder="e.g. Distributed Systems"
                    value={newTask.subject}
                    onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-input-dark"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Priority Level
                </label>
                <select
                  className="form-input-dark"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Notes / Instructions
                </label>
                <textarea
                  className="form-input-dark"
                  rows={3}
                  placeholder="Additional problem set details or submission links..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="submit" className="btn-pill-solid" style={{ flex: 1 }}>
                  SAVE TASK
                </button>
                <button type="button" className="btn-pill-outline" onClick={() => setShowAddForm(false)}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
