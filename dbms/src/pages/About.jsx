import "./About.css";

const About = () => {
  const features = [
    { icon: "🧠", title: "AI Smart Matching", desc: "Weighted scoring algorithm analyzes interests (40%), skills (30%), department (15%), and role (15%) to find your ideal collaborators." },
    { icon: "💡", title: "Skill Recommendations", desc: "AI analyzes what successful collaborators with similar interests know and recommends skills you should learn." },
    { icon: "🔥", title: "Trending Insights", desc: "Real-time campus trends show what topics and technologies students are most excited about." },
    { icon: "🤝", title: "Collaboration System", desc: "Send requests, accept partnerships, and build your project team — all within the platform." },
    { icon: "🎓", title: "Faculty Mentorship", desc: "Browse faculty by research area and request mentorship directly from the platform." },
    { icon: "👥", title: "Team Management", desc: "Track your collaborators, manage your team, and stay connected." },
  ];

  const steps = [
    { num: "01", title: "Create Your Profile", desc: "Sign up with your skills, interests, department, and achievements.", color: "#6c63ff" },
    { num: "02", title: "Get AI Matches", desc: "Our engine scores every student and ranks your best collaborators with a compatibility percentage.", color: "#ff6584" },
    { num: "03", title: "Send Requests", desc: "Found someone interesting? Send a collaboration request. They'll see it in their notifications.", color: "#4caf50" },
    { num: "04", title: "Build Together", desc: "Once accepted, team members appear on your My Team page. Start collaborating!", color: "#ff9800" },
  ];

  const techStack = [
    { name: "React 18", category: "Frontend" },
    { name: "Vite", category: "Build Tool" },
    { name: "FastAPI", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "PyMongo", category: "ORM" },
    { name: "JWT Auth", category: "Security" },
  ];

  return (
    <div className="container slide-up" style={{ paddingTop: "2rem", maxWidth: "1000px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>⚡</div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1.2, marginBottom: "1rem" }}>
          About <span className="gradient-text">InnoSync</span>
        </h1>
        <p style={{ color: "#a0a0b0", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          AI-powered student collaboration platform that helps you find the perfect project partner based on shared interests, complementary skills, and academic alignment.
        </p>
      </div>

      {/* Algorithm */}
      <div className="glass-card" style={{ marginBottom: "2rem", textAlign: "center", padding: "2rem" }}>
        <h2 style={{ fontWeight: 700, marginBottom: "1rem" }}>🧠 The Matching Algorithm</h2>
        <p style={{ color: "#a0a0b0", marginBottom: "1.5rem" }}>
          Our AI scores compatibility using four weighted factors:
        </p>
        <div className="grid-3" style={{ gap: "1rem", maxWidth: "600px", margin: "0 auto" }}>
          {[
            { label: "Interests", weight: "40%", color: "#6c63ff" },
            { label: "Skills", weight: "30%", color: "#ff6584" },
            { label: "Department", weight: "15%", color: "#4caf50" },
            { label: "Role", weight: "15%", color: "#ff9800" },
          ].map((f, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: f.color }}>{f.weight}</div>
              <div style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <h2 className="gradient-text" style={{ fontSize: "1.8rem", fontWeight: 800, textAlign: "center", marginBottom: "1.5rem" }}>
        Features
      </h2>
      <div className="grid-auto" style={{ marginBottom: "2.5rem" }}>
        {features.map((f, i) => (
          <div key={i} className="glass-card" style={{ textAlign: "center", padding: "1.5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{f.icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.4rem" }}>{f.title}</h3>
            <p style={{ color: "#a0a0b0", fontSize: "0.85rem" }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <h2 className="gradient-text" style={{ fontSize: "1.8rem", fontWeight: 800, textAlign: "center", marginBottom: "1.5rem" }}>
        How It Works
      </h2>
      <div style={{ marginBottom: "2.5rem" }}>
        {steps.map((step, i) => (
          <div key={i} className="glass-card" style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <div className="score-ring" style={{ background: step.color, color: "white", fontSize: "1.1rem", fontWeight: 800 }}>
              {step.num}
            </div>
            <div>
              <h3 style={{ fontWeight: 700 }}>{step.title}</h3>
              <p style={{ color: "#a0a0b0", fontSize: "0.9rem" }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="glass-card" style={{ textAlign: "center", padding: "2rem", marginBottom: "2rem" }}>
        <h2 style={{ fontWeight: 700, marginBottom: "1rem" }}>🏗️ Tech Stack</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          {techStack.map((t, i) => (
            <span key={i} className="tag" style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}>
              {t.name} <span style={{ color: "#666", marginLeft: "0.3rem" }}>({t.category})</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
        Built with ❤️ for students, by students · InnoSync © 2025
      </div>
    </div>
  );
};

export default About;
