const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

export async function fetchPushActivity(userLimit = 10) {
  try {
    const eventsRes = await fetch("https://api.github.com/events", { headers });
    if (!eventsRes.ok) throw new Error("Failed to fetch global events");
    const events = await eventsRes.json();

    const hourlyCounts = Array(24).fill(0);

    // Count global PushEvents
    events.forEach((event) => {
      if (event.type === "PushEvent") {
        const hour = new Date(event.created_at).getUTCHours();
        hourlyCounts[hour]++;
      }
    });

    // Extract top unique usernames from global stream
    const usernames = [...new Set(events.map(e => e.actor?.login))].slice(0, userLimit);

    // Fetch push events for each user
    for (const username of usernames) {
      const userRes = await fetch(`https://api.github.com/users/${username}/events`, { headers });
      if (!userRes.ok) continue;

      const userEvents = await userRes.json();
      userEvents.forEach((event) => {
        if (event.type === "PushEvent") {
          const hour = new Date(event.created_at).getUTCHours();
          hourlyCounts[hour]++;
        }
      });
    }

    const finalData = hourlyCounts.map((count, hour) => ({
      hour: `${hour}:00`,
      pushes: count,
    }));

    console.log("📊 GitHub Push Activity:", finalData);
    return finalData;
  } catch (err) {
    console.error("❌ Error fetching push activity:", err);
    return [];
  }
}
