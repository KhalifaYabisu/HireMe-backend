import React, { useEffect, useState } from 'react';

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://workwhiz-backend.onrender.com/api/workers')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch workers');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setWorkers(data.workers);
        } else {
          setError('No workers found');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Workers</h2>

      {loading && <p>Loading workers...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && workers.length === 0 && (
        <p>No workers available.</p>
      )}

      {!loading && !error && workers.length > 0 && (
        <ul>
          {workers.map((worker) => (
            <li key={worker._id}>
              <strong>{worker.name}</strong> — {worker.occupation} ({worker.location})<br />
              📞 {worker.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkersList;
