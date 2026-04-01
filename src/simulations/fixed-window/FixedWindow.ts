import type {
  FixedWindowConfig,
  FixedWindowState,
} from "./FixedWindow.types";

export class FixedWindow {
  private limit: number;
  private windowSizeMs: number;

  private currentWindowStart: number;
  private requestCount: number;

  constructor(config: FixedWindowConfig, startTime: number) {
    this.limit = config.limit;
    this.windowSizeMs = config.windowSizeMs;

    this.currentWindowStart = startTime;
    this.requestCount = 0;
  }

  public allowRequest(currentTime: number): boolean {
    this.rollWindowIfNeeded(currentTime);

    if (this.requestCount < this.limit) {
      this.requestCount++;
      return true;
    }

    return false;
  }

  private rollWindowIfNeeded(currentTime: number): void {
    const windowEnd = this.currentWindowStart + this.windowSizeMs;

    if (currentTime >= windowEnd) {
      const windowsPassed = Math.floor(
        (currentTime - this.currentWindowStart) / this.windowSizeMs
      );

      this.currentWindowStart +=
        windowsPassed * this.windowSizeMs;

      this.requestCount = 0;
    }
  }

  public getState(): FixedWindowState {
    return {
      currentWindowStart: this.currentWindowStart,
      requestCount: this.requestCount,
      limit: this.limit,
      windowSizeMs: this.windowSizeMs,
    };
  }
}