import { useEffect, useState } from "react";
import axios from "axios";

const SmartMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [trending, setTrending] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;
    
    // Fetch AI matches
    axios.get(`/api/match?email=${email}&limit=20`)
      .then(res => setMatches(res.data.matches || []))
      .catch(err => console.error("Match error:", err))
      .finally(() => setLoading(false));

    // Fetch skill recommendations
    axios.get(`/api/skill-recommendations?email=${email}`)
      .then(res => setRecommendations(res.data.recommended_skills || []))
      .catch(() => {});

    // Fetch trending interests
    axios.get("/api/trending-interests")
      .then(res => setTrending(res.data.trending || []))
      .catch(() => {});
  }, [email]);

  const getScoreColor = (score) => {
    if (score >= 70) return "#4caf50";
    if (score >= 45) return "#ff9800";
    return "#6c63ff";
  };

  const handleCollab = async (student) => {
    try {
      const userName = localStorage.getItem("userName") || "User";
      await axios.post("/api/send-collab-request", {
        sender_email: email,
        receiver_email: student.email,
        sender_name: userName,
        sender_profile_image: "",
        receiver_name: student.name,
        receiver_profile_image: student.profile_pic_path || "",
      });
      alert(`Request sent to ${student.name}!`);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to send request");
    }
  };

  if (loading) return (
    <div className="container" style={{ paddingTop: "4rem", textAlign: "center" }}>
      <div className="spinner"></div>
      <p style={{ color: "#a0a0b0", marginTop: "1rem" }}>🧠 AI is analyzing your profile...</p>
    </div>
  );

  return (
    <div className="container slide-up" style={{ paddingTop: "2rem" }}>
      <h1 className="page-title">🧠 AI Smart Match</h1>
      <p style={{ color: "#a0a0b0", marginBottom: "2rem", fontSize: "1.05rem" }}>
        Our AI analyzes interests, skills, and department to find your ideal collaborators
      </p>

      {/* Stats Row */}
      <div className="grid-3" style={{ marginBottom: "2.5rem" }}>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "#6c63ff" }}>🎯</div>
          <div className="stat-value">{matches.length}</div>
          <div className="stat-label">AI Matches Found</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "#ff6584" }}>💡</div>
          <div className="stat-value">{recommendations.length}</div>
          <div className="stat-label">Skill Suggestions</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "#4caf50" }}>🔥</div>
          <div className="stat-value">{trending.length}</div>
          <div className="stat-label">Trending Topics</div>
        </div>
      </div>

      {/* Skill Recommendations */}
      {recommendations.length > 0 && (
        <div className="glass-card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontWeight: 700, marginBottom: "1rem" }}>
            💡 AI Skill Recommendations
          </h3>
          <p style={{ color: "#a0a0b0", fontSize: "0.85rem", marginBottom: "1rem" }}>
            Based on what successful collaborators with similar interests know
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {recommendations.map((rec, i) => (
              <span key={i} className="tag" title={rec.reason} style={{ cursor: "help" }}>
                {rec.skill} ({rec.popularity})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Trending Interests */}
      {trending.length > 0 && (
        <div className="glass-card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontWeight: 700, marginBottom: "1rem" }}>🔥 Trending on Campus</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {trending.map((t, i) => (
              <span key={i} className="tag tag-pink">
                {t.interest} • {t.count} students
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Match Cards */}
      <h2 style={{ fontWeight: 700, marginBottom: "1.5rem", fontSize: "1.3rem" }}>
        🤝 Your Best Matches
      </h2>

      {matches.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-icon">🔍</div>
          <p>No matches found yet. Update your profile with interests and skills!</p>
        </div>
      ) : (
        <div className="grid-auto">
          {matches.map((match, idx) => (
            <div key={idx} className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Header: Avatar + Name + Score */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="avatar">
                  {match.profile_pic_path
                    ? <img src={`/uploads/${match.profile_pic_path.replace("uploads/", "")}`} alt="" />
                    : match.name?.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{match.name}</h3>
                  <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{match.department}</p>
                </div>
                <div
                  className="score-ring"
                  style={{
                    background: `conic-gradient(${getScoreColor(match.match_score)} ${match.match_score * 3.6}deg, #1a1a2e ${match.match_score * 3.6}deg)`,
                    color: getScoreColor(match.match_score),
                  }}
                >
                  {match.match_score}%
                </div>
              </div>

              {/* Match Level */}
              <div style={{ textAlign: "center" }}>
                <span className="badge" style={{ fontSize: "0.8rem" }}>{match.match_level}</span>
              </div>

              {/* Shared Interests */}
              {match.shared_interests?.length > 0 && (
                <div>
                  <p style={{ color: "#a0a0b0", fontSize: "0.75rem", marginBottom: "0.3rem" }}>Shared Interests</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {match.shared_interests.map((i, idx) => (
                      <span key={idx} className="tag tag-success">{i}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Complementary Skills */}
              {match.complementary_skills?.length > 0 && (
                <div>
                  <p style={{ color: "#a0a0b0", fontSize: "0.75rem", marginBottom: "0.3rem" }}>Skills They Bring</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {match.complementary_skills.map((s, idx) => (
                      <span key={idx} className="tag tag-pink">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Score Breakdown */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.78rem" }}>
                <div style={{ color: "#a0a0b0" }}>🎯 Interest: <strong style={{ color: "#e0e0e0" }}>{match.breakdown?.interest}%</strong></div>
                <div style={{ color: "#a0a0b0" }}>🛠 Skills: <strong style={{ color: "#e0e0e0" }}>{match.breakdown?.skill}%</strong></div>
                <div style={{ color: "#a0a0b0" }}>🏫 Dept: <strong style={{ color: "#e0e0e0" }}>{match.breakdown?.department}%</strong></div>
                <div style={{ color: "#a0a0b0" }}>👤 Role: <strong style={{ color: "#e0e0e0" }}>{match.breakdown?.role}%</strong></div>
              </div>

              {/* Action Button */}
              <button className="btn-primary" onClick={() => handleCollab(match)} style={{ width: "100%", justifyContent: "center" }}>
                ✉️ Send Collab Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartMatch;
