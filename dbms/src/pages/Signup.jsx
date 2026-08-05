import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', password: '', department: '', role: 'student',
    skills: '', interest: '', linkedin: '', achievements: '', past_projects: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!form.name || !form.email || !form.password) { setError("Fill all fields"); return; }
      setStep(2);
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      const res = await fetch('/auth/signup', { method: 'POST', body: formData });
      if (res.ok) navigate('/login');
      else { const d = await res.json(); setError(d.detail || "Signup failed"); }
    } catch { setError("Server error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg"><div className="orb orb-1"></div><div className="orb orb-2"></div></div>
      <div className="auth-card">
        <div className="auth-header">
          <span style={{ fontSize: "2.5rem" }}>⚡</span>
          <h2 className="gradient-text-animated" style={{ fontSize: "1.6rem", fontWeight: 800 }}>
            {step === 1 ? "Create Account" : "Almost Done!"}
          </h2>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            {step === 1 ? "Step 1 of 2 — Your basics" : "Step 2 of 2 — Your expertise"}
          </p>
          <div className="step-dots">
            <div className={`dot ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`dot ${step >= 2 ? 'active' : ''}`}></div>
          </div>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {step === 1 ? (
            <>
              <input className="input-field" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required autoFocus />
              <input className="input-field" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input className="input-field" name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange} required minLength={6} />
              <select className="input-field" name="role" value={form.role} onChange={handleChange}>
                <option value="student">🎓 Student</option>
                <option value="faculty">👨‍🏫 Faculty</option>
              </select>
              <button className="cta-primary auth-btn" type="submit">Continue →</button>
            </>
          ) : (
            <>
              <input className="input-field" name="department" placeholder="Department (e.g. CSE, IT, ME)" value={form.department} onChange={handleChange} required autoFocus />
              <input className="input-field" name="skills" placeholder="Skills — React, Python, ML (comma separated)" value={form.skills} onChange={handleChange} />
              <input className="input-field" name="interest" placeholder="Interests — AI, Web Dev, IoT (comma separated)" value={form.interest} onChange={handleChange} />
              <input className="input-field" name="linkedin" placeholder="LinkedIn URL (optional)" value={form.linkedin} onChange={handleChange} />
              <div style={{ display: "flex", gap: "0.8rem" }}>
                <button type="button" className="cta-secondary" onClick={() => setStep(1)} style={{ flex: 1, textAlign: "center", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", background: "transparent", color: "#a0a0b0", fontFamily: "inherit", fontSize: "0.95rem" }}>← Back</button>
                <button className="cta-primary auth-btn" type="submit" disabled={loading} style={{ flex: 2 }}>
                  {loading ? "Creating..." : "Create Account 🚀"}
                </button>
              </div>
            </>
          )}
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
