export interface SlidingWindowLogConfig {
    limit: number;
    windowSizeMs: number;
}

export interface SlidingWindowLogState {
    timestamps: number[];
    limit: number;
    windowSizeMs: number;
}