export interface FixedWindowConfig {
    limit: number;
    windowSizeMs: number;
}

export interface FixedWindowState {
    currentWindowStart: number;
    requestCount: number;
    limit: number;
    windowSizeMs: number;
}