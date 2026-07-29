import './Login.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        navigate(data.user.role === "faculty" ? '/faculty/dashboard' : '/profile');
      } else {
        setError(data.detail || "Invalid login credentials.");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box glass-card">
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "3rem" }}>⚡</div>
          <h2 className="gradient-text" style={{ fontSize: "1.8rem", fontWeight: 800 }}>InnoSync</h2>
          <p style={{ color: "#a0a0b0", marginTop: "0.3rem" }}>Welcome back, innovator</p>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input className="input-field" type="email" name="email" placeholder="Email Address"
            value={formData.email} onChange={handleChange} required />
          <input className="input-field" type="password" name="password" placeholder="Password"
            value={formData.password} onChange={handleChange} required />
          <button className="btn-primary" type="submit" disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "0.85rem" }}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
        <p style={{ marginTop: "1.5rem", color: "#a0a0b0", textAlign: "center" }}>
          Don't have an account? <Link to="/signup" style={{ color: "#6c63ff", fontWeight: 600 }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
