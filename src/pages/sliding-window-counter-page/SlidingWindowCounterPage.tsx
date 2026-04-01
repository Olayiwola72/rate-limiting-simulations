import { Link } from "react-router-dom";
import ThroughputGraph from "../../components/throughput-graph/ThroughputGraph";
import { useSlidingWindowCounterSimulation } from "../../hooks/sliding-window-counter/useSlidingWindowCounterSimulation";

import {
    DEFAULT_SWC_LIMIT,
    DEFAULT_SWC_WINDOW_MS,
    DEFAULT_SWC_REQUEST_RATE,
    HISTORY_LENGTH,
} from "../../config/config";

import "./sliding-window-counter-page.scss";

function SlidingWindowCounterPage() {
    const {
        currentCount,
        previousCount,
        allowed,
        rejected,
        history,
        start,
        stop,
        reset,
    } = useSlidingWindowCounterSimulation({
        limit: DEFAULT_SWC_LIMIT,
        windowSizeMs: DEFAULT_SWC_WINDOW_MS,
        requestRate: DEFAULT_SWC_REQUEST_RATE,
        historyLength: HISTORY_LENGTH,
    });

    return (
        <div className="swc-page">
            <div className="swc-page__card">

                <div className="swc-page__topbar">
                    <Link to="/" className="swc-page__back-link">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="swc-page__title">
                    Sliding Window Counter Simulation
                </h1>

                {/* Window Visual Section */}
                <section className="swc-page__simulation">
                    <div className="swc-window-visual">

                        <div className="swc-window swc-window--previous">
                            <h4>Previous Window</h4>
                            <div className="swc-window__count">
                                {previousCount}
                            </div>
                        </div>

                        <div className="swc-window swc-window--current">
                            <h4>Current Window</h4>
                            <div className="swc-window__count">
                                {currentCount}
                            </div>
                        </div>

                    </div>

                    <div className="swc-stats">
                        <p><strong>Allowed:</strong> {allowed}</p>
                        <p><strong>Rejected:</strong> {rejected}</p>

                        <div className="swc-actions">
                            <button
                                className="swc-button swc-button--success"
                                onClick={start}
                            >
                                Start
                            </button>

                            <button
                                className="swc-button swc-button--danger"
                                onClick={stop}
                            >
                                Stop
                            </button>

                            <button
                                className="swc-button swc-button--primary"
                                onClick={reset}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </section>

                {/* Throughput Graph */}
                <section className="swc-page__graph-section">
                    <h3 className="swc-page__section-title">
                        Throughput (Last {HISTORY_LENGTH} Seconds)
                    </h3>

                    <div className="swc-page__graph-wrap">
                        <ThroughputGraph data={history} />
                    </div>
                </section>

            </div>
        </div>
    );
}

export default SlidingWindowCounterPage;
