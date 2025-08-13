import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';

function Home() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await fetch('https://workwhiz-backend.onrender.com/api/workers');
        const data = await res.json();
        if (data.success) {
          setWorkers(data.workers);
        }
      } catch (err) {
        console.error('Failed to fetch workers:', err);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">WorkWhiz</h1>
        <Link to="/admin/login" className="text-blue-500 hover:underline text-sm">
          Admin Login
        </Link>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Available Workers</h2>
        {workers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {workers.map((worker) => (
              <div key={worker._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800">{worker.name}</h3>
                <p className="text-gray-600">{worker.occupation}</p>
                <p className="text-gray-500">{worker.location}</p>
                <p className="text-blue-600 font-semibold">{worker.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No workers available.</p>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Future: <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}
