import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>
        Built with 💙 by <a href="https://github.com/Akashh0" target="_blank" rel="noopener noreferrer">Akash</a>
      </p>
      <div className="footer-links">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">Spotify</a>
        <a href="#top">Back to Top ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
