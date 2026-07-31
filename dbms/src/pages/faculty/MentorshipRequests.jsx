import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MentorshipRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;
    axios.get(`/api/mentorship-requests?email=${email}`)
      .then(res => setRequests(res.data || []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, [email]);

  const handleRespond = async (studentEmail, status) => {
    try {
      await axios.post("/api/respond-mentorship", {
        faculty_email: email,
        student_email: studentEmail,
        status,
      });
      alert(`Request ${status}!`);
      setRequests(requests.filter(r => r.email !== studentEmail));
    } catch {
      alert("Failed to respond");
    }
  };

  if (loading) return <div className="container" style={{paddingTop:"4rem",textAlign:"center"}}><div className="spinner"></div></div>;

  return (
    <div className="container slide-up" style={{ maxWidth: "800px", paddingTop: "2rem" }}>
      <h1 className="page-title">📨 Mentorship Requests</h1>

      {requests.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-icon">📨</div>
          <p>No pending mentorship requests</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {requests.map((student, idx) => (
            <div key={idx} className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="avatar">{(student.name || "?").charAt(0)}</div>
                <div>
                  <h3 style={{ fontWeight: 700 }}>{student.name}</h3>
                  <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{student.email}</p>
                  {student.interests && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.3rem" }}>
                      {(Array.isArray(student.interests) ? student.interests : [student.interests]).map((i, idx) => (
                        <span key={idx} className="tag">{i}</span>
                      ))}
                    </div>
                  )}
                  {student.project && <p style={{ color: "#a0a0b0", fontSize: "0.8rem", marginTop: "0.3rem" }}>📝 {student.project}</p>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn-success" onClick={() => handleRespond(student.email, "accepted")}>✓ Accept</button>
                <button className="btn-danger" onClick={() => handleRespond(student.email, "rejected")}>✕ Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
