import { useEffect, useRef, useState } from "react";
import { SlidingWindowCounter } from "../../simulations/sliding-window-counter/SlidingWindowCounter";
import type { UseSlidingWindowCounterSimulationProps } from "./UseSlidingWindowCounterSimulation.types";

interface HistoryPoint {
  time: number;
  allowed: number;
  rejected: number;
}

export function useSlidingWindowCounterSimulation({
  limit,
  windowSizeMs,
  requestRate,
  historyLength,
}: UseSlidingWindowCounterSimulationProps) {
  const engineRef = useRef<SlidingWindowCounter | null>(null);
  const intervalRef = useRef<number | null>(null);

  const [currentCount, setCurrentCount] = useState(0);
  const [previousCount, setPreviousCount] = useState(0);

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
    engineRef.current = new SlidingWindowCounter(
      { limit, windowSizeMs },
      Date.now()
    );
  }, [limit, windowSizeMs]);

  // Sync totals
  useEffect(() => {
    allowedRef.current = allowed;
    rejectedRef.current = rejected;
  }, [allowed, rejected]);

  // Metrics collector (per-second throughput)
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
    if (intervalRef.current || !engineRef.current) return;

    isRunningRef.current = true;

    prevAllowed.current = allowedRef.current;
    prevRejected.current = rejectedRef.current;

    const intervalMs = 1000 / requestRate;

    intervalRef.current = window.setInterval(() => {
      if (!engineRef.current) return;

      const now = Date.now();
      const allowedRequest =
        engineRef.current.allowRequest(now);

      const state = engineRef.current.getState();

      setCurrentCount(state.currentCount);
      setPreviousCount(state.previousCount);

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

    engineRef.current = new SlidingWindowCounter(
      { limit, windowSizeMs },
      Date.now()
    );

    setCurrentCount(0);
    setPreviousCount(0);
    setAllowed(0);
    setRejected(0);
    setHistory([]);

    allowedRef.current = 0;
    rejectedRef.current = 0;
    prevAllowed.current = 0;
    prevRejected.current = 0;
  };

  return {
    currentCount,
    previousCount,
    allowed,
    rejected,
    history,
    start,
    stop,
    reset,
  };
}