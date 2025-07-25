const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

export async function fetchRepoCommits(repoFullName) {
  if (!repoFullName.includes("/")) {
    console.error("❌ Repo name must be in 'owner/repo' format.");
    return [];
  }

  try {
    const res = await fetch(`http://localhost:5000/api/repo-commits?repo=${repoFullName}`);
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(`${res.status}: ${errData.error}`);
    }

    const commits = await res.json();

    return commits.map((commit) => ({
      message: commit.message,
      author: commit.author || "Unknown",
      avatar: commit.avatar || "",
      date: commit.date,
    }));
  } catch (err) {
    console.error("❌ Error fetching commits from backend:", err.message);
    return [];
  }
}
