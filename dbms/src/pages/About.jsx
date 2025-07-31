import React from "react";
import "./About.css";
import flowchartImage from "../assets/about_flowchart.png"; // ✅ Confirm path

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image-section">
          <img
            src={flowchartImage}
            alt="Website Workflow"
            className="about-flowchart"
          />
        </div>
        <div className="about-text-section">
          <h1>About Our Website</h1>
          <p className="intro-text">
            Welcome to our collaboration platform! This site helps students and faculty connect,
            share interests, and form meaningful project groups across departments. Here's how it works:
          </p>
          <div className="about-steps">
            <div className="step">
              <h2>1. User Signup</h2>
              <p>New users register with their details, department, role, skills, and interests.</p>
            </div>
            <div className="step">
              <h2>2. Discover Collaborators</h2>
              <p>Students can browse others with matching interests on the Collaboration page.</p>
            </div>
            <div className="step">
              <h2>3. Send Collaboration Requests</h2>
              <p>Users can send requests to collaborate with others on common goals or interests.</p>
            </div>
            <div className="step">
              <h2>4. Notification Handling</h2>
              <p>Requests are received in the Notifications page, where users can accept or reject.</p>
            </div>
            <div className="step">
              <h2>5. Team Formation</h2>
              <p>Once accepted, team members appear on the My Team page. Collaboration begins!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
