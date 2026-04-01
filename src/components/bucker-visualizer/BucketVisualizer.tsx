import React from "react";
import "./BucketVisualizer.scss";
import type { BucketVisualizerProps } from "./BucketVisualizer.types";

const BucketVisualizer: React.FC<BucketVisualizerProps> = ({
  capacity,
  tokens,
}) => {
  const percentage = (tokens / capacity) * 100;

  return (
    <div className="bucket-visualizer">
      <div
        className="bucket-visualizer__fill"
        style={{ height: `${percentage}%` }}
      />
    </div>
  );
};

export default BucketVisualizer;
