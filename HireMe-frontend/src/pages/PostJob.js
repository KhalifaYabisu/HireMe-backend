import React, { useState } from "react";
import { api } from "../services/api";
import { useToast } from "../contexts/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";

function PostJob() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api("/api/workers", {
        method: "POST",
        body: JSON.stringify({ name, job, location })
      });
      showToast("Job posted successfully!", "success");
      setName("");
      setJob("");
      setLocation("");
    } catch (e) {
      showToast(e.message || "Could not post job. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <h2>Post a Job</h2>
      <form className="card" onSubmit={onSubmit}>
        <label>Contact Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Role Needed</label>
        <input value={job} onChange={(e) => setJob(e.target.value)} required />
        <label>Location / Area</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? <LoadingSpinner size={16} /> : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default PostJob;


