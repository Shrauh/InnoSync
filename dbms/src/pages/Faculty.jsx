import React from "react";
import { Mail, Phone } from "lucide-react";

import ydbhise from "../assets/ydbhise.jpg";
import pdrakibe from "../assets/pdrakibe.jpg";
import crpatil from "../assets/crpatil.jpg";
import adchouhan from "../assets/adchouhan.jpg";
import pgkatware from "../assets/pgkatware.jpg";
import sbshinde from "../assets/sbshinde.jpg";
import umrane from "../assets/umrane.jpg";

import "./Faculty.css";

const facultyData = [
  {
    img: ydbhise,
    name: "Prof. Y. D. Bhise",
    contact: "9404552633",
    department: "Computer Engineering",
    email: "ydbhise@kkwagh.edu.in",
    research: "Mobile Computing & IoT",
  },
  {
    img: pdrakibe,
    name: "Ms. P. D. Rakibe",
    contact: "2532221235",
    department: "Computer Engineering",
    email: "pdrakibe@kkwagh.edu.in",
    research: "Network Security, Data Mining, Blockchain Technology",
  },
  
  {
    img: crpatil,
    name: "Prof. C. R. Patil",
    contact: "9422249949",
    department: "Computer Engineering",
    email: "crpatil@kkwagh.edu.in",
    research: "Machine Learning & Image Processing",
  },
  {
    img: adchouhan,
    name: "Prof. A. D. Chouhan",
    contact: "7030808007",
    department: "Computer Engineering",
    email: "adchouhan@kkwagh.edu.in",
    research: "Artificial Intelligence & Big Data",
  },
  {
    img: pgkatware,
    name: "Ms. P. G. Katware",
    contact: "9637979813",
    department: "AI & DS",
    email: "pgkatware@kkwagh.edu.in",
    research: "Cloud technology & Information Security",
  },
  {
    img: sbshinde,
    name: "Prof. S. B. Shinde",
    contact: "9673358124",
    department: "AI & DS",
    email: "sbshinde@kkwagh.edu.in",
    research: "Information Security & Data Mining",
  },
  {
    img: umrane,
    name: "Prof. U. A. Umrane",
    contact: "9881728224",
    department: "Computer Engineering",
    email: "umrane@kkwagh.edu.in",
    research: "Cyber Security & Blockchain",
  },
];

const Faculty = () => {
  const openGmail = (email) => {
    window.open(`https://mail.google.com/mail/?view=cm&to=${email}`, "_blank");
  };

  return (
    <div className="faculty-wrapper">
      <div className="faculty-grid">
        {facultyData.map((faculty, index) => (
          <div className="faculty-card" key={index}>
            <img src={faculty.img} alt={faculty.name} className="faculty-img" />
            <div className="faculty-info">
              <h3>{faculty.name}</h3>
              <p>{faculty.department}</p>
              <p><Phone size={14} style={{ display: "inline" }} /> {faculty.contact}</p>
              <p className="email" onClick={() => openGmail(faculty.email)} style={{ cursor: "pointer", color: "#007bff" }}>
                <Mail size={14} style={{ display: "inline" }} /> {faculty.email}
              </p>
              <p><strong>Research:</strong> {faculty.research}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
