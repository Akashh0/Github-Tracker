const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};


export async function fetchPushActivity() {
  try {
    const res = await fetch("https://github-tracker-backend-j1tb.onrender.com/api/push-activity");
    if (!res.ok) throw new Error("Failed to fetch push activity from backend");

    const data = await res.json();
    console.log("📊 GitHub Push Activity (from backend):", data);
    return data;
  } catch (err) {
    console.error("❌ Error fetching push activity from backend:", err);
    return [];
  }
}

