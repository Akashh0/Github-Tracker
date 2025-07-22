// src/utils/fetchGitHubUsers.js

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // ⬅️ load from .env

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

export async function fetchRecentUsers(limit = 10) {
  try {
    const res = await fetch("https://api.github.com/events", { headers });
    if (!res.ok) throw new Error("GitHub Events API failed");

    const data = await res.json();
    const uniqueUsers = [];

    for (const event of data) {
      const username = event.actor?.login;
      const avatar = event.actor?.avatar_url;

      if (!username || uniqueUsers.find((u) => u.username === username)) continue;

      // Fetch user profile
      const profileRes = await fetch(`https://api.github.com/users/${username}`, { headers });

      if (!profileRes.ok) {
        console.warn(`❌ Skipping ${username} (API limit or missing):`, profileRes.status);
        continue;
      }

      const profile = await profileRes.json();

      uniqueUsers.push({
        username,
        avatar,
        location: profile.location || null,
      });

      if (uniqueUsers.length >= limit) break;
    }

    console.log("📍 Fetched GitHub Users with location:", uniqueUsers);
    return uniqueUsers;
  } catch (error) {
    console.error("🔥 Error fetching GitHub users:", error);
    return [];
  }
}

export default fetchRecentUsers;
