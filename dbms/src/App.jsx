import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home1";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Profile1 from "./pages/Profile1";
import Faculty from "./pages/Faculty";
import Collaboration from "./pages/Collaboration";
import Notification from "./pages/Notifications";
import MyTeam from "./pages/Myteam";
import SmartMatch from "./pages/SmartMatch";
import ErrorBoundary from './ErrorBoundary';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import MentorshipRequests from './pages/faculty/MentorshipRequests';
import StudentDirectory from './pages/faculty/StudentDirectory';
import UnderGuidance from './pages/faculty/UnderGuidance';
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Notifications" element={<Notification />} />
        <Route path="/smart-match" element={<SmartMatch />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/requests" element={<MentorshipRequests />} />
        <Route path="/faculty/directory" element={<StudentDirectory />} />
        <Route path="/faculty/guidance" element={<UnderGuidance />} />
        <Route path="/profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
        <Route path="/profile1" element={<ErrorBoundary><Profile1 /></ErrorBoundary>} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/myteam" element={<MyTeam />} />
        <Route path="*" element={
          <div className="container" style={{ textAlign: "center", paddingTop: "6rem" }}>
            <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🚀</div>
            <h1 className="gradient-text" style={{ fontSize: "3rem", fontWeight: 900 }}>404</h1>
            <p style={{ color: "#a0a0b0", fontSize: "1.1rem" }}>Page not found. Let's get you back on track.</p>
            <a href="/" className="btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>← Go Home</a>
          </div>
        } />
      </Routes>
    </>
  );
};

export default App;
