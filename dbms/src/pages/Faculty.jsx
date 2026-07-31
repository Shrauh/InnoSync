import { useState, useEffect } from "react";
import axios from "axios";
import "./Faculty.css";

// Static faculty data (local assets)
import ydbhise from "../assets/ydbhise.jpg";
import pdrakibe from "../assets/pdrakibe.jpg";
import crpatil from "../assets/crpatil.jpg";
import adchouhan from "../assets/adchouhan.jpg";
import pgkatware from "../assets/pgkatware.jpg";
import sbshinde from "../assets/sbshinde.jpg";
import umrane from "../assets/umrane.jpg";

const staticFaculty = [
  { img: ydbhise, name: "Prof. Y. D. Bhise", email: "ydbhise@kkwagh.edu.in", department: "Computer Engineering", research: "Mobile Computing & IoT" },
  { img: pdrakibe, name: "Ms. P. D. Rakibe", email: "pdrakibe@kkwagh.edu.in", department: "Computer Engineering", research: "Network Security, Data Mining, Blockchain" },
  { img: crpatil, name: "Prof. C. R. Patil", email: "crpatil@kkwagh.edu.in", department: "Computer Engineering", research: "Image Processing, Pattern Recognition" },
  { img: adchouhan, name: "Prof. A. D. Chouhan", email: "adchouhan@kkwagh.edu.in", department: "Computer Engineering", research: "Machine Learning, NLP" },
  { img: pgkatware, name: "Prof. P. G. Katware", email: "pgkatware@kkwagh.edu.in", department: "Computer Engineering", research: "Cloud Computing, Big Data" },
  { img: sbshinde, name: "Prof. S. B. Shinde", email: "sbshinde@kkwagh.edu.in", department: "Computer Engineering", research: "Cybersecurity, Ethical Hacking" },
  { img: umrane, name: "Prof. U. Mrane", email: "umrane@kkwagh.edu.in", department: "Computer Engineering", research: "Software Engineering, DevOps" },
];

const Faculty = () => {
  const [dbFaculty, setDbFaculty] = useState([]);
  const [search, setSearch] = useState("");
  const [requesting, setRequesting] = useState("");
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    axios.get("/api/faculty-list")
      .then(res => setDbFaculty(res.data || []))
      .catch(() => {});
  }, []);

  // Merge static + DB faculty, deduplicate by email
  const allFaculty = [...staticFaculty];
  dbFaculty.forEach(f => {
    if (!allFaculty.some(s => s.email === f.email)) {
      allFaculty.push({
        name: f.name,
        email: f.email,
        department: f.department,
        research: (f.interests || []).join(", "),
        img: f.profile_pic_path ? `/uploads/${f.profile_pic_path.replace("uploads/", "")}` : null,
        students_count: f.students_count || 0,
      });
    }
  });

  const filtered = search
    ? allFaculty.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        (f.research || "").toLowerCase().includes(search.toLowerCase()) ||
        (f.department || "").toLowerCase().includes(search.toLowerCase())
      )
    : allFaculty;

  const handleMentorshipRequest = async (facultyEmail, facultyName) => {
    if (!email) { alert("Please log in first"); return; }
    setRequesting(facultyEmail);
    try {
      await axios.post("/api/mentorship/request", {
        student_email: email,
        faculty_email: facultyEmail,
      });
      alert(`Mentorship request sent to ${facultyName}!`);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to send request");
    } finally {
      setRequesting("");
    }
  };

  return (
    <div className="container slide-up" style={{ paddingTop: "2rem" }}>
      <h1 className="page-title">🎓 Faculty Directory</h1>
      <p style={{ color: "#a0a0b0", marginBottom: "1.5rem" }}>
        Browse faculty members and request mentorship for your projects
      </p>

      <input className="input-field" placeholder="Search by name, research area, or department..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "2rem" }} />

      <div className="grid-auto">
        {filtered.map((faculty, idx) => (
          <div key={idx} className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="avatar" style={{ width: "60px", height: "60px", fontSize: "1.3rem" }}>
                {faculty.img ? <img src={faculty.img} alt="" /> : faculty.name?.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{faculty.name}</h3>
                <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{faculty.department}</p>
              </div>
            </div>

            {faculty.research && (
              <div>
                <p style={{ color: "#a0a0b0", fontSize: "0.75rem", marginBottom: "0.3rem" }}>Research Areas</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {faculty.research.split(",").map((r, i) => (
                    <span key={i} className="tag">{r.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
              <a href={`mailto:${faculty.email}`} className="btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem" }}>
                ✉️ Email
              </a>
              <button className="btn-primary"
                onClick={() => handleMentorshipRequest(faculty.email, faculty.name)}
                disabled={requesting === faculty.email}
                style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem" }}>
                {requesting === faculty.email ? "Sending..." : "🎯 Mentorship"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
