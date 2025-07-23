import React, { useState } from "react";
import "./RepoSearch.css";

function RepoSearch({ onSearch, commits }) {
  const [repoInput, setRepoInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repoInput.trim()) {
      onSearch(repoInput.trim());
    }
  };

  return (
    <div className="repo-search-box">
      <h2 className="repo-search-heading">🔍 Search GitHub Repository Commits</h2>
      <form className="repo-search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a repository (e.g., vercel/next.js)"
          value={repoInput}
          onChange={(e) => setRepoInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {commits?.length > 0 && (
        <div className="commits-display">
          <h3 className="commits-heading">Recent Commits</h3>
          <ul className="commit-list">
            {commits.map((commit, index) => (
              <li key={index} className="commit-item">
                <img src={commit.avatar} alt="avatar" className="commit-avatar" />
                <div className="commit-info">
                  <p className="commit-message">{commit.message}</p>
                  <p className="commit-meta">
                    by <strong>{commit.author}</strong> on{" "}
                    {new Date(commit.date).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RepoSearch;
