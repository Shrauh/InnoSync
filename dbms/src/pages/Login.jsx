import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css'; /* Share auth styles */

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        navigate(data.user.role === "faculty" ? '/faculty/dashboard' : '/profile');
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch { setError("Server error. Try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg"><div className="orb orb-1"></div><div className="orb orb-2"></div></div>
      <div className="auth-card">
        <div className="auth-header">
          <span style={{ fontSize: "2.5rem" }}>⚡</span>
          <h2 className="gradient-text-animated" style={{ fontSize: "1.6rem", fontWeight: 800 }}>Welcome Back</h2>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>Sign in to your InnoSync account</p>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input className="input-field" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required autoFocus />
          <input className="input-field" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button className="cta-primary auth-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
