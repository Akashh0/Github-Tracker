// src/components/GitHubUserList.jsx
import React from "react";
import "./GitHubUserList.css";

function GitHubUserList({ users }) {
  return (
    <div className="github-user-list">
      <h2 className="list-title">Recent Github Users!</h2>
      <div className="user-list-box">
        {users.slice(0, 10).map((user, index) => (
          <div className="user-entry" key={index}>
            <img src={user.avatar} alt={user.username} className="user-avatar" />
            <span className="user-name">{user.username}</span>
            <span className="user-location">
              📍 {user.location || "Unknown"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GitHubUserList;
