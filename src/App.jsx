// src/App.jsx

import React, { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/NavBar";
import GlobeView from "./components/GlobeView";
import GitHubUserList from "./components/GitHubUserList";
import LightRays from "./components/LightRays/LightRays"
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
      <header className="intro-header">
        <h1 className="intro-text">Explore Real-Time GitHub Activity Around the World!</h1>
      </header>
      <LightRays
      raysOrigin="top-center"
      raysColor="#00ffff"
      raysSpeed={1.5}
      lightSpread={0.8}
      rayLength={1.2}
      followMouse={true}
      mouseInfluence={0.1}
      noiseAmount={0.1}
      distortion={0.05}
      className="custom-rays"
      />
      <div className="main-content">
        <div className="globe-container">
          <GlobeView userPins={userPins} />
        </div>
        <div className="userlist-container">
          <GitHubUserList users={userPins} />
        </div>
      </div>
    </div>
  );
}

export default App;
