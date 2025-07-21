import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import countries from "../data/countries.json";
import "./GlobeView.css";
import * as THREE from "three";

function GlobeView() {
  const globeRef = useRef();

  useEffect(() => {
    // Calculate country center if not available
    countries.features.forEach((f) => {
      if (!f.properties.latitude || !f.properties.longitude) {
        const coords = f.geometry.coordinates[0];
        const lats = coords.map((c) => c[1]);
        const lngs = coords.map((c) => c[0]);
        f.properties.latitude = lats.reduce((a, b) => a + b, 0) / lats.length;
        f.properties.longitude = lngs.reduce((a, b) => a + b, 0) / lngs.length;
      }
    });

    const globe = Globe()(globeRef.current)
      .globeImageUrl(null)
      .backgroundColor("#000000") // solid black background
      .showGlobe(false)
      .showAtmosphere(false)

      // Polygon Styling
      .polygonsData(countries.features)
      .polygonCapColor(() => "rgba(30, 30, 30, 1)")
      .polygonSideColor(() => "rgba(20, 20, 20, 1)")
      .polygonStrokeColor(() => "rgba(0, 255, 255, 0.9)")
      .polygonAltitude(0.01)

      // Country Labels
      .labelsData(countries.features)
      .labelLat((d) => d.properties.latitude)
      .labelLng((d) => d.properties.longitude)
      .labelText((d) => d.properties.ADMIN || "")
      .labelSize(0.8)
      .labelDotRadius(0.2)
      .labelAltitude(0.04) // ⬅️ Lift higher above globe
      .labelColor(() => "#00ffff") // neon cyan
      .labelResolution(2);

    // Controls
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;
    globe.controls().enableZoom = true;
    globe.camera().position.z = 250;

    // Renderer styling
    const renderer = globe.renderer();
    renderer.setClearColor("#000000");
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    // Resize to square (responsive)
    const updateGlobeSize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.65;
      globe.width(size);
      globe.height(size);
    };

    updateGlobeSize();
    window.addEventListener("resize", updateGlobeSize);
    return () => window.removeEventListener("resize", updateGlobeSize);
  }, []);

  return (
    <div className="globe-wrapper">
      <div ref={globeRef} className="globe-container" />
    </div>
  );
}

export default GlobeView;
