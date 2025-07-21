import React from "react";
import Particles from "./components/Particles/Particles";
import "./App.css"; // Importing your traditional CSS
import Navbar from "./components/NavBar";
import GlobeView from "./components/GlobeView";

function App() {
  return (
    <div className="app-container">
      {/* Fullscreen Particle Background */}
      <Navbar />
      
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
      <GlobeView />
    </div>
  );
}

export default App;
