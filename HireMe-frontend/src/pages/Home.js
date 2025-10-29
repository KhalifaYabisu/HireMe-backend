import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">Find jobs around your area</h1>
        <p className="hero-subtitle">Set your area and discover opportunities nearby.</p>
        <div className="hero-actions">
          <Link to="/jobs" className="btn btn-primary">Find Jobs</Link>
          <Link to="/post-job" className="btn btn-secondary">Post a Job</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
