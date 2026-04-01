import { useState } from "react";
import { Link } from "react-router-dom";
import { useSlidingWindowLogSimulation } from "../../hooks/sliding-window-log/useSlidingWindowLogSimulation";
import SlidingWindowLogVisualizer from "../../components/sliding-window-log-visualizer/SlidingWindowLogVisualizer";
import ThroughputGraph from "../../components/throughput-graph/ThroughputGraph";
import {
    HISTORY_LENGTH,
    DEFAULT_FW_REQUEST_RATE,
} from "../../config/config";
import "./sliding-window-log-page.scss";

function SlidingWindowLogPage() {
    const [limit, setLimit] = useState(20);
    const [windowSizeMs, setWindowSizeMs] =
        useState(5000);
    const [requestRate, setRequestRate] =
        useState(DEFAULT_FW_REQUEST_RATE);

    const {
        currentSize,
        allowed,
        rejected,
        history,
        start,
        stop,
        reset,
    } = useSlidingWindowLogSimulation({
        limit,
        windowSizeMs,
        requestRate,
        historyLength: HISTORY_LENGTH,
    });

    return (
        <div className="swl-page">
            <div className="swl-page__card">
                <div className="swl-page__topbar">
                    <Link to="/" className="swl-page__back-link">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="swl-page__title">
                    Sliding Window Log Simulation
                </h1>

                <section className="swl-page__section">
                    <h3 className="swl-page__section-title">
                        Configuration
                    </h3>

                    <div className="swl-page__inputs">
                        <div className="swl-page__input-group">
                            <label>Limit</label>
                            <input
                                type="number"
                                value={limit}
                                onChange={(e) =>
                                    setLimit(Number(e.target.value))
                                }
                            />
                        </div>

                        <div className="swl-page__input-group">
                            <label>Window Size (ms)</label>
                            <input
                                type="number"
                                value={windowSizeMs}
                                onChange={(e) =>
                                    setWindowSizeMs(Number(e.target.value))
                                }
                            />
                        </div>

                        <div className="swl-page__input-group">
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
                        className="swl-page__button swl-page__button--primary"
                        onClick={reset}
                    >
                        Apply & Reset
                    </button>
                </section>

                <section className="swl-page__simulation">
                    <SlidingWindowLogVisualizer
                        currentSize={currentSize}
                        limit={limit}
                    />

                    <div className="swl-page__stats">
                        <p><strong>Allowed:</strong> {allowed}</p>
                        <p><strong>Rejected:</strong> {rejected}</p>

                        <div className="swl-page__actions">
                            <button
                                className="swl-page__button swl-page__button--success"
                                onClick={start}
                            >
                                Start
                            </button>
                            <button
                                className="swl-page__button swl-page__button--danger"
                                onClick={stop}
                            >
                                Stop
                            </button>
                        </div>
                    </div>
                    
                    <h3 className="swl-page__section-title">
                        Throughput (Last {HISTORY_LENGTH} Seconds)
                    </h3>
                    <div className="swl-page__graph-wrap">
                        <ThroughputGraph data={history} />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SlidingWindowLogPage;
