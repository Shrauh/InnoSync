import './Signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    role: '',
    skills: '',
    otherSkill: '',
    interest: '',
    otherInterest: '',
    linkedin: '',
    achievements: '',
    past_projects: '',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const hardSkills = ['Python', 'Java', 'React', 'Node.js', 'SQL','Cip Design'];
  const softSkills = ['Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Creativity'];
  const interests = ['AI', 'Machine Learning', 'Robotics', 'IoT', 'Cybersecurity', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const finalSkills = formData.skills === 'Other' ? formData.otherSkill : formData.skills;
    const finalInterest = formData.interest === 'Other' ? formData.otherInterest : formData.interest;
  
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('department', formData.department);
    form.append('role', formData.role);
    form.append('skills', finalSkills);
    form.append('interest', finalInterest);
    form.append('linkedin', formData.linkedin);
    form.append('achievements', formData.achievements);
    form.append('past_projects', formData.past_projects);
    if (profilePic) {
      form.append('profile_pic', profilePic);
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      console.log(data); // 👈 ADD THIS LINE
  
      if (data.message) {
        alert(data.message);
  
        // Store the signup data in localStorage
        localStorage.setItem("userName", formData.name);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userRole", formData.role);
        localStorage.setItem("userSkills", finalSkills);
        localStorage.setItem("userInterest", finalInterest);
        localStorage.setItem("userLinkedIn", formData.linkedin);
        localStorage.setItem("userAchievements", formData.achievements);
        localStorage.setItem("userPastProjects", formData.past_projects);
        if (profilePic) {
          localStorage.setItem("userProfilePic", URL.createObjectURL(profilePic));
        }
  
        // Navigate based on the role
        if (formData.role === "student") {
          navigate('/profile');
        } else if (formData.role === "faculty") {
          navigate('/profile1');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed!');
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {preview && <img src={preview} alt="Preview" className="profile-preview" />}
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required />

        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electronics</option>
          <option value="ME">Mechanical</option>
          <option value="CE">Civil</option>
          <option value="EE">Electrical</option>
        </select>

        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        {formData.role === 'student' && (
          <>
            <label>Skills</label>
            <select name="skills" value={formData.skills} onChange={handleChange} required>
              <option value="">Select Skill</option>
              {[...hardSkills, ...softSkills, 'Other'].map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
            {formData.skills === 'Other' && (
              <input type="text" name="otherSkill" placeholder="Enter your skill" value={formData.otherSkill} onChange={handleChange} />
            )}

            <label>Field of Interest</label>
            <select name="interest" value={formData.interest} onChange={handleChange} required>
              <option value="">Select Interest</option>
              {interests.map(int => (
                <option key={int} value={int}>{int}</option>
              ))}
            </select>
            {formData.interest === 'Other' && (
              <input type="text" name="otherInterest" placeholder="Enter your interest" value={formData.otherInterest} onChange={handleChange} />
            )}

            <input type="text" name="linkedin" placeholder="LinkedIn Profile (optional)" value={formData.linkedin} onChange={handleChange} />
            <input type="text" name="achievements" placeholder="Achievements (optional)" value={formData.achievements} onChange={handleChange} />
            <input type="text" name="past_projects" placeholder="Past Projects (optional)" value={formData.past_projects} onChange={handleChange} />
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
