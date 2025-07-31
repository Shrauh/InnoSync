import React, { useState, useEffect } from "react";
import "./Notifications.css"; // Import your CSS file

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample dummy notifications
  const dummyNotifications = [
    {
      sender_name: "Rahul Mehra",
      sender_email: "rahul.mehra@example.com",
      message: "I would like to collaborate with you on the AI research project.",
    },
    {
      sender_name: "Anjali Sharma",
      sender_email: "anjali.sharma@example.com",
      message: "Interested in working together on a web development assignment.",
    },
    {
      sender_name: "Amitabh Iyer",
      sender_email: "amitabh.iyer@example.com",
      message: "Let's collaborate on the machine learning module implementation.",
    },
    {
      sender_name: "Neha Reddy",
      sender_email: "neha.reddy@example.com",
      message: "I would love to join your team for the IoT-based project.",
    },
    {
      sender_name: "Karan Thakur",
      sender_email: "karan.thakur@example.com",
      message: "Let's discuss joining forces for the cybersecurity research.",
    },
  ];
  

  useEffect(() => {
    setLoading(false); // Assuming data is already available for now
    setNotifications(dummyNotifications); // Set dummy notifications
  }, []);

  const handleResponse = (sender, status) => {
    alert(`${status} request from ${sender}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="notifications-container">
      <h2>Collaboration Requests</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <p>
              <strong>{notification.sender_name}</strong> {notification.message}
            </p>
            <div className="notification-actions">
              <button
                onClick={() => handleResponse(notification.sender_name, "Accepted")}
                className="accept-btn"
              >
                Accept
              </button>
              <button
                onClick={() => handleResponse(notification.sender_name, "Rejected")}
                className="reject-btn"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-notifications">No new notifications</p>
      )}
    </div>
  );
};

export default Notifications;
