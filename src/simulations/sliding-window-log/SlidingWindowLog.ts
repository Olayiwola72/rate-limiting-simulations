import type {
    SlidingWindowLogConfig,
    SlidingWindowLogState,
} from "./SlidingWindowLog.types";

export class SlidingWindowLog {
    private limit: number;
    private windowSizeMs: number;
    private timestamps: number[];

    constructor(config: SlidingWindowLogConfig) {
        this.limit = config.limit;
        this.windowSizeMs = config.windowSizeMs;
        this.timestamps = [];
    }

    public allowRequest(currentTime: number): boolean {
        this.evictExpired(currentTime);

        if (this.timestamps.length < this.limit) {
            this.timestamps.push(currentTime);
            return true;
        }

        return false;
    }

    private evictExpired(currentTime: number): void {
        const windowStart = currentTime - this.windowSizeMs;

        // Remove expired timestamps
        while (
            this.timestamps.length > 0 &&
            this.timestamps[0] < windowStart
        ) {
            this.timestamps.shift();
        }
    }

    public getState(): SlidingWindowLogState {
        return {
            timestamps: [...this.timestamps],
            limit: this.limit,
            windowSizeMs: this.windowSizeMs,
        };
    }
}