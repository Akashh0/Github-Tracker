import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import countries from "../data/countries.json";
import "./GlobeView.css";
import * as THREE from "three";

function GlobeView({ userPins = [] }) {
  const globeRef = useRef();

  useEffect(() => {
    // Fix country center coords for both Polygon and MultiPolygon
    countries.features.forEach((f) => {
      const coords = f.geometry.coordinates;
      let latSum = 0;
      let lngSum = 0;
      let count = 0;

      if (f.geometry.type === "Polygon") {
        coords[0].forEach(([lng, lat]) => {
          latSum += lat;
          lngSum += lng;
          count++;
        });
      } else if (f.geometry.type === "MultiPolygon") {
        coords.forEach((polygon) => {
          polygon[0].forEach(([lng, lat]) => {
            latSum += lat;
            lngSum += lng;
            count++;
          });
        });
      }

      f.properties.latitude = latSum / count;
      f.properties.longitude = lngSum / count;
    });

    const globe = Globe()(globeRef.current)
    .globeImageUrl(null)
    .showGlobe(true)
    .globeMaterial(new THREE.MeshPhongMaterial({ color: "#4B0082" })) // dark violet
    .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
    .backgroundColor("rgba(0,0,0,0)") // transparent
    .showAtmosphere(true)
    .atmosphereColor("white")
    .atmosphereAltitude(0.15)
    


      // Neon Country Polygons
      .polygonsData(countries.features)
      .polygonCapColor(() => "rgba(112, 0, 163, 1)")
      .polygonSideColor(() => "rgba(107, 0, 110, 1)")
      .polygonStrokeColor(() => "rgba(153, 0, 255, 0.9)")
      .polygonAltitude(0.01)

      // Neon Country Labels
      .labelsData(countries.features)
      .labelLat(d => d.properties.latitude)
      .labelLng(d => d.properties.longitude)
      .labelText(d => d.properties.ADMIN || "")
      .labelSize(0.8)
      .labelDotRadius(0.2)
      .labelAltitude(0.04)
      .labelColor(() => "white")
      .labelResolution(2);

    // Add user pins if available
    if (userPins.length > 0) {
      globe
        .pointsData(userPins)
        .pointLat(d => d.lat)
        .pointLng(d => d.lng)
        .pointColor(() => "#ffffff")
        .pointAltitude(0.03)
        .pointRadius(0.6);
    }

    // Camera & Controls
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;
    globe.controls().enableZoom = true;
    globe.camera().position.z = 275;

    // Renderer styling
    const renderer = globe.renderer();
    renderer.setClearColor("#000000", 0); // black, fully transparent
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    // Responsive square layout
    const updateGlobeSize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.65;
      globe.width(size);
      globe.height(size);
    };

    updateGlobeSize();
    window.addEventListener("resize", updateGlobeSize);
    return () => window.removeEventListener("resize", updateGlobeSize);
  }, [userPins]);

  return (
    <div className="globe-wrapper">
      <div ref={globeRef} className="globe-container" />
    </div>
  );
}

export default GlobeView;
