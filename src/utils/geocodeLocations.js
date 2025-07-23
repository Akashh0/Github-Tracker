const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;

export async function geocodeLocations(users) {
  const geocodedUsers = [];

  for (const user of users) {
    const location = user.location;

    // ❌ Skip users with no or invalid location
    if (!location || location === "-" || location.trim() === "") {
      console.warn(`⚠️ Skipping user with missing location: ${user.username}`);
      continue;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${GEOCODE_API_KEY}`
      );

      const data = await response.json();
      const firstResult = data?.results?.[0];

      if (firstResult) {
        const { lat, lng } = firstResult.geometry;

        // ⛔ Skip bad coordinates near (0,0) ocean
        if (Math.abs(lat) < 1 && Math.abs(lng) < 1) {
          console.warn(`🧊 Skipping near-zero coords for: ${user.username} → (${lat}, ${lng})`);
          continue;
        }

        geocodedUsers.push({
          ...user,
          lat,
          lng,
        });
      } else {
        console.warn(`⚠️ No geocode results for: ${location}`);
      }
    } catch (error) {
      console.error(`❌ Geocoding failed for ${location}:`, error);
    }
  }

  console.log("📍 Final Geocoded Users:", geocodedUsers);
  return geocodedUsers;
}
