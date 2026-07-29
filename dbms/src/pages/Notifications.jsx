import { useState, useEffect } from "react";
import axios from "axios";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;
    axios.get(`/api/notifications?email=${email}`)
      .then(res => setNotifications(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [email]);

  const handleResponse = async (senderEmail, status) => {
    try {
      await axios.post("/api/respond-request", {
        sender_email: senderEmail,
        receiver_email: email,
        status,
      });
      alert(`Request ${status}!`);
      setNotifications(notifications.filter(n => n.sender_email !== senderEmail));
    } catch {
      alert("Failed to respond");
    }
  };

  if (loading) return <div className="container" style={{paddingTop:"4rem",textAlign:"center"}}><div className="spinner"></div></div>;

  return (
    <div className="container slide-up" style={{ maxWidth: "800px", paddingTop: "2rem" }}>
      <h1 className="page-title">🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-icon">🔔</div>
          <p>No pending requests</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {notifications.map((n, idx) => (
            <div key={idx} className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="avatar">{(n.sender_name || n.sender_email || "?").charAt(0)}</div>
                <div>
                  <p style={{ fontWeight: 600 }}>{n.sender_name || n.sender_email}</p>
                  <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>wants to collaborate</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn-success" onClick={() => handleResponse(n.sender_email, "accepted")}>✓ Accept</button>
                <button className="btn-danger" onClick={() => handleResponse(n.sender_email, "rejected")}>✕ Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
