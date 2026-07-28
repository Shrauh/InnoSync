import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Collaboration.css';

const Collaboration = () => {
  const [students, setStudents] = useState([
    {
      name: 'Rahul mehra',
      email: 'amruta@gmail.com',
      department: 'ME',
      role: 'student',
      skills: 'Creativity',
      interest: 'AI',
      linkedin: 'amruta',
      achievements: 'design comp',
      past_projects: 'design',
      profile_pic_path: 'uploads/adchouhan.jpg'
    },
    {
      name: 'Patil Chaitali',
      email: 'caitali@gmail.com',
      department: 'CSE',
      role: 'student',
      skills: 'Teamwork',
      interest: 'Robotics',
      linkedin: '',
      achievements: '',
      past_projects: '',
      profile_pic_path: 'uploads/crpatil.jpg'
    },
    {
      name: 'SP',
      
      email: 'sp@gmail.com',
      department: 'EE',
      role: 'student',
      skills: 'Creativity',
      interest: 'Design',
      linkedin: 'https://www.linkedin.com/in/sp',
      achievements: 'Hackathon Winner',
      past_projects: 'Web Design',
      profile_pic_path: 'uploads/Screenshot 2025-01-09 145938.png'
    },
    {
      name: 'Shweta Pandit Gaidhani',
      email: 'spgaidhani371123@kkwagh.edu.in',
      department: 'CSE',
      role: 'student',
      skills: 'Teamwork',
      interest: 'IoT',
      linkedin: 'https://www.linkedin.com/in/spg',
      achievements: 'Company Inventor',
      past_projects: 'Food Project',
      profile_pic_path: 'uploads/sbshinde.jpg'
    },
    // ----- Dummy Students Start -----
    ...Array.from({ length: 71 }, (_, i) => {
      const names = [
        'Aarav Sharma', 'Anaya Reddy', 'Rohan Deshmukh', 'Ishita Mehta', 'Vivaan Patel', 'Diya Joshi', 'Arjun Iyer',
        'Meera Kulkarni', 'Kabir Sinha', 'Nisha Bansal', 'Aditya Rao', 'Priya Nair', 'Krish Shah', 'Aanya Dubey',
        'Yash Verma', 'Tanya Kaur', 'Neel Singh', 'Saanvi Jain', 'Om Mishra', 'Aarti Pawar', 'Veer Kapoor', 'Sneha Salvi',
        'Harshad Bhagat', 'Kavya Goyal', 'Manav Thakur', 'Isha Naik', 'Parth Chauhan', 'Riya Sengupta', 'Atharv Dixit',
        'Nandini Joshi', 'Dhruv Patil', 'Anjali Chauhan', 'Tanishq Sawant', 'Ritika Agarwal', 'Rajat Pillai',
        'Mitali Shetty', 'Shubham Gokhale', 'Aishwarya Desai', 'Arnav Kale', 'Tanvi Bhatt', 'Siddharth Menon',
        'Swara Kadam', 'Laksh Yadav', 'Bhavana Dube', 'Aryan Kohli', 'Prisha Rane', 'Kunal Pandey', 'Radhika Shah',
        'Sahil Jadhav', 'Charvi Borkar', 'Ayush Saxena', 'Heena Tamboli', 'Sarthak Joshi', 'Naina Mehra', 'Dev Tyagi',
        'Reeva Shinde', 'Tarun Rao', 'Kiara Gaekwad', 'Anshul Bansode', 'Meenal Patankar', 'Varun More', 'Suhana Rawal',
        'Aniket Kshirsagar', 'Garima Khare', 'Mohit Bhonsle', 'Avni Raut', 'Chinmay Dalvi', 'Shreya Thombre',
        'Sanket Bhoyar', 'Rupal Zope', 'Devika Bhandari'
      ];
      const interests = ['IoT', 'Robotics', 'AI', 'Web Dev', 'Design', 'ML', 'Blockchain'];
      const skills = ['Teamwork', 'Creativity', 'Leadership', 'Problem Solving', 'Communication'];
      const departments = ['CSE', 'IT', 'ME', 'EE', 'ECE'];
      const name = names[i];
      return {
        name,
        email: `${name.toLowerCase().split(' ').join('.')}@example.com`,
        department: departments[i % departments.length],
        role: 'student',
        skills: skills[i % skills.length],
        interest: interests[i % interests.length],
        linkedin: `https://linkedin.com/in/${name.toLowerCase().replace(/ /g, '')}`,
        achievements: 'None',
        past_projects: 'Student project',
        profile_pic_path: `uploads/default${(i % 10) + 1}.jpg` // Use default images like default1.jpg...default10.jpg
      };
    })
    // ----- Dummy Students End -----
  ]);

  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) =>
        student.interest.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleRequest = (receiverEmail) => {
    console.log(`Sending collaboration request to ${receiverEmail}`);
    alert('Collaboration request sent!');
  };

  return (
    <div className="collab-container">
      <h2 className="collab-title">Find Collaborators</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by interest..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="collab-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.email} className="collab-card">
              <img
                src={student.profile_pic_path}
                alt="Profile"
                className="collab-img"
              />
              <h3 className="collab-name">{student.name}</h3>
              <p className="collab-department">{student.department}</p>
              <p className="collab-interests">
                <strong>Interests:</strong> {student.interest}
              </p>
              <button
                onClick={() => handleRequest(student.email)}
                className="collab-btn"
              >
                Send Collaboration Request
              </button>
              <Link
                to={`/profile/${student.email}`}
                className="collab-view-profile-btn"
              >
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <p>No students found matching the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Collaboration;

/*import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Collaboration.css';

const Collaboration = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('email');

    // Fetch current user data
    fetch(`http://localhost:8000/api/user?email=${userEmail}`)
      .then(res => res.json())
      .then(data => setCurrentUser(data))
      .catch(err => console.error('Error fetching user:', err));

    // Fetch all students
    fetch('http://localhost:8000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  const handleRequest = async (receiverEmail, receiverName, receiverProfileImage) => {
    try {
      const payload = {
        sender_email: currentUser.email,
        receiver_email: receiverEmail,
        sender_name: currentUser.firstname,
        sender_profile_image: currentUser.profile_image,
        receiver_name: receiverName,
        receiver_profile_image: receiverProfileImage
      };

      await fetch('http://localhost:8000/collab/send-collab-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      alert('Collaboration request sent!');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request.');
    }
  };

  const sharedInterests = (studentInterests = []) => {
    if (!Array.isArray(currentUser?.interests)) return [];
    return studentInterests.filter(interest => currentUser.interests.includes(interest));
  };

  const filteredStudents = students.filter(student =>
    sharedInterests(student.interests).length > 0 &&
    student.email !== currentUser?.email &&
    student.firstname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="collab-container">
      <h2 className="collab-title">Find Collaborators</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name or interest..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="collab-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => {
            const commonInterests = sharedInterests(student.interests);
            return (
              <div key={student.email} className="collab-card">
                <img
                  src={student.profile_image}
                  alt="Profile"
                  className="collab-img"
                />
                <h3 className="collab-name">{student.firstname}</h3>
                <p className="collab-department">{student.department}</p>
                <p className="collab-interests">
                  <strong>Shared Interests:</strong> {commonInterests.join(', ') || 'None'}
                </p>
                <button
                  onClick={() => handleRequest(student.email, student.firstname, student.profile_image)}
                  className="collab-btn"
                >
                  Send Collaboration Request
                </button>
                <Link to={`/profile/${student.email}`} className="collab-view-profile-btn">
                  View Profile
                </Link>
              </div>
            );
          })
        ) : (
          <p>No matching students found.</p>
        )}
      </div>
    </div>
  );
};

export default Collaboration;*/

/*import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages
import './Collaboration.css';

const Collaboration = () => {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Dummy student data
  const dummyStudents = [
    {
      email: 'arjun@example.com',
      name: 'Arjun Kumar',
      department: 'Computer Science',
      profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
      interests: ['AI', 'Machine Learning', 'Robotics'],
      bio: 'Arjun is passionate about AI and robotics. He is currently working on a robotics project.',
    },
    {
      email: 'aisha@example.com',
      name: 'Aisha Gupta',
      department: 'Electronics',
      profile_image: 'https://randomuser.me/api/portraits/women/2.jpg',
      interests: ['IoT', 'Embedded Systems'],
      bio: 'Aisha is an embedded systems engineer. She loves working on IoT-based projects.',
    },
    {
      email: 'ravi@example.com',
      name: 'Ravi Sharma',
      department: 'Mechanical Engineering',
      profile_image: 'https://randomuser.me/api/portraits/men/3.jpg',
      interests: ['Automobile Design', '3D Printing'],
      bio: 'Ravi is a mechanical engineer who enjoys designing new automobile components.',
    },
    {
      email: 'neha@example.com',
      name: 'Neha Reddy',
      department: 'Electrical Engineering',
      profile_image: 'https://randomuser.me/api/portraits/women/4.jpg',
      interests: ['Power Systems', 'Circuit Design'],
      bio: 'Neha is an electrical engineer specializing in power systems and circuit design.',
    },
    {
      email: 'vikram@example.com',
      name: 'Vikram Singh',
      department: 'Civil Engineering',
      profile_image: 'https://randomuser.me/api/portraits/men/5.jpg',
      interests: ['Construction', 'Structural Engineering'],
      bio: 'Vikram works in construction management and is passionate about structural engineering.',
    },
  ];

  useEffect(() => {
    // Set the current user (for testing, this could also be hardcoded)
    setCurrentUser({
      email: 'user@example.com',
      name: 'Test User',
      department: 'Computer Science',
      profile_image: 'https://randomuser.me/api/portraits/men/6.jpg',
      interests: ['AI', 'Machine Learning'],
    });

    // Use the dummy students data for now
    setStudents(dummyStudents);
  }, []);

  const handleRequest = async (receiverEmail) => {
    try {
      // Fixed: Corrected template string syntax
      console.log(`Sending collaboration request from ${currentUser.email} to ${receiverEmail}`);
      alert('Collaboration request sent!');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request.');
    }
  };

  const sharedInterests = (studentInterests = []) => {
    if (!Array.isArray(currentUser?.interests)) return [];
    return studentInterests.filter(interest => currentUser.interests.includes(interest));
  };

  return (
    <div className="collab-container">
      <h2 className="collab-title">Find Collaborators</h2>
      <div className="collab-grid">
        {students.length > 0 ? (
          students.map(student => {
            const commonInterests = sharedInterests(student.interests);
            return (
              <div key={student.email} className="collab-card">
                <img
                  src={student.profile_image}
                  alt="Profile"
                  className="collab-img"
                />
                <h3 className="collab-name">{student.name}</h3>
                <p className="collab-department">{student.department}</p>
                <p className="collab-interests">
                  <strong>Shared Interests:</strong> {commonInterests.join(', ') || 'None'}
                </p>
                <button
                  onClick={() => handleRequest(student.email)}
                  className="collab-btn"
                >
                  Send Collaboration Request
                </button>
                {/* Fixed: Corrected template string for dynamic URL }
                <Link to={`/profile/${student.email}`} className="collab-view-profile-btn">
                  View Profile
                </Link>
              </div>
            );
          })
        ) : (
          <p>No students found. Make sure the API is returning data.</p>
        )}
      </div>
    </div>
  );
};

export default Collaboration;*/



/*import React, { useEffect, useState } from 'react';
import './Collaboration.css'; // Assuming you have styles for collaboration

const Collaboration = () => {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch students and user details
  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('email'); // Ensure this is set during login

      if (!email) {
        console.warn("User email not found in localStorage.");
        return;
      }

      try {
        // Fetch the current user's data
        const userRes = await fetch(`http://localhost:8000/api/user?email=${email}`);
        const userData = await userRes.json();
        setCurrentUser(userData);

        // Fetch all students from the backend
        const studentsRes = await fetch('http://localhost:8000/api/students');
        const allStudents = await studentsRes.json();

        // Filter students with matching interests
        const filteredStudents = allStudents.filter(student =>
          student.email !== email && student.interests?.some(interest => userData.interests?.includes(interest))
        );

        setStudents(filteredStudents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRequest = async (receiverEmail, receiverName, receiverProfileImage) => {
    if (!currentUser) return;

    const data = {
      sender_email: currentUser.email,
      receiver_email: receiverEmail,
      sender_name: currentUser.name,
      sender_profile_image: currentUser.profile_img || '',
      receiver_name: receiverName,
      receiver_profile_image: receiverProfileImage || '',
    };

    try {
      const res = await fetch('http://localhost:8000/api/send-collab-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail);
      }

      alert('Collaboration request sent!');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request: ' + error.message);
    }
  };

  return (
    <div className="collab-container">
      <h2 className="collab-title">Find Collaborators</h2>
      <div className="collab-grid">
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student.email} className="collab-card">
              <img
                src={student.profile_img || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="collab-img"
              />
              <h3 className="collab-name">{student.name}</h3>
              <p className="collab-department">{student.department}</p>
              <p className="collab-interests">
                <strong>Shared Interests:</strong> {student.interests?.join(', ') || 'None'}
              </p>
              <button
                onClick={() =>
                  handleRequest(student.email, student.name, student.profile_img)
                }
                className="collab-btn"
              >
                Send Collaboration Request
              </button>
              <a href={`/profile/${student.email}`} className="collab-view-profile-btn">
                View Profile
              </a>
            </div>
          ))
        ) : (
          <p>No matching collaborators found.</p>
        )}
      </div>
    </div>
  );
};

export default Collaboration;
*/