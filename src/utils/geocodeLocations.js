const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;

export async function geocodeLocations(users) {
  const geocodedUsers = [];

  for (const user of users) {
    // If no location, assign default placeholder (0, 0)
    if (!user.location) {
      geocodedUsers.push({
        ...user,
        lat: 0,
        lng: 0,
        note: "No location provided",
      });
      continue;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          user.location
        )}&key=${GEOCODE_API_KEY}`
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

  console.log("📍 Geocoded Users (with defaults):", geocodedUsers);
  return geocodedUsers;
}
