import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Hide navbar on login, signup, and home pages
  if (!userEmail || ["/login", "/signup", "/", "/home"].includes(location.pathname)) return null;

  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

  const studentLinks = [
    { to: "/profile", label: "👤 Profile" },
    { to: "/collaboration", label: "🤝 Collaborate" },
    { to: "/smart-match", label: "🧠 AI Match" },
    { to: "/Notifications", label: "🔔 Alerts" },
    { to: "/faculty", label: "🎓 Faculty" },
    { to: "/myteam", label: "👥 My Team" },
  ];

  const facultyLinks = [
    { to: "/profile1", label: "👤 Profile" },
    { to: "/faculty/dashboard", label: "📊 Dashboard" },
    { to: "/faculty/requests", label: "📨 Requests" },
    { to: "/faculty/directory", label: "📋 Students" },
    { to: "/faculty/guidance", label: "🎯 Guidance" },
  ];

  const links = userRole === "faculty" ? facultyLinks : studentLinks;

  return (
    <nav className="navbar">
      <Link to={userRole === "faculty" ? "/faculty/dashboard" : "/profile"} className="logo-link">
        <span style={{ color: "#6c63ff", fontSize: "1.5rem" }}>⚡</span>
        <span className="gradient-text">InnoSync</span>
      </Link>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link.to)}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button className="btn-danger" onClick={handleLogout} style={{ fontSize: "0.85rem" }}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
