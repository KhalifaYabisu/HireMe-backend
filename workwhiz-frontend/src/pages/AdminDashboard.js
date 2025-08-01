import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const token = localStorage.getItem('token');

  const fetchWorkers = async () => {
    const res = await fetch('https://workwhiz-backend.onrender.com/api/workers');
    const data = await res.json();
    setWorkers(data.workers);
  };

  const deleteWorker = async id => {
    await fetch(`https://workwhiz-backend.onrender.com/api/workers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchWorkers();
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {workers.map(worker => (
          <li key={worker._id}>
            {worker.name} - {worker.skill}
            <button onClick={() => deleteWorker(worker._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
