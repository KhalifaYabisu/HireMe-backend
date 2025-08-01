import React, { useEffect, useState } from 'react';

const Home = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch('https://workwhiz-backend.onrender.com/api/workers')
      .then(res => res.json())
      .then(data => setWorkers(data.workers))
      .catch(err => console.error('Error fetching workers:', err));
  }, []);

  return (
    <div>
      <h2>Available Workers</h2>
      <ul>
        {workers.map(worker => (
          <li key={worker._id}>
            {worker.name} - {worker.skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
