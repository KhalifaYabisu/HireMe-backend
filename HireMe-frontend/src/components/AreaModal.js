import React, { useEffect, useState } from "react";

function AreaModal({ open, onClose, onSave }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem("area") || "";
      setValue(saved);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div className="card" style={{ width: 420, maxWidth: "90%" }}>
        <h3 style={{ marginTop: 0 }}>Set your area</h3>
        <p className="muted" style={{ marginTop: 0 }}>We use this to filter jobs near you.</p>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. Lekki, Lagos" />
        <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "flex-end" }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { localStorage.setItem("area", value); onSave?.(value); onClose?.(); }}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AreaModal;


