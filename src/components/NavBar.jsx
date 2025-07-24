import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src='https://imgs.search.brave.com/6SmqMH7CrZFBD6jWHNdO0YDQWfddOFttbqukE4-PCSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/cG5nbG9nby5jb20v/aW1hZ2VzLzE3MDE1/MjcxMDRia2FzaC1s/b2dvLXBuZy5wbmc' alt="Logo" className="logo" />
        <span className="app-name">GitHub Tracker</span>
      </div>
      <div className="navbar-right">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">About</a>
        <a href="#" className="nav-link">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
