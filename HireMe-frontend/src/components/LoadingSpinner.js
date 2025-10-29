import React from "react";

function LoadingSpinner({ size = 24 }) {
  return (
    <div className="spinner" style={{ width: size, height: size, border: `3px solid #e2e8f0`, borderTop: `3px solid #0c4a6e`, borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
  );
}

export default LoadingSpinner;

