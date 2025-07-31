import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile1() {
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetch(`http://127.0.0.1:8000/api/user?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.role === "faculty") {
            setFaculty(data);
          } else {
            console.error("User is not a faculty.");
          }
        })
        .catch((err) => console.error("Error fetching faculty data:", err));
    }
  }, []);

  if (!faculty) return <div>Loading Faculty Profile...</div>;

  // Generate a profile picture with the first letter of the faculty name
  const generateProfilePic = (name) => {
    if (!name) return "default.jpg";
    return `${name[0].toUpperCase()}.png`; // e.g., "S.png" for Shravani
  };

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="logo">🎓 CollabHub</div>
        <nav>
          <ul>
            <li><a href="/profile1">Dashboard</a></li>
            <li><a href="/faculty/MentorshipRequests">Mentorship Requests</a></li>
            <li><a href="/faculty/StudentDirectory">Student Directory</a></li>
            <li><a href="/faculty/UnderGuidance">Under Guidance</a></li>
            <li><a href="/login">Logout</a></li>
          </ul>
        </nav>
      </aside>

      <main className="profile-content">
        <div className="header">
          <div
            className="profile-pic"
            style={{
              backgroundColor: '#6c757d', // You can adjust this color
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              width: '100px',
              height: '100px',
              fontSize: '40px',
              fontWeight: 'bold',
            }}
          >
            {faculty.name ? faculty.name[0].toUpperCase() : "?"}
          </div>
          <div>
            <h1>Prof. {faculty.name}</h1>
            <p><strong>Email:</strong> <a href={`mailto:${faculty.email}`}>{faculty.email}</a></p>
            <p><strong>Department:</strong> {faculty.department}</p>
            <p><strong>Role:</strong> {faculty.role}</p>
            {faculty.current_project && (
              <p><strong>Current Project:</strong> {faculty.current_project}</p>
            )}
          </div>
        </div>

        <Section title="📚 Under Guidance Students">
          {(faculty.under_guidance && faculty.under_guidance.length > 0) ? (
            <ul className="info-list">
              {faculty.under_guidance.map((student, idx) => (
                <li key={idx}>{student}</li>
              ))}
            </ul>
          ) : (
            <p>No students under guidance.</p>
          )}
        </Section>

        <Section title="📞 Contact">
          <p><strong>Email:</strong> <a href={`mailto:${faculty.email}`}>{faculty.email}</a></p>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="dashboard-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
