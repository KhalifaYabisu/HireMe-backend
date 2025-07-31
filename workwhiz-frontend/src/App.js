import React, { useEffect, useState } from 'react';

function App() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/workers') // <-- Keep this as-is IF your backend is still on port 3000

      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWorkers(data.data);
        } else {
          alert('Failed to fetch workers');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error fetching workers');
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Worker List</h1>
      <ul>
        {workers.map((worker) => (
          <li key={worker._id}>
            {worker.name} - {worker.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
