import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../services/api";
import { useToast } from "../contexts/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setToken(data.token);
      showToast("Successfully logged in!", "success");
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
        <h2>Login</h2>
        {err && <p className="muted" style={{ color: "#c2410c" }}>{err}</p>}
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size={16} /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;


