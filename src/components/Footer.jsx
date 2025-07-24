import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>
        Built with 💙 by<a href="https://github.com/Akashh0" target="_blank" rel="noopener noreferrer">Akash</a>
      </p>
      <div className="footer-links">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="www.linkedin.com/in/akash-krishnan-m" target="_blank" rel="noopener noreferrer">Linkedin</a>
      </div>
    </footer>
  );
};

export default Footer;
