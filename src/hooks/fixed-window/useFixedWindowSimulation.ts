import { useEffect, useRef, useState } from "react";
import { FixedWindow } from "../../simulations/fixed-window/FixedWindow";
import type { UseFixedWindowSimulationProps } from "./UseFixedWindowSimulation.types";

interface HistoryPoint {
  time: number;
  allowed: number;
  rejected: number;
}

export function useFixedWindowSimulation({
  limit,
  windowSizeMs,
  requestRate,
  historyLength,
}: UseFixedWindowSimulationProps) {
  const windowRef = useRef<FixedWindow | null>(null);
  const intervalRef = useRef<number | null>(null);

  const [requestCount, setRequestCount] = useState(0);
  const [allowed, setAllowed] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  const allowedRef = useRef(0);
  const rejectedRef = useRef(0);
  const prevAllowed = useRef(0);
  const prevRejected = useRef(0);
  const isRunningRef = useRef(false);

  // Initialize engine
  useEffect(() => {
    windowRef.current = new FixedWindow(
      { limit, windowSizeMs },
      Date.now()
    );
  }, [limit, windowSizeMs]);

  // Sync totals
  useEffect(() => {
    allowedRef.current = allowed;
    rejectedRef.current = rejected;
  }, [allowed, rejected]);

  // Metrics collector
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      if (!isRunningRef.current) return;

      const allowedDelta =
        allowedRef.current - prevAllowed.current;
      const rejectedDelta =
        rejectedRef.current - prevRejected.current;

      setHistory((prev) =>
        [
          ...prev,
          {
            time: Date.now(),
            allowed: Math.max(0, allowedDelta),
            rejected: Math.max(0, rejectedDelta),
          },
        ].slice(-historyLength)
      );

      prevAllowed.current = allowedRef.current;
      prevRejected.current = rejectedRef.current;
    }, 1000);

    return () => clearInterval(metricsInterval);
  }, [historyLength]);

  const start = () => {
    if (intervalRef.current || !windowRef.current) return;

    isRunningRef.current = true;

    prevAllowed.current = allowedRef.current;
    prevRejected.current = rejectedRef.current;

    const intervalMs = 1000 / requestRate;

    intervalRef.current = window.setInterval(() => {
      if (!windowRef.current) return;

      const now = Date.now();
      const allowedRequest =
        windowRef.current.allowRequest(now);

      const state = windowRef.current.getState();
      setRequestCount(state.requestCount);

      if (allowedRequest) {
        setAllowed((prev) => prev + 1);
      } else {
        setRejected((prev) => prev + 1);
      }
    }, intervalMs);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isRunningRef.current = false;
  };

  const reset = () => {
    stop();

    windowRef.current = new FixedWindow(
      { limit, windowSizeMs },
      Date.now()
    );

    setRequestCount(0);
    setAllowed(0);
    setRejected(0);
    setHistory([]);

    allowedRef.current = 0;
    rejectedRef.current = 0;
    prevAllowed.current = 0;
    prevRejected.current = 0;
  };

  return {
    requestCount,
    allowed,
    rejected,
    history,
    start,
    stop,
    reset,
  };
}