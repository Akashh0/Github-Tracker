const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;

export async function geocodeLocations(users) {
  const geocodedUsers = [];

  for (const user of users) {
    const location = user.location;

    // Tag invalid or missing location
    if (!location || location.trim() === "-" || location.trim() === "") {
      geocodedUsers.push({
        ...user,
        lat: null,
        lng: null,
        validLocation: false,
        note: "No location provided",
      });
      continue;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${GEOCODE_API_KEY}`
      );
      const data = await response.json();
      const result = data?.results?.[0];

      if (result) {
        const { lat, lng } = result.geometry;

        // Flag near-ocean (0,0) locations as invalid
        if (Math.abs(lat) < 1 && Math.abs(lng) < 1) {
          console.warn(`🌊 Skipping ocean coords for: ${user.username}`);
          geocodedUsers.push({
            ...user,
            lat: null,
            lng: null,
            validLocation: false,
          });
        } else {
          geocodedUsers.push({
            ...user,
            lat,
            lng,
            validLocation: true,
          });
        }
      } else {
        geocodedUsers.push({
          ...user,
          lat: null,
          lng: null,
          validLocation: false,
        });
        console.warn(`⚠️ No result for ${location}`);
      }
    } catch (error) {
      console.error(`❌ Geocode failed for ${user.location}`, error);
      geocodedUsers.push({
        ...user,
        lat: null,
        lng: null,
        validLocation: false,
      });
    }
  }

  console.log("📍 Final Geocoded Users (tagged):", geocodedUsers);
  return geocodedUsers;
}
