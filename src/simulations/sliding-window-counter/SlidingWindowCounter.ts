import type {
    SlidingWindowCounterConfig,
    SlidingWindowCounterState,
} from "./SlidingWindowCounter.types";

export class SlidingWindowCounter {
    private limit: number;
    private windowSizeMs: number;

    private currentWindowStart: number;
    private currentCount: number;
    private previousCount: number;

    constructor(
        config: SlidingWindowCounterConfig,
        startTime: number
    ) {
        this.limit = config.limit;
        this.windowSizeMs = config.windowSizeMs;

        this.currentWindowStart = startTime;
        this.currentCount = 0;
        this.previousCount = 0;
    }

    public allowRequest(currentTime: number): boolean {
        this.rollWindowIfNeeded(currentTime);

        const elapsed =
            currentTime - this.currentWindowStart;

        const weight =
            1 - elapsed / this.windowSizeMs;

        const effectiveCount =
            this.currentCount +
            this.previousCount * weight;

        if (effectiveCount < this.limit) {
            this.currentCount++;
            return true;
        }

        return false;
    }

    private rollWindowIfNeeded(
        currentTime: number
    ): void {
        const windowEnd =
            this.currentWindowStart + this.windowSizeMs;

        if (currentTime >= windowEnd) {
            const windowsPassed = Math.floor(
                (currentTime - this.currentWindowStart) /
                this.windowSizeMs
            );

            if (windowsPassed === 1) {
                this.previousCount = this.currentCount;
            } else {
                this.previousCount = 0;
            }

            this.currentWindowStart +=
                windowsPassed * this.windowSizeMs;

            this.currentCount = 0;
        }
    }

    public getState(): SlidingWindowCounterState {
        return {
            currentWindowStart:
                this.currentWindowStart,
            currentCount: this.currentCount,
            previousCount: this.previousCount,
            limit: this.limit,
            windowSizeMs: this.windowSizeMs,
        };
    }
}