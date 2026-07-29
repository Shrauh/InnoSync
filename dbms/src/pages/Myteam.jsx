import { useState, useEffect } from 'react';
import axios from 'axios';
import './MyTeam.css';

const Myteam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;
    axios.get(`/api/my-team?email=${email}`)
      .then(res => setTeam(res.data || []))
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <div className="container" style={{paddingTop:"4rem",textAlign:"center"}}><div className="spinner"></div></div>;

  return (
    <div className="container slide-up" style={{ maxWidth: "800px", paddingTop: "2rem" }}>
      <h1 className="page-title">👥 My Team</h1>
      <p style={{ color: "#a0a0b0", marginBottom: "2rem" }}>
        People you've connected with through collaboration requests
      </p>

      {team.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-icon">👥</div>
          <p>No team members yet. Start by sending collaboration requests!</p>
          <a href="/smart-match" className="btn-primary" style={{ marginTop: "1rem", display: "inline-flex" }}>
            🧠 Find Matches
          </a>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {team.map((member, idx) => (
            <div key={idx} className="glass-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="avatar">
                {member.profile_pic_path
                  ? <img src={`/uploads/${member.profile_pic_path.replace("uploads/","")}`} alt="" />
                  : (member.name?.charAt(0) || "?")}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 700 }}>{member.name}</h3>
                <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{member.department || member.email}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.3rem" }}>
                  {(member.skills || []).slice(0, 4).map((s, i) => (
                    <span key={i} className="tag">{s}</span>
                  ))}
                </div>
              </div>
              {member.email && (
                <a href={`mailto:${member.email}`} className="btn-outline" style={{ fontSize: "0.8rem" }}>
                  ✉️ Email
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myteam;
