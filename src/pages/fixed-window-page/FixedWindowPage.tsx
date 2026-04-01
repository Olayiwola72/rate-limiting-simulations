import { useState } from "react";
import { Link } from "react-router-dom";
import { useFixedWindowSimulation } from "../../hooks/fixed-window/useFixedWindowSimulation";
import FixedWindowVisualizer from "../../components/fixed-window-visualizer/FixedWindowVisualizer.tsx";
import ThroughputGraph from "../../components/throughput-graph/ThroughputGraph";
import {
  DEFAULT_FW_LIMIT,
  DEFAULT_FW_WINDOW_MS,
  DEFAULT_FW_REQUEST_RATE,
  HISTORY_LENGTH,
} from "../../config/config";
import "./fixed-window-page.scss";

function FixedWindowPage() {
  const [limit, setLimit] = useState(DEFAULT_FW_LIMIT);
  const [windowSizeMs, setWindowSizeMs] =
    useState(DEFAULT_FW_WINDOW_MS);
  const [requestRate, setRequestRate] =
    useState(DEFAULT_FW_REQUEST_RATE);

  const {
    requestCount,
    allowed,
    rejected,
    history,
    start,
    stop,
    reset,
  } = useFixedWindowSimulation({
    limit,
    windowSizeMs,
    requestRate,
    historyLength: HISTORY_LENGTH,
  });

  return (
    <div className="fw-page">
      <div className="fw-page__card">
        <div className="fw-page__topbar">
          <Link to="/" className="fw-page__back-link">
            ← Back to Home
          </Link>
        </div>

        <h1 className="fw-page__title">
          Fixed Window Simulation
        </h1>

        <section className="fw-page__section">
          <h3 className="fw-page__section-title">
            Configuration
          </h3>

          <div className="fw-page__inputs">
            <div className="fw-page__input-group">
              <label>Limit</label>
              <input
                type="number"
                value={limit}
                onChange={(e) =>
                  setLimit(Number(e.target.value))
                }
              />
            </div>

            <div className="fw-page__input-group">
              <label>Window Size (ms)</label>
              <input
                type="number"
                value={windowSizeMs}
                onChange={(e) =>
                  setWindowSizeMs(Number(e.target.value))
                }
              />
            </div>

            <div className="fw-page__input-group">
              <label>Request Rate</label>
              <input
                type="number"
                value={requestRate}
                onChange={(e) =>
                  setRequestRate(Number(e.target.value))
                }
              />
            </div>
          </div>

          <button
            className="fw-page__button fw-page__button--primary"
            onClick={reset}
          >
            Apply & Reset
          </button>
        </section>

        <section className="fw-page__simulation">
          <FixedWindowVisualizer
            requestCount={requestCount}
            limit={limit}
            windowSizeMs={windowSizeMs}
          />

          <div className="fw-page__stats">
            <p><strong>Allowed:</strong> {allowed}</p>
            <p><strong>Rejected:</strong> {rejected}</p>

            <div className="fw-page__actions">
              <button
                className="fw-page__button fw-page__button--success"
                onClick={start}
              >
                Start
              </button>
              <button
                className="fw-page__button fw-page__button--danger"
                onClick={stop}
              >
                Stop
              </button>
            </div>
          </div>

          <div className="fw-page__graph-wrap">
            <h3 className="fw-page__section-title">
              Throughput (Last {HISTORY_LENGTH} Seconds)
            </h3>
            
            <ThroughputGraph data={history} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default FixedWindowPage;
