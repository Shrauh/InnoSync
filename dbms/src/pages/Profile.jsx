import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;
    axios.get(`/api/user?email=${email}`)
      .then(res => {
        const d = res.data;
        d.skills = Array.isArray(d.skills) ? d.skills : [d.skills].filter(Boolean);
        d.interests = Array.isArray(d.interests) ? d.interests : [d.interests].filter(Boolean);
        setUser(d);
        setForm({
          skills: d.skills.join(", "),
          interests: d.interests.join(", "),
          linkedin: d.linkedin || "",
          achievements: d.achievements || "",
          past_projects: d.past_projects || "",
        });
      })
      .catch(err => console.error(err));
  }, [email]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("/api/user/update", {
        email,
        skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
        interests: form.interests.split(",").map(s => s.trim()).filter(Boolean),
        linkedin: form.linkedin,
        achievements: form.achievements,
        past_projects: form.past_projects,
      });
      // Refresh profile
      const res = await axios.get(`/api/user?email=${email}`);
      const d = res.data;
      d.skills = Array.isArray(d.skills) ? d.skills : [d.skills].filter(Boolean);
      d.interests = Array.isArray(d.interests) ? d.interests : [d.interests].filter(Boolean);
      setUser(d);
      setEditing(false);
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <div className="container" style={{ paddingTop: "4rem", textAlign: "center" }}><div className="spinner"></div></div>;

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="container slide-up" style={{ maxWidth: "800px", paddingTop: "2rem" }}>
      {/* Avatar Card */}
      <div className="glass-card" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div className="avatar avatar-lg" style={{ margin: "0 auto 1rem" }}>
          {user.profile_pic_path
            ? <img src={`/uploads/${user.profile_pic_path.replace("uploads/", "")}`} alt="" />
            : initial}
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{user.name}</h2>
        <p style={{ color: "#a0a0b0" }}>{user.email}</p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "0.5rem" }}>
          <span className="badge">{user.role}</span>
          <span className="badge" style={{ background: "rgba(255,101,132,0.15)", color: "#ff6584" }}>{user.department}</span>
        </div>
      </div>

      {/* Profile Details / Edit */}
      <div className="glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
          <h3 className="page-title" style={{ fontSize: "1.2rem", marginBottom: 0 }}>Profile Details</h3>
          {!editing ? (
            <button className="btn-primary" onClick={() => setEditing(true)} style={{ fontSize: "0.85rem" }}>✏️ Edit</button>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn-primary" onClick={handleSave} disabled={saving} style={{ fontSize: "0.85rem" }}>
                {saving ? "Saving..." : "💾 Save"}
              </button>
              <button className="btn-outline" onClick={() => setEditing(false)} style={{ fontSize: "0.85rem" }}>Cancel</button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <InfoRow label="🏫 Department" value={user.department} />

          {!editing ? (
            <>
              <InfoRow label="🛠 Skills" value={
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {user.skills.length > 0 ? user.skills.map((s, i) => <span key={i} className="tag">{s}</span>) : <span style={{ color: "#666" }}>Not set</span>}
                </div>
              } />
              <InfoRow label="🎯 Interests" value={
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {user.interests.length > 0 ? user.interests.map((s, i) => <span key={i} className="tag tag-pink">{s}</span>) : <span style={{ color: "#666" }}>Not set</span>}
                </div>
              } />
              {user.linkedin && <InfoRow label="🔗 LinkedIn" value={<a href={user.linkedin} target="_blank" rel="noreferrer">{user.linkedin}</a>} />}
              {user.achievements && <InfoRow label="🏆 Achievements" value={user.achievements} />}
              {user.past_projects && <InfoRow label="📝 Projects" value={user.past_projects} />}
              {user.mentor && <InfoRow label="👨‍🏫 Mentor" value={typeof user.mentor === 'object' ? user.mentor.name : user.mentor} />}
              {user.team?.length > 0 && <InfoRow label="👥 Team" value={`${user.team.length} collaborator${user.team.length > 1 ? 's' : ''}`} />}
            </>
          ) : (
            <>
              <EditRow label="🛠 Skills" value={form.skills} onChange={(v) => setForm({ ...form, skills: v })} placeholder="React, Python, ML (comma-separated)" />
              <EditRow label="🎯 Interests" value={form.interests} onChange={(v) => setForm({ ...form, interests: v })} placeholder="AI, Web Dev, Blockchain" />
              <EditRow label="🔗 LinkedIn" value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} placeholder="https://linkedin.com/in/..." />
              <EditRow label="🏆 Achievements" value={form.achievements} onChange={(v) => setForm({ ...form, achievements: v })} placeholder="Hackathon wins, certifications..." />
              <EditRow label="📝 Projects" value={form.past_projects} onChange={(v) => setForm({ ...form, past_projects: v })} placeholder="Past or current projects" />
            </>
          )}
        </div>
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

function EditRow({ label, value, onChange, placeholder }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <span style={{ color: "#a0a0b0", fontSize: "0.85rem", minWidth: "130px", flexShrink: 0 }}>{label}</span>
      <input className="input-field" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
