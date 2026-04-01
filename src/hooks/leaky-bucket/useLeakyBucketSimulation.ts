import { useEffect, useRef, useState } from "react";
import { LeakyBucket } from "../../simulations/leaky-bucket/LeakyBucket";
import {
  DEFAULT_CAPACITY,
  DEFAULT_LEAK_RATE,
  DEFAULT_REQUEST_RATE,
  HISTORY_LENGTH,
} from "../../config/config";

export interface UseLeakyBucketSimulationProps {
  capacity?: number;
  leakRate?: number;
  requestRate?: number;
  historyLength?: number;
}

export const useLeakyBucketSimulation = (
  props?: UseLeakyBucketSimulationProps
) => {
  const capacity = props?.capacity ?? DEFAULT_CAPACITY;
  const leakRate = props?.leakRate ?? DEFAULT_LEAK_RATE;
  const requestRate = props?.requestRate ?? DEFAULT_REQUEST_RATE;
  const historyLength = props?.historyLength ?? HISTORY_LENGTH;

  const bucketRef = useRef<LeakyBucket | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  const [queueSize, setQueueSize] = useState(0);
  const [allowed, setAllowed] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [history, setHistory] = useState<
    { time: number; allowed: number; rejected: number }[]
  >([]);

  const allowedTotalRef = useRef(0);
  const rejectedTotalRef = useRef(0);
  const prevAllowed = useRef(0);
  const prevRejected = useRef(0);

  // Initialize bucket
  useEffect(() => {
    bucketRef.current = new LeakyBucket(
      { capacity, leakRate },
      Date.now()
    );
  }, [capacity, leakRate]);

  useEffect(() => {
    allowedTotalRef.current = allowed;
    rejectedTotalRef.current = rejected;
  }, [allowed, rejected]);

  // Metrics collection (1 second)
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      if (!isRunningRef.current) return;

      const allowedDelta =
        allowedTotalRef.current - prevAllowed.current;
      const rejectedDelta =
        rejectedTotalRef.current - prevRejected.current;

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

      prevAllowed.current = allowedTotalRef.current;
      prevRejected.current = rejectedTotalRef.current;
    }, 1000);

    return () => clearInterval(metricsInterval);
  }, [historyLength]);

  const start = () => {
    if (intervalRef.current || !bucketRef.current || requestRate <= 0) return;

    const intervalMs = 1000 / requestRate;

    isRunningRef.current = true;
    setIsRunning(true);
    prevAllowed.current = allowedTotalRef.current;
    prevRejected.current = rejectedTotalRef.current;

    intervalRef.current = window.setInterval(() => {
      if (!bucketRef.current) return;

      const now = Date.now();
      const allowedRequest = bucketRef.current.allowRequest(now);
      const state = bucketRef.current.getState(now);

      setQueueSize(state.queueSize);

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

    if (bucketRef.current) {
      const state = bucketRef.current.getState(Date.now());
      setQueueSize(state.queueSize);
    }

    isRunningRef.current = false;
    setIsRunning(false);
  };

  const reset = () => {
    stop();

    bucketRef.current = new LeakyBucket(
      { capacity, leakRate },
      Date.now()
    );

    setQueueSize(0);
    setAllowed(0);
    setRejected(0);
    setHistory([]);

    allowedTotalRef.current = 0;
    rejectedTotalRef.current = 0;
    prevAllowed.current = 0;
    prevRejected.current = 0;
    isRunningRef.current = false;
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return undefined;

    const drainInterval = window.setInterval(() => {
      if (!bucketRef.current) return;

      const state = bucketRef.current.getState(Date.now());
      setQueueSize(state.queueSize);
    }, 150);

    return () => clearInterval(drainInterval);
  }, [isRunning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    queueSize,
    allowed,
    rejected,
    history,
    start,
    stop,
    reset,
    capacity,
    leakRate,
  };
};
