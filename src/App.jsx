// src/App.jsx

import React, { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/NavBar";
import GlobeView from "./components/GlobeView";
import GitHubUserList from "./components/GitHubUserList";

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
