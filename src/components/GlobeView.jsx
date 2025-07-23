import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import countries from "../data/countries.json";
import "./GlobeView.css";
import * as THREE from "three";

function GlobeView({ userPins = [], pushArcs = [] }) {
  const globeRef = useRef();

  useEffect(() => {
    // Compute country label coordinates
    countries.features.forEach((f) => {
      const coords = f.geometry.coordinates;
      let latSum = 0,
        lngSum = 0,
        count = 0;

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
      .globeMaterial(new THREE.MeshPhongMaterial({ color: "#4B0082" }))
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereColor("white")
      .atmosphereAltitude(0.15)

      // Country polygons
      .polygonsData(countries.features)
      .polygonCapColor(() => "rgba(112, 0, 163, 1)")
      .polygonSideColor(() => "rgba(107, 0, 110, 1)")
      .polygonStrokeColor(() => "rgba(153, 0, 255, 0.9)")
      .polygonAltitude(0.01)

      // Country labels
      .labelsData(countries.features)
      .labelLat((d) => d.properties.latitude)
      .labelLng((d) => d.properties.longitude)
      .labelText((d) => d.properties.ADMIN || "")
      .labelSize(0.8)
      .labelDotRadius(0.2)
      .labelAltitude(0.04)
      .labelColor(() => "white")
      .labelResolution(2);

    // Show all user pins, including those with default 0,0
    if (userPins.length > 0) {
      globe
        .pointsData(userPins)
        .pointLat((d) => d.lat)
        .pointLng((d) => d.lng)
        .pointColor(() => "#ffffff")
        .pointAltitude(0.03)
        .pointRadius(0.6);
    }

    // Add push arcs (only valid)
    const validArcs = pushArcs.filter(
      (d) => d.startLat && d.startLng && d.endLat && d.endLng
    );
    if (validArcs.length > 0) {
      globe
        .arcsData(validArcs)
        .arcStartLat((d) => d.startLat)
        .arcStartLng((d) => d.startLng)
        .arcEndLat((d) => d.endLat)
        .arcEndLng((d) => d.endLng)
        .arcColor(() => ["#ffffff", "#00ffff"])
        .arcAltitude(() => Math.random() * 0.25 + 0.15)
        .arcStroke(() => 0.4)
        .arcDashLength(0.4)
        .arcDashGap(1)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(4500);
    }

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;
    globe.controls().enableZoom = true;
    globe.camera().position.z = 275;

    const renderer = globe.renderer();
    renderer.setClearColor("#000000", 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    const updateGlobeSize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.65;
      globe.width(size);
      globe.height(size);
    };

    updateGlobeSize();
    window.addEventListener("resize", updateGlobeSize);
    return () => window.removeEventListener("resize", updateGlobeSize);
  }, [userPins, pushArcs]);

  return (
    <div className="globe-wrapper">
      <div ref={globeRef} className="globe-container" />
    </div>
  );
}

export default GlobeView;
