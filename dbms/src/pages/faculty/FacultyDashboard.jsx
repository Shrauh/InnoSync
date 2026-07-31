import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FacultyDashboard() {
  const [stats, setStats] = useState({ students: 0, requests: 0, guided: 0 });
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("userName") || "Professor";

  useEffect(() => {
    if (!email) return;
    // Fetch mentorship requests count
    axios.get(`/api/mentorship-requests?email=${email}`)
      .then(res => setStats(s => ({ ...s, requests: (res.data || []).length })))
      .catch(() => {});
    // Fetch guided students count
    axios.get(`/api/under-guidance?email=${email}`)
      .then(res => setStats(s => ({ ...s, guided: (res.data || []).length })))
      .catch(() => {});
    // Fetch total students
    axios.get('/api/students')
      .then(res => setStats(s => ({ ...s, students: (res.data || []).length })))
      .catch(() => {});
  }, [email]);

  return (
    <div className="container slide-up" style={{ paddingTop: "2rem" }}>
      <h1 className="page-title">📊 Faculty Dashboard</h1>
      <p style={{ color: "#a0a0b0", marginBottom: "2rem", fontSize: "1.1rem" }}>
        Welcome back, <strong style={{ color: "#e0e0e0" }}>{name}</strong>
      </p>

      <div className="grid-3" style={{ marginBottom: "2.5rem" }}>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "#6c63ff" }}>🎓</div>
          <div className="stat-value">{stats.students}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "#ff6584" }}>📨</div>
          <div className="stat-value">{stats.requests}</div>
          <div className="stat-label">Pending Requests</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "#4caf50" }}>🧑‍🏫</div>
          <div className="stat-value">{stats.guided}</div>
          <div className="stat-label">Under Guidance</div>
        </div>
      </div>

      <div className="glass-card" style={{ textAlign: "center", padding: "2.5rem" }}>
        <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem" }}>
          <a href="/faculty/requests" className="btn-primary">📨 View Requests</a>
          <a href="/faculty/directory" className="btn-outline">📋 Student Directory</a>
          <a href="/faculty/guidance" className="btn-outline">🎯 Under Guidance</a>
        </div>
      </div>
    </div>
  );
}
