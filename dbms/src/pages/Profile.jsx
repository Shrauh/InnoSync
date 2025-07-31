import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      // Fetch user data from backend
      fetch(`http://127.0.0.1:8000/api/user?email=${email}`)
        .then(res => res.json())
        .then(data => {
          console.log("Fetched user data:", data);

          // Ensure skills and interests are arrays (in case they're not)
          data.skills = Array.isArray(data.skills) ? data.skills : [data.skills];
          data.interests = Array.isArray(data.interests) ? data.interests : [data.interests];
          
          setUser(data);
          setDescription(data.description || ''); // Set description if available
        })
        .catch(err => console.error("Failed to fetch user:", err));
    }
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    const email = localStorage.getItem("userEmail");
    fetch(`http://127.0.0.1:8000/api/user/update-description?email=${email}&description=${description}`, {
      method: 'PUT',
    })
      .then(res => res.json())
      .then(data => {
        console.log('Description updated', data);
        setIsEditing(false);
      })
      .catch(err => console.error('Error updating description', err));
  };

  if (!user) return <div>Loading...</div>;
  if (!user.role || !user.name || !user.email) return <div>Error: User data is invalid</div>;

  const profileInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="logo">🎓 CollabHub</div>
        <nav>
          <ul>
            <li><a href="/profile">Dashboard</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/Myteam">My Team</a></li>
            <li><a href="/collaboration">Collaboration</a></li>
            <li><a href="/faculty">Faculty</a></li>
            <li><a href="/Notifications">Notifications</a></li>
            <li><a href="/login">Logout</a></li>
          </ul>
        </nav>
      </aside>

      <main className="profile-content">
        <div className="header">
          {/* Profile image container */}
          <div className="profile-img-container">
            <span className="profile-initial">{profileInitial}</span>
          </div>
          <div>
            <h1>Welcome, {user.name}</h1>
            <p>Dept: {user.department || "N/A"}</p>
            <p>
              Email: <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
            <p>Role: {user.role}</p>
            {user.mentor && <p>Mentor: {user.mentor}</p>}
          </div>
        </div>

        {user.role === "student" && (
          <>
            <Section title="🛠 Skills">
              <ul className="info-list">
                {(user.skills || []).map((skill, idx) => <li key={idx}>{skill}</li>)}
              </ul>
            </Section>

            <Section title="🎯 Interests">
              <ul className="info-list">
                {(user.interests || []).map((interest, idx) => <li key={idx}>{interest}</li>)}
              </ul>
            </Section>
          </>
        )}

        {/* Add Description Section */}
        <Section title="📝 Description">
          {isEditing ? (
            <div>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                rows="5"
                placeholder="Add a description about yourself..."
                className="description-textarea"
              />
              <button onClick={handleSaveDescription} className="save-description-btn">Save</button>
            </div>
          ) : (
            <div>
              <p>{description || 'No description available'}</p>
              <button onClick={() => setIsEditing(true)} className="edit-description-btn">Edit</button>
            </div>
          )}
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
