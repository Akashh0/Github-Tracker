const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

export async function fetchRecentUsers(limit = 10) {
  const uniqueUsers = [];
  const seenUsernames = new Set();
  let page = 1;

  try {
    while (uniqueUsers.length < limit && page <= 5) {
      const res = await fetch(`https://api.github.com/events?page=${page}`, { headers });
      if (!res.ok) throw new Error("GitHub Events API failed");
      const data = await res.json();

      for (const event of data) {
        const username = event.actor?.login;
        const avatar = event.actor?.avatar_url;

        if (!username || seenUsernames.has(username)) continue;

        const profileRes = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!profileRes.ok) continue;

        const profile = await profileRes.json();
        const location = profile.location?.trim();

        if (!location || location === "-" || location.length < 2) continue;

        uniqueUsers.push({ username, avatar, location });
        seenUsernames.add(username);

        if (uniqueUsers.length >= limit) break;
      }

      page++;
    }

    console.log("✅ Final User List with Location:", uniqueUsers);
    return uniqueUsers;
  } catch (error) {
    console.error("🔥 Error fetching GitHub users:", error);
    return uniqueUsers;
  }
}

export default fetchRecentUsers;