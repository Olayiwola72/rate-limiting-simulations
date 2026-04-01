import { useState } from "react";
import { Link } from "react-router-dom";
import BucketVisualizer from "../../components/bucker-visualizer/BucketVisualizer";
import ThroughputGraph from "../../components/throughput-graph/ThroughputGraph";
import {
  DEFAULT_CAPACITY,
  DEFAULT_LEAK_RATE,
  DEFAULT_REQUEST_RATE,
  HISTORY_LENGTH,
} from "../../config/config";
import { useLeakyBucketSimulation } from "../../hooks/leaky-bucket/useLeakyBucketSimulation";
import "./leaky-bucket-page.scss";

function LeakyBucketPage() {
  const [capacity, setCapacity] = useState(DEFAULT_CAPACITY);
  const [leakRate, setLeakRate] = useState(DEFAULT_LEAK_RATE);
  const [requestRate, setRequestRate] = useState(DEFAULT_REQUEST_RATE);

  const {
    queueSize,
    allowed,
    rejected,
    history,
    start,
    stop,
    reset,
  } = useLeakyBucketSimulation({
    capacity,
    leakRate,
    requestRate,
    historyLength: HISTORY_LENGTH,
  });

  return (
    <div className="lb-page">
      <div className="lb-page__card">
        <div className="lb-page__topbar">
          <Link to="/" className="lb-page__back-link">
            ← Back to Home
          </Link>
        </div>

        <h1 className="lb-page__title">Leaky Bucket Simulation</h1>

        <section className="lb-page__section">
          <h3 className="lb-page__section-title">Configuration</h3>

          <div className="lb-page__inputs">
            <div className="lb-page__input-group">
              <label htmlFor="lb-capacity-input">Bucket Capacity</label>
              <input
                id="lb-capacity-input"
                type="number"
                min="1"
                value={capacity}
                onChange={(event) => setCapacity(Number(event.target.value))}
              />
            </div>

            <div className="lb-page__input-group">
              <label htmlFor="lb-leak-rate-input">Leak Rate (req/sec)</label>
              <input
                id="lb-leak-rate-input"
                type="number"
                min="0"
                value={leakRate}
                onChange={(event) => setLeakRate(Number(event.target.value))}
              />
            </div>

            <div className="lb-page__input-group">
              <label htmlFor="lb-request-rate-input">Request Rate (req/sec)</label>
              <input
                id="lb-request-rate-input"
                type="number"
                min="1"
                value={requestRate}
                onChange={(event) => setRequestRate(Number(event.target.value))}
              />
            </div>
          </div>

          <button
            className="lb-page__button lb-page__button--primary"
            onClick={reset}
          >
            Apply &amp; Reset
          </button>
        </section>

        <section className="lb-page__simulation">
          <div className="lb-page__visual">
            <p className="lb-page__visual-label">Queued Requests</p>
            <BucketVisualizer capacity={capacity} tokens={queueSize} />
            <p className="lb-page__visual-caption">
              The bucket fills when requests arrive faster than they can leak
              out.
            </p>
          </div>

          <div className="lb-page__stats">
            <p>
              <strong>Queued:</strong> {queueSize}
            </p>
            <p>
              <strong>Leak Rate:</strong> {leakRate}/sec
            </p>
            <p>
              <strong>Allowed:</strong> {allowed}
            </p>
            <p>
              <strong>Rejected:</strong> {rejected}
            </p>

            <div className="lb-page__actions">
              <button
                className="lb-page__button lb-page__button--success"
                onClick={start}
              >
                Start
              </button>
              <button
                className="lb-page__button lb-page__button--danger"
                onClick={stop}
              >
                Stop
              </button>
            </div>
          </div>
        </section>

        <section className="lb-page__section lb-page__section--graph">
          <h3 className="lb-page__section-title">
            Throughput (Last {HISTORY_LENGTH} Seconds)
          </h3>
          <div className="lb-page__graph-wrap">
            <ThroughputGraph data={history} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default LeakyBucketPage;
