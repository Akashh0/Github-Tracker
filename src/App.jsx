// src/App.jsx

import React, { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/NavBar";
import Particles from "./components/Particles/Particles";
import GlobeView from "./components/GlobeView";

import fetchRecentUsers from "./utils/fetchGitHubUsers";
import { geocodeLocations } from "./utils/geocodeLocations";

function App() {
  const [userPins, setUserPins] = useState([]);

  useEffect(() => {
    const fetchAndGeocode = async () => {
      const users = await fetchRecentUsers();
      const geocoded = await geocodeLocations(users);
      setUserPins(geocoded);
    };

    fetchAndGeocode();
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      {/* Particles Background */}
      <Particles
        particleColors={["#ffffff"]}
        particleCount={500}
        particleSpread={8}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className="particle-bg"
      />

      {/* 3D Globe with User Pins */}
      <GlobeView userPins={userPins} />
    </div>
  );
}

export default App;
