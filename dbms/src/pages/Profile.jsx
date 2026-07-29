import { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetch(`/api/user?email=${email}`)
        .then(res => res.json())
        .then(data => {
          data.skills = Array.isArray(data.skills) ? data.skills : [data.skills].filter(Boolean);
          data.interests = Array.isArray(data.interests) ? data.interests : [data.interests].filter(Boolean);
          setUser(data);
        })
        .catch(err => console.error("Failed to fetch user:", err));
    }
  }, []);

  if (!user) return <div className="container" style={{ paddingTop: "4rem", textAlign: "center" }}><div className="spinner"></div></div>;

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="container slide-up" style={{ maxWidth: "800px", paddingTop: "2rem" }}>
      {/* Avatar Card */}
      <div className="glass-card" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div className="avatar avatar-lg" style={{ margin: "0 auto 1rem" }}>
          {user.profile_pic_path
            ? <img src={`/uploads/${user.profile_pic_path.replace("uploads/","")}`} alt="" />
            : initial}
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{user.name}</h2>
        <p style={{ color: "#a0a0b0" }}>{user.email}</p>
        <span className="badge" style={{ marginTop: "0.5rem" }}>{user.role}</span>
      </div>

      {/* Details Card */}
      <div className="glass-card">
        <h3 className="page-title" style={{ fontSize: "1.2rem", marginBottom: "1.2rem" }}>Profile Details</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <InfoRow label="🏫 Department" value={user.department} />
          <InfoRow label="🛠 Skills" value={
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
              {(user.skills || []).map((s, i) => <span key={i} className="tag">{s}</span>)}
              {(!user.skills || user.skills.length === 0) && <span style={{color:"#666"}}>Not set</span>}
            </div>
          } />
          <InfoRow label="🎯 Interests" value={
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
              {(user.interests || []).map((s, i) => <span key={i} className="tag tag-pink">{s}</span>)}
              {(!user.interests || user.interests.length === 0) && <span style={{color:"#666"}}>Not set</span>}
            </div>
          } />
          {user.mentor && <InfoRow label="👨‍🏫 Mentor" value={typeof user.mentor === 'object' ? user.mentor.name : user.mentor} />}
          {user.linkedin && <InfoRow label="🔗 LinkedIn" value={
            <a href={user.linkedin} target="_blank" rel="noreferrer" style={{ color: "#6c63ff" }}>{user.linkedin}</a>
          } />}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <span style={{ color: "#a0a0b0", fontSize: "0.85rem", minWidth: "120px" }}>{label}</span>
      <div style={{ fontWeight: 500 }}>{value || "—"}</div>
    </div>
  );
}
