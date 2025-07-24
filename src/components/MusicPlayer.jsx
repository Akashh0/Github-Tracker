import React from "react";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  return (
    <div className="music-player-container">
      <h2>Vibe & Explore!</h2>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }} // ✅ FIXED: object, not string
        src="https://open.spotify.com/embed/track/6bNB5gxFX6Q87DbQWb8OWZ?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen // ✅ FIXED: camelCase
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MusicPlayer;
