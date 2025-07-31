import React from 'react';

export default function UnderGuidance() {
  const underGuidance = [
    {
      name: 'Sneha Singh',
      email: 'sneha@example.com',
      project: 'Smart Parking System',
    },
    {
      name: 'Yash Jain',
      email: 'yash@example.com',
      project: 'Blockchain Voting App',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧑‍🏫 Under Your Guidance</h2>
      {underGuidance.map((student, idx) => (
        <div key={idx} className="border p-4 mb-4 rounded shadow">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Project:</strong> {student.project}</p>
        </div>
      ))}
    </div>
  );
}
