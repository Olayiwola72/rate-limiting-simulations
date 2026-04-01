// routesConfig.tsx
import React from "react";
import LandingPage from "../pages/landing-page/landing-page.tsx";
import TokenBucketPage from "../pages/token-bucket-page/token-bucket-page.tsx";
import FixedWindowPage from "../pages/fixed-window-page/FixedWindowPage.tsx";
import SlidingWindowCounterPage from "../pages/sliding-window-counter-page/SlidingWindowCounterPage.tsx";
import SlidingWindowLogPage from "../pages/sliding-window-log-page/SlidingWindowLogPage.tsx";
import LeakyBucketPage from "../pages/leaky-bucket-page/LeakyBucketPage.tsx";

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