// src/components/GitHubActivityTimeline.jsx

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./GitHubActivityTimeline.css";

const GitHubActivityTimeline = ({ activityData }) => {
  return (
    <div className="activity-timeline-container">
      <h2 className="timeline-heading">GitHub Push Activity (Last 24 Hours)</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="hour" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #00ffc8",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#ffffffff" }}
            />
            <Bar dataKey="pushes" fill="#ffffffff" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GitHubActivityTimeline;
