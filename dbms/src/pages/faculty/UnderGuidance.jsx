import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UnderGuidance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;
    axios.get(`/api/under-guidance?email=${email}`)
      .then(res => setStudents(res.data || []))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <div className="container" style={{paddingTop:"4rem",textAlign:"center"}}><div className="spinner"></div></div>;

  return (
    <div className="container slide-up" style={{ maxWidth: "800px", paddingTop: "2rem" }}>
      <h1 className="page-title">🎯 Under Your Guidance</h1>
      <p style={{ color: "#a0a0b0", marginBottom: "2rem" }}>Students you are currently mentoring</p>

      {students.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-icon">🧑‍🏫</div>
          <p>No students under your guidance yet</p>
          <a href="/faculty/requests" className="btn-primary" style={{ marginTop: "1rem", display: "inline-flex" }}>
            📨 Check Requests
          </a>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {students.map((student, idx) => (
            <div key={idx} className="glass-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="avatar">{(student.name || "?").charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 700 }}>{student.name}</h3>
                <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{student.email}</p>
                {student.project && (
                  <p style={{ color: "#6c63ff", fontSize: "0.85rem", marginTop: "0.2rem" }}>📝 {student.project}</p>
                )}
              </div>
              <a href={`mailto:${student.email}`} className="btn-outline" style={{ fontSize: "0.8rem" }}>✉️ Email</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
