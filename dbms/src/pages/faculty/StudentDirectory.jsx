import React from 'react';

export default function StudentDirectory() {
  const students = [
    {
      name: 'Rohit Kumar',
      email: 'rohit@example.com',
      skills: ['React', 'Node.js'],
      interests: ['Web Dev', 'Startups'],
      project: 'Crowdfunding Platform',
    },
    {
      name: 'Simran Kaur',
      email: 'simran@example.com',
      skills: ['Python', 'Data Science'],
      interests: ['AI', 'Healthcare'],
      project: 'Medical Report Analysis',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎓 Student Directory</h2>
      {students.map((student, idx) => (
        <div key={idx} className="border p-4 mb-4 rounded shadow">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Skills:</strong> {student.skills.join(', ')}</p>
          <p><strong>Interests:</strong> {student.interests.join(', ')}</p>
          <p><strong>Project:</strong> {student.project}</p>
        </div>
      ))}
    </div>
  );
}
