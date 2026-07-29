import './Signup.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', department: '', role: 'student',
    skills: '', interest: '', linkedin: '', achievements: '', past_projects: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (profilePic) formData.append("profile_pic", profilePic);

      await fetch('/auth/signup', { method: 'POST', body: formData });
      navigate('/login');
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", placeholder: "Full Name", required: true },
    { name: "email", placeholder: "Email", type: "email", required: true },
    { name: "password", placeholder: "Password", type: "password", required: true },
    { name: "department", placeholder: "Department (e.g. CSE, IT, ME)", required: true },
    { name: "skills", placeholder: "Skills (comma separated)" },
    { name: "interest", placeholder: "Interests (comma separated)" },
    { name: "linkedin", placeholder: "LinkedIn URL" },
    { name: "achievements", placeholder: "Achievements" },
    { name: "past_projects", placeholder: "Past Projects" },
  ];

  return (
    <div className="signup-container">
      <div className="glass-card" style={{ width: "100%", maxWidth: "500px" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "2.5rem" }}>⚡</div>
          <h2 className="gradient-text" style={{ fontSize: "1.7rem", fontWeight: 800 }}>Join InnoSync</h2>
          <p style={{ color: "#a0a0b0", fontSize: "0.9rem" }}>Start collaborating today</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {fields.map(f => (
            <input key={f.name} className="input-field" name={f.name} type={f.type || "text"}
              placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} required={f.required} />
          ))}

          <select className="input-field" name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <div style={{ border: "1px dashed #2a2a3e", borderRadius: "12px", padding: "0.7rem", textAlign: "center", color: "#a0a0b0", cursor: "pointer" }}>
            <label style={{ cursor: "pointer" }}>
              {profilePic ? `📷 ${profilePic.name}` : "📷 Upload Profile Picture"}
              <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} style={{ display: "none" }} />
            </label>
          </div>

          <button className="btn-primary" type="submit" disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "0.8rem" }}>
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

        <p style={{ marginTop: "1rem", color: "#a0a0b0", textAlign: "center", fontSize: "0.9rem" }}>
          Already have an account? <Link to="/login" style={{ color: "#6c63ff", fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
