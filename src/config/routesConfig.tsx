import React from "react";
import {
  FixedWindowPage,
  LandingPage,
  LeakyBucketPage,
  SlidingWindowCounterPage,
  SlidingWindowLogPage,
  TokenBucketPage,
} from "./routePages";

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  title?: string; // optional, for navigation or meta
  color?: string; // optional, for button color
}

const routes: AppRoute[] = [
  {
    path: "/",
    element: <LandingPage />,
    title: "Simulation Studio - Master Rate Limiting Algorithms",
  },
  {
    path: "/token-bucket",
    element: <TokenBucketPage />,
    title: "Token Bucket",
    color: "blue",
  },
  {
    path: "/fixed-window",
    element: <FixedWindowPage />,
    title: "Fixed Window",
    color: "green",
  },
  {
    path: "/sliding-window-log",
    element: <SlidingWindowLogPage />,
    title: "Sliding Window Log",
    color: "orange",
  },
  {
    path: "/sliding-window-counter",
    element: <SlidingWindowCounterPage />,
    title: "Sliding Window Counter",
    color: "purple",
  },
  {
    path: "/leaky-bucket",
    element: <LeakyBucketPage />,
    title: "Leaky Bucket",
    color: "red",
  },
];

export default routes;
