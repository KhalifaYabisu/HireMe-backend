import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
        <div className="footer-copy">© 2025 The 84 Percent</div>
      </div>
    </footer>
  );
}

export default Footer;


