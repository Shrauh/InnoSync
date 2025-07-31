import React from 'react';
import './MyTeam.css';
import { useNavigate } from 'react-router-dom';

const teamData = {
  name: "Team Innovators",
  project: "AI-powered Study Buddy",
  members: [
    {
      id: 1,
      name: "Raj Verma",
      role: "Frontend Developer",
      email: "rajverma@university.edu",
      img: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      id: 2,
      name: "Sneha Patel",
      role: "AI Engineer",
      email: "sneha@university.edu",
      img: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 3,
      name: "Rohit Sharma",
      role: "Backend Developer",
      email: "rohit@university.edu",
      img: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ]
};

export default function MyTeam() {
  const navigate = useNavigate();

  const openProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="myteam-container">
      <h1>{teamData.name}</h1>
      <p className="team-size">Team Members: {teamData.members.length}</p>

      <div className="project-section">
        <h2>Current Team Project</h2>
        <p>{teamData.project}</p>
      </div>

      <div className="members-section">
        <h2>Team Members</h2>
        <div className="members-grid">
          {teamData.members.map(member => (
            <div
              className="member-card"
              key={member.id}
              onClick={() => openProfile(member.id)}
            >
              <img src={member.img} alt={member.name} />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
