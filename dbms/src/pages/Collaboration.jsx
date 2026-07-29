import { useState, useEffect } from 'react';
import axios from 'axios';
import './Collaboration.css';

const Collaboration = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    axios.get("/api/students")
      .then(res => {
        const data = res.data.filter(s => s.email !== email);
        setStudents(data);
        setFiltered(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [email]);

  useEffect(() => {
    if (!search) { setFiltered(students); return; }
    setFiltered(students.filter(s =>
      (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.interests || []).some(i => i.toLowerCase().includes(search.toLowerCase())) ||
      (s.department || "").toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, students]);

  const handleRequest = async (student) => {
    try {
      await axios.post("/api/send-collab-request", {
        sender_email: email,
        receiver_email: student.email,
        sender_name: userName,
        sender_profile_image: "",
        receiver_name: student.name,
        receiver_profile_image: student.profile_pic_path || "",
      });
      alert(`Collaboration request sent to ${student.name}!`);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to send request");
    }
  };

  if (loading) return <div className="container" style={{paddingTop:"4rem",textAlign:"center"}}><div className="spinner"></div></div>;

  return (
    <div className="container slide-up" style={{ paddingTop: "2rem" }}>
      <h1 className="page-title">🤝 Find Collaborators</h1>

      <div style={{ position: "relative", marginBottom: "2rem" }}>
        <input className="input-field" placeholder="Search by name, interest, or department..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: "1rem" }} />
      </div>

      <p style={{ color: "#a0a0b0", marginBottom: "1.5rem" }}>{filtered.length} students found</p>

      {filtered.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-icon">🔍</div>
          <p>No students match your search.</p>
        </div>
      ) : (
        <div className="grid-auto">
          {filtered.map((student, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div className="avatar">
                  {student.profile_pic_path
                    ? <img src={`/uploads/${student.profile_pic_path.replace("uploads/","")}`} alt="" />
                    : (student.name?.charAt(0) || "?")}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700 }}>{student.name}</h3>
                  <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{student.department}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1rem" }}>
                {(student.interests || []).map((interest, i) => (
                  <span key={i} className="tag">{interest}</span>
                ))}
              </div>
              <button className="btn-primary" onClick={() => handleRequest(student)}
                style={{ width: "100%", justifyContent: "center" }}>
                ✉️ Send Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collaboration;