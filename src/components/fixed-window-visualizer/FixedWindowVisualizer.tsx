import React from "react";
import "./fixed-window-visualizer.scss";
import type { FixedWindowVisualizerProps } from "./FixedWindowVisualizer.types";

const FixedWindowVisualizer: React.FC<FixedWindowVisualizerProps> = ({
  requestCount,
  limit,
  windowSizeMs,
}) => {
  const percentage = Math.min((requestCount / limit) * 100, 100);
  const isExceeded = requestCount > limit;

  return (
    <div className="fw-visualizer">
      <div className="fw-visualizer__header">
        <span>Window Duration</span>
        <strong>{windowSizeMs / 1000}s</strong>
      </div>

      <div className="fw-visualizer__counter">
        <span className="fw-visualizer__count">
          {requestCount}
        </span>
        <span className="fw-visualizer__limit">
          / {limit}
        </span>
      </div>

      <div className="fw-visualizer__bar">
        <div
          className={`fw-visualizer__fill ${
            isExceeded ? "fw-visualizer__fill--exceeded" : ""
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="fw-visualizer__status">
        {isExceeded ? "Limit Exceeded" : "Within Limit"}
      </div>
    </div>
  );
};

export default FixedWindowVisualizer;
