// src/components/GitHubUserList.jsx

import React from "react";
import "./GitHubUserList.css";

function GitHubUserList({ users }) {
  return (
    <div className="user-list">
      <h2>🌍 Recent GitHub Users</h2>
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <img src={user.avatar} alt="avatar" className="avatar" />
          <div className="user-info">
            <div className="username">{user.username}</div>
            <div className="location">{user.location || "🌐 Unknown"}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GitHubUserList;
