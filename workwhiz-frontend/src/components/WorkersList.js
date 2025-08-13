import React, { useEffect, useState } from 'react';

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://workwhiz-backend.onrender.com/api/workers')
      .then(res => res.json())
      .then(data => {
        setWorkers(data.workers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workers:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading workers...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Workers</h2>
      {workers.length === 0 ? (
        <p>No workers available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {workers.map(worker => (
            <li key={worker._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h3>{worker.name}</h3>
              <p><strong>Occupation:</strong> {worker.occupation}</p>
              <p><strong>Location:</strong> {worker.location}</p>
              <p><strong>Phone:</strong> {worker.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkersList;
