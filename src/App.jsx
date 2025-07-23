import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import GlobeView from "./components/GlobeView";
import GitHubUserList from "./components/GitHubUserList";
import GitHubActivityTimeline from "./components/GitHubActivityTimeline";
import LightRays from "./components/LightRays/LightRays";
import fetchRecentUsers from "./utils/fetchGitHubUsers";
import { geocodeLocations } from "./utils/geocodeLocations";
import { fetchPushActivity } from "./utils/FetchPushActivity";
import { getRandomLatLng } from "./utils/getRandomLatLng"; 

function App() {
  const [userPins, setUserPins] = useState([]);
  const [pushActivity, setPushActivity] = useState([]);
  const [pushArcs, setPushArcs] = useState([]);

  useEffect(() => {
  const generatePushArcs = async () => {
    const users = await fetchRecentUsers();
    const geocoded = await geocodeLocations(users);
    setUserPins(geocoded);

    // Simulate a push arc per user
    const arcs = geocoded.map((user) => {
      const { lat, lng } = user;
      const { lat: endLat, lng: endLng } = getRandomLatLng(); // 👈 from helper
      return {
        startLat: lat,
        startLng: lng,
        endLat,
        endLng,
        color: ["#ffffffff", "#ff00ff"],
      };
    });

    setPushArcs(arcs);
  };

  generatePushArcs();
}, []);

  useEffect(() => {
    const fetchAndGeocode = async () => {
      const users = await fetchRecentUsers();
      const geocoded = await geocodeLocations(users);
      setUserPins(geocoded);
    };

    const fetchPushStats = async () => {
      const activity = await fetchPushActivity();
      console.log("🟢 GitHub Push Activity Fetched:", activity); // ✅ Logging here
      setPushActivity(activity);
    };

    fetchAndGeocode();
    fetchPushStats();
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <header className="intro-header">
        <h1 className="intro-text">
          Explore Real-Time GitHub Activity Around the World!
        </h1>
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
        <div className="globe-list-wrapper">
          <div className="globe-container">
            <GlobeView userPins={userPins} pushArcs={pushArcs} />
          </div>
          <GitHubUserList users={userPins} />
        </div>
        <div className="timeline-wrapper">
          <GitHubActivityTimeline activityData={pushActivity} />
        </div>
      </div>
    </div>
  );
}

export default App;
