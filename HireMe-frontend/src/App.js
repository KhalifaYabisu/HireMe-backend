<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import EnvDebug from "./components/EnvDebug";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  const showEnv = (process.env.REACT_APP_SHOW_ENV === '1') || (process.env.NODE_ENV !== 'production');
  return (
    <ToastProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
          {showEnv && <EnvDebug />}
        </div>
      </Router>
    </ToastProvider>
=======
import React, { useEffect, useState } from 'react';

function App() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/workers') // Change port if your backend uses a different one
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
>>>>>>> 1a2d2fcb9b3ec92d75c9e7d6b714270817e9953b
  );
}

export default App;
