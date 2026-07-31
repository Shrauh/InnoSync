import { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/students')
      .then(res => { setStudents(res.data || []); setFiltered(res.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(students); return; }
    setFiltered(students.filter(s =>
      (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.skills || []).some(sk => sk.toLowerCase().includes(search.toLowerCase())) ||
      (s.department || "").toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, students]);

  if (loading) return <div className="container" style={{paddingTop:"4rem",textAlign:"center"}}><div className="spinner"></div></div>;

  return (
    <div className="container slide-up" style={{ paddingTop: "2rem" }}>
      <h1 className="page-title">📋 Student Directory</h1>

      <input className="input-field" placeholder="Search by name, skill, or department..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1.5rem" }} />

      <p style={{ color: "#a0a0b0", marginBottom: "1.5rem" }}>{filtered.length} students</p>

      {filtered.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-icon">🎓</div>
          <p>No students found</p>
        </div>
      ) : (
        <div className="grid-auto">
          {filtered.map((student, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.8rem" }}>
                <div className="avatar">{(student.name || "?").charAt(0)}</div>
                <div>
                  <h3 style={{ fontWeight: 700 }}>{student.name}</h3>
                  <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{student.email}</p>
                </div>
              </div>
              <p style={{ color: "#a0a0b0", fontSize: "0.8rem", marginBottom: "0.5rem" }}>🏫 {student.department || "—"}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.5rem" }}>
                {(student.skills || []).map((s, i) => <span key={i} className="tag">{s}</span>)}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {(student.interests || []).map((s, i) => <span key={i} className="tag tag-pink">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
