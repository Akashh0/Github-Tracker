const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

export async function fetchRecentUsers(limit = 10) {
  try {
    const res = await fetch(`http://localhost:5000/api/recent-users`);
    if (!res.ok) throw new Error("Backend API failed");

    const data = await res.json();
    const limited = data.slice(0, limit);

    console.log("✅ Final User List with Location:", limited);
    return limited;
  } catch (error) {
    console.error("🔥 Error fetching GitHub users from backend:", error);
    return [];
  }
}

export default fetchRecentUsers;
