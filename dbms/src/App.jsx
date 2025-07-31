import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home1";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Profile1 from "./pages/Profile1"; // Faculty Profile
import Faculty from "./pages/Faculty";
import Collaboration from "./pages/Collaboration";
import Notification from "./pages/Notifications";
import MyTeam from "./pages/Myteam";
import ErrorBoundary from './ErrorBoundary'; // ✅ Import ErrorBoundary
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import MentorshipRequests from './pages/faculty/MentorshipRequests';
import StudentDirectory from './pages/faculty/StudentDirectory';
import UnderGuidance from './pages/faculty/UnderGuidance';  

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Notifications" element={<Notification />} />
      <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
      <Route path="/faculty/requests" element={<MentorshipRequests />} />
      <Route path="/faculty/directory" element={<StudentDirectory />} />
      <Route path="/faculty/guidance" element={<UnderGuidance />} />


      {/* ✅ Wrap Profile pages in ErrorBoundary */}
      <Route
        path="/profile"
        element={
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        }
      />
      <Route
        path="/profile1"
        element={
          <ErrorBoundary>
            <Profile1 />
          </ErrorBoundary>
        }
      />

      <Route path="/faculty" element={<Faculty />} />
      <Route path="/collaboration" element={<Collaboration />} />
      <Route path="/myteam" element={<MyTeam />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default App;
