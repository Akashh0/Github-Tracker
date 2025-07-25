import React, { useState } from "react";
import "./RepoSearch.css";

function RepoSearch({ onSearch, commits }) {
  const [repoInput, setRepoInput] = useState("");
  // New state to control the visibility of the commits display
  const [showCommitsDisplay, setShowCommitsDisplay] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repoInput.trim()) {
      onSearch(repoInput.trim());
      setShowCommitsDisplay(true); // Show the commits display after a new search
    }
  };

  // Function to hide the commits display
  const handleCloseCommits = () => {
    setShowCommitsDisplay(false);
  };

  return (
    <div className="repo-search-box">
      <h2 className="repo-search-heading">Search your Favourite Repository!</h2>
      <form className="repo-search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a repository (e.g., Akashh0/Resumate)"
          value={repoInput}
          onChange={(e) => setRepoInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditionally render the commits display based on commits and showCommitsDisplay state */}
      {commits?.length > 0 && showCommitsDisplay && (
        <div className="commits-display">
          <h3 className="commits-heading">Recent Commits</h3>
          {/* Close button */}
          <button className="close-commits-button" onClick={handleCloseCommits}>
            &times; {/* HTML entity for 'X' mark */}
          </button>
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