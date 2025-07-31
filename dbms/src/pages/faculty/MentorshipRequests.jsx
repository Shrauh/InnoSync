import React from 'react';

export default function MentorshipRequests() {
  const mentorshipRequests = [
    {
      name: 'Riya Mehta',
      email: 'riya@example.com',
      interests: ['AI', 'ML'],
      project: 'AI-powered attendance system',
    },
    {
      name: 'Aman Joshi',
      email: 'aman@example.com',
      interests: ['Web Dev'],
      project: 'Alumni Connect Portal',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📩 Mentorship Requests</h2>
      {mentorshipRequests.map((student, idx) => (
        <div key={idx} className="border p-4 mb-4 rounded shadow">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Interests:</strong> {student.interests.join(', ')}</p>
          <p><strong>Project:</strong> {student.project}</p>
          <div className="mt-2">
            <button className="mr-2 bg-green-500 text-white px-3 py-1 rounded">Accept</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
