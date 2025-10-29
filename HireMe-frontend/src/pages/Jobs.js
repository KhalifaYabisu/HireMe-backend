import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useToast } from "../contexts/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";

function Jobs() {
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("area");
    if (saved) setArea(saved);
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const data = await api("/api/workers");
      setWorkers(Array.isArray(data) ? data : data.workers || []);
    } catch (e) {
      showToast("Failed to load jobs. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const filtered = workers.filter((w) => {
    const matchesQuery = query ? (w.job || "").toLowerCase().includes(query.toLowerCase()) || (w.name || "").toLowerCase().includes(query.toLowerCase()) : true;
    const matchesArea = area ? (w.location || "").toLowerCase().includes(area.toLowerCase()) : true;
    return matchesQuery && matchesArea;
  });

  return (
    <div className="container">
      <h2>Find Jobs</h2>
      <div className="filters">
        <input placeholder="Search by role or name" value={query} onChange={(e) => setQuery(e.target.value)} />
        <input placeholder="Set your area" value={area} onChange={(e) => { setArea(e.target.value); localStorage.setItem("area", e.target.value); }} />
      </div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
          <LoadingSpinner size={32} />
        </div>
      ) : (
        <div className="grid">
          {filtered.map((w) => (
            <div className="card" key={w._id}>
              <h3>{w.name}</h3>
              <p className="muted">{w.job}</p>
              <p>{w.location}</p>
            </div>
          ))}
          {filtered.length === 0 && <p>No results found.</p>}
        </div>
      )}
    </div>
  );
}

export default Jobs;


