import './Home1.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="landing-page">
      {/* Hero */}
      <header className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content slide-up">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚡</div>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1.1, marginBottom: "1rem" }}>
            Find Your <span className="gradient-text">Perfect</span><br />
            Collaborator
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#a0a0b0", maxWidth: "550px", margin: "0 auto 2rem" }}>
            AI-powered student collaboration platform. Connect by shared interests,
            get smart match scores, and build amazing projects together.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/signup" className="btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "1.1rem" }}>
              Get Started Free →
            </Link>
            <Link to="/login" className="btn-outline" style={{ padding: "0.9rem 2rem", fontSize: "1.1rem" }}>
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="features-section">
        <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 800, textAlign: "center", marginBottom: "2.5rem" }}>
          Why InnoSync?
        </h2>
        <div className="grid-3" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="glass-card" style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🧠</div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>AI Smart Matching</h3>
            <p style={{ color: "#a0a0b0", fontSize: "0.9rem" }}>
              Our algorithm scores compatibility by interests, skills, and department to find your ideal partner.
            </p>
          </div>
          <div className="glass-card" style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤝</div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Collaboration Requests</h3>
            <p style={{ color: "#a0a0b0", fontSize: "0.9rem" }}>
              Send requests, accept or reject, and build your dream team in one click.
            </p>
          </div>
          <div className="glass-card" style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎓</div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Faculty Mentorship</h3>
            <p style={{ color: "#a0a0b0", fontSize: "0.9rem" }}>
              Connect with faculty mentors who share your research interests for guidance.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 800, textAlign: "center", marginBottom: "2rem" }}>
          How It Works
        </h2>
        {[
          { step: "1", title: "Create Your Profile", desc: "Sign up with your skills, interests, and department." },
          { step: "2", title: "Get AI Matches", desc: "Our engine scores every student and shows your best collaborators." },
          { step: "3", title: "Connect & Build", desc: "Send requests, form teams, and start building together." },
        ].map((item, i) => (
          <div key={i} className="glass-card" style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <div className="score-ring" style={{ background: "linear-gradient(135deg, #6c63ff, #ff6584)", color: "white", fontSize: "1.3rem" }}>
              {item.step}
            </div>
            <div>
              <h3 style={{ fontWeight: 700 }}>{item.title}</h3>
              <p style={{ color: "#a0a0b0", fontSize: "0.9rem" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "2rem", color: "#666", borderTop: "1px solid #1a1a2e" }}>
        © 2025 InnoSync. Built for students, by students.
      </footer>
    </div>
  );
}