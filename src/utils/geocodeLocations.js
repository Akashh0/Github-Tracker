// src/utils/geocodeLocations.js

const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;
export async function geocodeLocations(users) {
  const geocodedUsers = [];

  for (const user of users) {
    if (!user.location) continue;

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(user.location)}&key=${GEOCODE_API_KEY}`
      );

      const data = await response.json();
      const firstResult = data?.results?.[0];

      if (firstResult) {
        const { lat, lng } = firstResult.geometry;

        geocodedUsers.push({
          ...user,
          lat,
          lng,
        });
      } else {
        console.warn(`⚠️ Could not geocode: ${user.location}`);
      }
    } catch (error) {
      console.error(`❌ Error geocoding ${user.location}:`, error);
    }
  }

  console.log("📍 Geocoded Users:", geocodedUsers);
  return geocodedUsers;
}