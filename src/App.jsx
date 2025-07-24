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
import RepoSearch from "./components/RepoSearch";
import { fetchRepoCommits } from "./utils/fetchRepoCommits";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";



function App() {
  const [userPins, setUserPins] = useState([]);
  const [pushActivity, setPushActivity] = useState([]);
  const [pushArcs, setPushArcs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [commits, setCommits] = useState([]);

  const handleRepoSearch = async (repoName) => {
      const commitData = await fetchRepoCommits(repoName);
      setCommits(commitData);
      };


  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true); // 🔹 Start loading

      const users = await fetchRecentUsers();
      const geocoded = await geocodeLocations(users);
      setUserPins(geocoded);

      const activity = await fetchPushActivity();
      setPushActivity(activity);

      


      // Arcs for each user
      const arcs = geocoded.map((user) => {
        const { lat, lng } = user;
        const { lat: endLat, lng: endLng } = getRandomLatLng();
        return {
          startLat: lat,
          startLng: lng,
          endLat,
          endLng,
          color: ["#ffffffff", "#ff00ff"],
        };
      });

      setPushArcs(arcs);
      setLoading(false); // 🔹 Done loading
    };

    fetchAll();
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <header className="intro-header">
        <h1 className="intro-text">Explore Real-Time GitHub Activity Around the World!</h1>
      </header>

      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={1.5}
        lightSpread={1.5}
        rayLength={2.5}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />

      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
          <p className="loading-text">Loading GitHub activity...</p>
        </div>
      ) : (
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

          <div className="repo-search-wrapper">
            <RepoSearch onSearch={handleRepoSearch} commits={commits} />
          </div>

          <div className="music-wrapper">
            <MusicPlayer />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
