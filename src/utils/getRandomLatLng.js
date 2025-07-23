export function getRandomLatLng() {
  const lat = Math.random() * 180 - 90; // -90 to +90
  const lng = Math.random() * 360 - 180; // -180 to +180
  return { lat, lng };
}
