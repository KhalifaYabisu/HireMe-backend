import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import AreaModal from "./AreaModal";

function Navbar() {
  const navigate = useNavigate();
  const [areaOpen, setAreaOpen] = useState(false);
  const token = useMemo(() => localStorage.getItem("token"), []);
  const logout = () => { localStorage.removeItem("token"); window.location.reload(); };
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="HireMe home">
          <img src="/logo.svg" alt="HireMe" className="brand-logo" />
        </Link>
        <nav className="nav-links">
          <button onClick={() => setAreaOpen(true)} className="btn btn-secondary" style={{ border: 0, cursor: 'pointer' }}>Set Your Area</button>
          <NavLink to="/jobs">Find Jobs</NavLink>
          <NavLink to="/post-job">Post a Job</NavLink>
          {!token ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup" className="btn btn-primary">Sign Up</NavLink>
            </>
          ) : (
            <button onClick={logout} className="btn btn-primary" style={{ border: 0, cursor: 'pointer' }}>Logout</button>
          )}
        </nav>
      </div>
      <AreaModal open={areaOpen} onClose={() => setAreaOpen(false)} onSave={() => navigate('/jobs')} />
    </header>
  );
}

export default Navbar;


