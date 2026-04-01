import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TokenBucket } from "../../simulations/token-bucket/tokenBucket";
import BucketVisualizer from "../../components/bucker-visualizer/BucketVisualizer";
import ThroughputGraph from "../../components/throughput-graph/ThroughputGraph";
import { HISTORY_LENGTH, DEFAULT_CAPACITY, DEFAULT_REFILL_RATE, DEFAULT_REQUEST_RATE, DEFAULT_TOKENS } from "../../config/config";
import "./token-bucket-page.scss";

function TokenBucketPage() {
  const bucketRef = useRef<TokenBucket | null>(null);
  const intervalRef = useRef<number | null>(null);

  const [capacity, setCapacity] = useState(DEFAULT_CAPACITY);
  const [refillRate, setRefillRate] = useState(DEFAULT_REFILL_RATE);
  const [requestRate, setRequestRate] = useState(DEFAULT_REQUEST_RATE);

  const [tokens, setTokens] = useState(DEFAULT_TOKENS);
  const [allowed, setAllowed] = useState(0);
  const [rejected, setRejected] = useState(0);

  const [history, setHistory] = useState<
    { time: number; allowed: number; rejected: number }[]
  >([]);

  const allowedTotalRef = useRef(0);
  const rejectedTotalRef = useRef(0);
  const prevAllowed = useRef(0);
  const prevRejected = useRef(0);
  const isRunningRef = useRef(false);

  // Initialize bucket
  useEffect(() => {
    bucketRef.current = new TokenBucket(capacity, refillRate);
  }, [capacity, refillRate]);

  useEffect(() => {
    allowedTotalRef.current = allowed;
    rejectedTotalRef.current = rejected;
  }, [allowed, rejected]);

  // Metrics interval
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      if (!isRunningRef.current) return;

      const allowedDelta = allowedTotalRef.current - prevAllowed.current;
      const rejectedDelta = rejectedTotalRef.current - prevRejected.current;

      setHistory((prev) => [
        ...prev,
        {
          time: Date.now(),
          allowed: Math.max(0, allowedDelta),
          rejected: Math.max(0, rejectedDelta),
        },
      ].slice(-HISTORY_LENGTH));

      prevAllowed.current = allowedTotalRef.current;
      prevRejected.current = rejectedTotalRef.current;
    }, 1000);

    return () => clearInterval(metricsInterval);
  }, []);

  const startSimulation = () => {
    if (intervalRef.current || !bucketRef.current) return;

    const intervalMs = 1000 / requestRate;
    isRunningRef.current = true;
    prevAllowed.current = allowedTotalRef.current;
    prevRejected.current = rejectedTotalRef.current;

    intervalRef.current = window.setInterval(() => {
      if (!bucketRef.current) return;

      const allowedRequest = bucketRef.current.allowRequest();
      const state = bucketRef.current.getState();

      setTokens(state.tokens);

      if (allowedRequest) {
        setAllowed((prev) => prev + 1);
      } else {
        setRejected((prev) => prev + 1);
      }
    }, intervalMs);
  };

  const stopSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isRunningRef.current = false;
  };

  const resetSimulation = () => {
    stopSimulation();

    bucketRef.current = new TokenBucket(capacity, refillRate);
    setTokens(capacity);

    setAllowed(0);
    setRejected(0);
    setHistory([]);

    allowedTotalRef.current = 0;
    rejectedTotalRef.current = 0;
    prevAllowed.current = 0;
    prevRejected.current = 0;
    isRunningRef.current = false;
  };

  return (
    <div className="token-page">
      <div className="token-page__card">
        <div className="token-page__topbar">
          <Link to="/" className="token-page__back-link">
            ← Back to Home
          </Link>
        </div>
        <h1 className="token-page__title">Token Bucket Simulation</h1>

        <section className="token-page__section">
          <h3 className="token-page__section-title">Configuration</h3>

          <div className="token-page__inputs">
            <div className="token-page__input-group">
              <label htmlFor="capacity-input">Capacity</label>
              <input
                id="capacity-input"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
            </div>

            <div className="token-page__input-group">
              <label htmlFor="refill-input">Refill Rate (tokens/sec)</label>
              <input
                id="refill-input"
                type="number"
                value={refillRate}
                onChange={(e) => setRefillRate(Number(e.target.value))}
              />
            </div>

            <div className="token-page__input-group">
              <label htmlFor="request-input">Request Rate (req/sec)</label>
              <input
                id="request-input"
                type="number"
                value={requestRate}
                onChange={(e) => setRequestRate(Number(e.target.value))}
              />
            </div>
          </div>

          <button className="token-page__button token-page__button--primary" onClick={resetSimulation}>
            Apply &amp; Reset
          </button>
        </section>

        <section className="token-page__simulation">
          <BucketVisualizer capacity={capacity} tokens={tokens} />

          <div className="token-page__stats">
            <p><strong>Tokens:</strong> {tokens}</p>
            <p><strong>Allowed:</strong> {allowed}</p>
            <p><strong>Rejected:</strong> {rejected}</p>

            <div className="token-page__actions">
              <button className="token-page__button token-page__button--success" onClick={startSimulation}>
                Start
              </button>
              <button className="token-page__button token-page__button--danger" onClick={stopSimulation}>
                Stop
              </button>
            </div>
          </div>
        </section>

        <section className="token-page__section token-page__section--graph">
          <h3 className="token-page__section-title">Throughput (Last {HISTORY_LENGTH} Seconds)</h3>
          <div className="token-page__graph-wrap">
            <ThroughputGraph data={history} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default TokenBucketPage;
