import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/workers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWorkers(data.data);
        } else {
          setError(data.message || 'Failed to fetch workers');
        }
      })
      .catch(err => setError('Error fetching data'));
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {workers.map((worker) => (
          <li key={worker._id}>
            {worker.name} – {worker.skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
