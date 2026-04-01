import React from "react";
import ReactECharts from "echarts-for-react";
import type { DataPoint, ThroughputGraphProps } from "./ThroughputGraph.types";
import "./ThroughputGraph.scss";

const ThroughputGraph: React.FC<ThroughputGraphProps> = ({ data }) => {
  const chartData = data.map((d: DataPoint) => ({
    time: new Date(d.time).toLocaleTimeString(),
    allowed: d.allowed,
    rejected: d.rejected,
  }));    

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(15, 23, 42, 0.92)",
      borderColor: "rgba(148, 163, 184, 0.35)",
      textStyle: { color: "#f8fafc" },
    },
    legend: {
      top: 8,
      data: ["Allowed", "Rejected"],
      textStyle: { color: "#475569", fontWeight: 600 },
    },
    grid: {
      top: 40,
      right: 20,
      bottom: 30,
      left: 40,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chartData.map((d) => d.time),
      axisLabel: {
        color: "#64748b",
      },
      axisLine: { lineStyle: { color: "rgba(148, 163, 184, 0.45)" } },
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: {
        color: "#64748b",
      },
      axisLine: { lineStyle: { color: "rgba(148, 163, 184, 0.35)" } },
      splitLine: {
        lineStyle: {
          color: "rgba(148, 163, 184, 0.25)",
        },
      },
    },
    series: [
      {
        name: "Allowed",
        type: "line",
        smooth: true,
        showSymbol: false,
        data: chartData.map((d) => d.allowed),
        lineStyle: { width: 3, color: "#16bf80" },
        areaStyle: { color: "rgba(22, 191, 128, 0.14)" },
      },
      {
        name: "Rejected",
        type: "line",
        smooth: true,
        showSymbol: false,
        data: chartData.map((d) => d.rejected),
        lineStyle: { width: 3, color: "#f25561" },
        areaStyle: { color: "rgba(242, 85, 97, 0.14)" },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      className="throughput-graph"
      style={{ width: "min(100%, 620px)", height: "clamp(180px, 22vh, 220px)" }}
      notMerge
      lazyUpdate
    />
  );
};

export default ThroughputGraph;
