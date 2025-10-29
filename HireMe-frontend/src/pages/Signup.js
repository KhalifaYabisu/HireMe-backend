import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../services/api";
import { useToast } from "../contexts/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";

function Signup() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await api("/api/auth/signup", { method: "POST", body: JSON.stringify({ name, email, phone, password }) });
      setToken(data.token);
      showToast("Account created successfully!", "success");
      setTimeout(() => navigate("/jobs"), 1000);
    } catch (e) {
      setErr(e.message);
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <form className="card" onSubmit={onSubmit}>
        <h2>Sign Up</h2>
        {err && <p className="muted" style={{ color: "#c2410c" }}>{err}</p>}
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size={16} /> : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default Signup;


