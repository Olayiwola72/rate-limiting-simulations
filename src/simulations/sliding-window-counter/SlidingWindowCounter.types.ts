export interface SlidingWindowCounterConfig {
    limit: number;
    windowSizeMs: number;
}

export interface SlidingWindowCounterState {
    currentWindowStart: number;
    currentCount: number;
    previousCount: number;
    limit: number;
    windowSizeMs: number;
}