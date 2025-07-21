import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import countries from "../data/countries.json";
import "./GlobeView.css";
import * as THREE from "three";

function GlobeView() {
  const globeRef = useRef();

  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .globeImageUrl(null)
      .backgroundColor("#000000ff") // keep background solid black
      .showGlobe(false)
      .showAtmosphere(false)
      .polygonsData(countries.features)
      .polygonCapColor(() => "rgba(30, 30, 30, 1)") // solid dark land
      .polygonSideColor(() => "rgba(20, 20, 20, 1)")
      .polygonStrokeColor(() => "rgba(0, 255, 255, 0.9)")
      .polygonAltitude(0.01);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;
    globe.controls().enableZoom = true;
    globe.camera().position.z = 250;

    const renderer = globe.renderer();
    renderer.setClearColor("#000000");
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    const updateGlobeSize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.65;
      globe.width(size);
      globe.height(size);
    };

    updateGlobeSize();
    window.addEventListener("resize", updateGlobeSize);

    return () => {
      window.removeEventListener("resize", updateGlobeSize);
    };
  }, []);

  return (
    <div className="globe-wrapper">
      <div ref={globeRef} className="globe-container" />
    </div>
  );
}

export default GlobeView;
