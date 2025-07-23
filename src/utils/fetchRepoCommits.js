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
    const res = await fetch(`https://api.github.com/repos/${repoFullName}/commits`, { headers });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(`${res.status}: ${errData.message}`);
    }

    const commits = await res.json();

    return commits.slice(0, 10).map((commit) => ({
      message: commit.commit.message,
      author: commit.author?.login || "Unknown",
      avatar: commit.author?.avatar_url || "",
      date: commit.commit.author.date,
    }));
  } catch (err) {
    console.error("❌ Error fetching commits:", err.message);
    return [];
  }
}
