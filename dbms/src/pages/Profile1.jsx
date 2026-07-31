import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

export default function Profile1() {
  const [user, setUser] = useState(null);
  const [guided, setGuided] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;
    axios.get(`/api/user?email=${email}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));

    axios.get(`/api/under-guidance?email=${email}`)
      .then(res => setGuided(res.data || []))
      .catch(() => {});
  }, [email]);

  if (!user) return <div className="container" style={{ paddingTop: "4rem", textAlign: "center" }}><div className="spinner"></div></div>;

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="container slide-up" style={{ maxWidth: "800px", paddingTop: "2rem" }}>
      {/* Avatar Card */}
      <div className="glass-card" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div className="avatar avatar-lg" style={{ margin: "0 auto 1rem" }}>
          {user.profile_pic_path
            ? <img src={`/uploads/${user.profile_pic_path.replace("uploads/", "")}`} alt="" />
            : initial}
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Prof. {user.name}</h2>
        <p style={{ color: "#a0a0b0" }}>{user.email}</p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "0.5rem" }}>
          <span className="badge" style={{ background: "rgba(76,175,80,0.15)", color: "#4caf50" }}>Faculty</span>
          <span className="badge" style={{ background: "rgba(255,101,132,0.15)", color: "#ff6584" }}>{user.department}</span>
        </div>
      </div>

      {/* Details */}
      <div className="glass-card" style={{ marginBottom: "1.5rem" }}>
        <h3 className="page-title" style={{ fontSize: "1.2rem", marginBottom: "1.2rem" }}>Profile Details</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <InfoRow label="🏫 Department" value={user.department} />
          <InfoRow label="🎯 Research" value={
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
              {(user.interests || []).length > 0
                ? (user.interests || []).map((s, i) => <span key={i} className="tag tag-pink">{s}</span>)
                : <span style={{ color: "#666" }}>Not set</span>}
            </div>
          } />
          <InfoRow label="🛠 Skills" value={
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
              {(user.skills || []).length > 0
                ? (user.skills || []).map((s, i) => <span key={i} className="tag">{s}</span>)
                : <span style={{ color: "#666" }}>Not set</span>}
            </div>
          } />
          <InfoRow label="✉️ Contact" value={<a href={`mailto:${user.email}`} style={{ color: "#6c63ff" }}>{user.email}</a>} />
        </div>
      </div>

      {/* Under Guidance */}
      <div className="glass-card">
        <h3 className="page-title" style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>🎯 Students Under Guidance ({guided.length})</h3>
        {guided.length === 0 ? (
          <div className="empty-state" style={{ padding: "1.5rem" }}>
            <p>No students under your guidance yet</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {guided.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid #1a1a2e" }}>
                <div className="avatar" style={{ width: "40px", height: "40px", fontSize: "0.9rem" }}>{(s.name || "?").charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600 }}>{s.name}</p>
                  <p style={{ color: "#a0a0b0", fontSize: "0.8rem" }}>{s.email}</p>
                </div>
                {s.project && <span className="tag">{s.project}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <span style={{ color: "#a0a0b0", fontSize: "0.85rem", minWidth: "130px", flexShrink: 0 }}>{label}</span>
      <div style={{ fontWeight: 500 }}>{value || "—"}</div>
    </div>
  );
}
