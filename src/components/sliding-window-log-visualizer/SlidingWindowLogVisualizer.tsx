import React from "react";
import "./SlidingWindowLogVisualizer.scss";
import type { SlidingWindowLogVisualizerProps } from "./SlidingWindowLogVisualizer.types";

const SlidingWindowLogVisualizer: React.FC<
    SlidingWindowLogVisualizerProps
> = ({ currentSize, limit }) => {
    const percentage =
        limit === 0 ? 0 : (currentSize / limit) * 100;

    return (
        <div className="swl-visualizer">
            <div className="swl-visualizer__header">
                <span>Active Requests</span>
                <span>
                    {currentSize} / {limit}
                </span>
            </div>

            <div className="swl-visualizer__bar">
                <div
                    className="swl-visualizer__fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="swl-visualizer__timeline" />
        </div>
    );
};

export default SlidingWindowLogVisualizer;
