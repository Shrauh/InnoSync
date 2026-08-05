import './Home1.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [count, setCount] = useState({ students: 0, matches: 0, teams: 0 });

  useEffect(() => {
    // Animated counter effect
    const targets = { students: 150, matches: 420, teams: 35 };
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCount({
        students: Math.round((targets.students / steps) * Math.min(step, steps)),
        matches: Math.round((targets.matches / steps) * Math.min(step, steps)),
        teams: Math.round((targets.teams / steps) * Math.min(step, steps)),
      });
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing">
      {/* Animated Background */}
      <div className="landing-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <span className="logo-icon">⚡</span>
          <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 800 }}>InnoSync</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#algo">Algorithm</a>
          <Link to="/login" className="nav-btn-outline">Sign In</Link>
          <Link to="/signup" className="nav-btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-badge">🚀 AI-Powered Collaboration Platform</div>
        <h1 className="hero-title">
          Find Your <span className="gradient-text-animated">Perfect</span><br />
          Project Partner
        </h1>
        <p className="hero-subtitle">
          InnoSync uses machine learning to match students by shared interests, complementary 
          skills, and academic alignment — so you spend less time searching and more time building.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="cta-primary">
            <span>Start Collaborating</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="#how" className="cta-secondary">See How It Works ↓</a>
        </div>

        {/* Live Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">{count.students}+</span>
            <span className="hero-stat-label">Students</span>
          </div>
          <div className="stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-num">{count.matches}+</span>
            <span className="hero-stat-label">AI Matches</span>
          </div>
          <div className="stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-num">{count.teams}+</span>
            <span className="hero-stat-label">Teams Formed</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-header">
          <span className="section-tag">Features</span>
          <h2>Everything You Need to <span className="gradient-text">Collaborate</span></h2>
        </div>
        <div className="features-grid">
          {[
            { icon: "🧠", title: "AI Smart Matching", desc: "Our algorithm scores every student against your profile using interests, skills, and department proximity.", accent: "#6c63ff" },
            { icon: "💡", title: "Skill Gap Analysis", desc: "Discover which skills to learn based on what successful collaborators with similar interests have.", accent: "#ff6584" },
            { icon: "🔥", title: "Trending Insights", desc: "See what topics, technologies, and research areas are trending across your campus in real-time.", accent: "#ff9800" },
            { icon: "✉️", title: "One-Click Requests", desc: "Send collaboration requests instantly. Accept or reject from your notification center.", accent: "#4caf50" },
            { icon: "🎓", title: "Faculty Mentorship", desc: "Browse faculty by research interests and request mentorship directly from the platform.", accent: "#9c27b0" },
            { icon: "✏️", title: "Profile Builder", desc: "Showcase your skills, interests, achievements, and past projects. Edit anytime.", accent: "#00bcd4" },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{ '--accent': f.accent }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how-section" id="how">
        <div className="section-header">
          <span className="section-tag">Process</span>
          <h2>How <span className="gradient-text">InnoSync</span> Works</h2>
        </div>
        <div className="steps-container">
          {[
            { num: "01", title: "Create Profile", desc: "Sign up in 30 seconds with your name, skills, and interests.", color: "#6c63ff" },
            { num: "02", title: "Get AI Matches", desc: "Our engine instantly scores and ranks your best potential collaborators.", color: "#ff6584" },
            { num: "03", title: "Connect", desc: "Send a request. When they accept, you're teammates.", color: "#4caf50" },
            { num: "04", title: "Build Together", desc: "Manage your team, find mentors, and start creating.", color: "#ff9800" },
          ].map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-num" style={{ background: step.color }}>{step.num}</div>
              <div className="step-line" style={i === 3 ? { display: 'none' } : {}}></div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Algorithm */}
      <section className="algo-section" id="algo">
        <div className="section-header">
          <span className="section-tag">Algorithm</span>
          <h2>The Science Behind <span className="gradient-text">Matching</span></h2>
        </div>
        <div className="algo-card">
          <div className="algo-formula">Score = (I × 0.4) + (S × 0.3) + (D × 0.15) + (R × 0.15)</div>
          <div className="algo-bars">
            {[
              { label: "Interest Overlap", pct: 40, color: "#6c63ff" },
              { label: "Skill Complementarity", pct: 30, color: "#ff6584" },
              { label: "Department Proximity", pct: 15, color: "#4caf50" },
              { label: "Role Compatibility", pct: 15, color: "#ff9800" },
            ].map((b, i) => (
              <div key={i} className="algo-bar-row">
                <span className="algo-bar-label">{b.label}</span>
                <div className="algo-bar-track">
                  <div className="algo-bar-fill" style={{ width: `${b.pct * 2.5}%`, background: b.color }}></div>
                </div>
                <span className="algo-bar-pct">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Find Your <span className="gradient-text-animated">Dream Team</span>?</h2>
        <p>Join InnoSync and let AI match you with the perfect collaborator.</p>
        <Link to="/signup" className="cta-primary" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
          <span>Get Started — It's Free</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div>
            <span className="logo-icon">⚡</span>
            <span className="gradient-text" style={{ fontWeight: 700 }}>InnoSync</span>
          </div>
          <p>Built for students, by students. © 2025</p>
        </div>
      </footer>
    </div>
  );
}