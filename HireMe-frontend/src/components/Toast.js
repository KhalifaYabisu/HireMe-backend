import React, { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`} style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <span>{message}</span>
      <button onClick={onClose} style={{ background: "none", border: 0, cursor: "pointer", marginLeft: 12 }}>×</button>
    </div>
  );
}

export default Toast;

