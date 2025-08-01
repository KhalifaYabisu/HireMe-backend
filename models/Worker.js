const API_URL = 'https://workwhiz-backend.onrender.com/api/workers';

// Fetch all workers
export const getWorkers = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching workers:', err);
    return null;
  }
};

// Add a new worker
export const addWorker = async (workerData) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workerData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error adding worker:', err);
    return null;
  }
};
