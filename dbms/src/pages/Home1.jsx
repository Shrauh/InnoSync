import './Home1.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export default function Home() {
  return (
    <div className="home-background">
      <div className="home-header">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="tagline">Empowering Students Through Collaboration</h2>
      </div>

      <div className="home-content">
        <h1>Welcome to the Student Collab Hub</h1>
        <p>
          Connect with like-minded peers, build projects, and grow together through meaningful collaborations.
        </p>

        <div className="motto-section">
          <h3>🌟 Our Mission</h3>
          <p>
            At Student Collab Hub, our goal is to foster innovation and teamwork by connecting students based on
            shared interests, academic backgrounds, and project goals. Whether you're looking to join a team or start
            your own, our platform makes collaboration simple, efficient, and impactful.
          </p>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/signup" className="nav-btn signup">Signup</Link>
        </div>

        {/* Gmail Contact Section */}
        <div className="gmail-link">
          <a
            href="https://mail.google.com/mail/?view=cm&to=dbmsproject04@gmail.com&su=Contact%20from%20Student%20Collab%20Hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            📧 Contact Us: dbmsproject04@gmail.com
          </a>
        </div>
      </div>

      <footer className="footer">
        © 2025 Student Collab Hub. All rights reserved.
      </footer>
    </div>
  );
}