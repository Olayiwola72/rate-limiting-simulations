import { lazy } from "react";

export const LandingPage = lazy(
  () => import("../pages/landing-page/landing-page.tsx")
);
export const TokenBucketPage = lazy(
  () => import("../pages/token-bucket-page/token-bucket-page.tsx")
);
export const FixedWindowPage = lazy(
  () => import("../pages/fixed-window-page/FixedWindowPage.tsx")
);
export const SlidingWindowCounterPage = lazy(
  () => import("../pages/sliding-window-counter-page/SlidingWindowCounterPage.tsx")
);
export const SlidingWindowLogPage = lazy(
  () => import("../pages/sliding-window-log-page/SlidingWindowLogPage.tsx")
);
export const LeakyBucketPage = lazy(
  () => import("../pages/leaky-bucket-page/LeakyBucketPage.tsx")
);
