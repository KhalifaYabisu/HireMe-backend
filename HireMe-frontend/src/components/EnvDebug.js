import React, { useEffect, useState } from "react";

function EnvDebug() {
  const [backend, setBackend] = useState(process.env.REACT_APP_API_BASE || "");
  const [status, setStatus] = useState("...");

  useEffect(() => {
    let cancelled = false;
    async function ping() {
      try {
        const res = await fetch(`${backend || "http://localhost:5000"}/`);
        const text = await res.text();
        if (!cancelled) setStatus(res.ok ? `OK: ${text}` : `ERR: ${res.status}`);
      } catch (e) {
        if (!cancelled) setStatus("ERR: no response");
      }
    }
    ping();
    return () => { cancelled = true; };
  }, [backend]);

  const token = !!localStorage.getItem("token");
  const area = localStorage.getItem("area") || "(none)";

  return (
    <div style={{ position: "fixed", left: 10, bottom: 10, zIndex: 1000, background: "#fff", border: "1px solid #eef0f2", borderRadius: 8, padding: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: 12 }}>
      <div><strong>Env:</strong> {process.env.NODE_ENV}</div>
      <div><strong>Frontend:</strong> {window.location.origin}</div>
      <div><strong>API Base:</strong> {backend || "http://localhost:5000"}</div>
      <div><strong>API Health:</strong> {status}</div>
      <div><strong>Authed:</strong> {token ? "yes" : "no"}</div>
      <div><strong>Area:</strong> {area}</div>
    </div>
  );
}

export default EnvDebug;
