import type {
  LeakyBucketConfig,
  LeakyBucketState,
} from "./LeakyBucket.types";

export class LeakyBucket {
  private capacity: number;
  private leakRate: number;
  private queueSize: number;
  private lastLeakTime: number;

  constructor(config: LeakyBucketConfig, startTime: number) {
    this.capacity = config.capacity;
    this.leakRate = config.leakRate;
    this.queueSize = 0;
    this.lastLeakTime = startTime;
  }

  public allowRequest(currentTime: number): boolean {
    this.drain(currentTime);

    if (this.queueSize < this.capacity) {
      this.queueSize += 1;
      return true;
    }

    return false;
  }

  private drain(currentTime: number): void {
    if (this.leakRate <= 0) {
      this.lastLeakTime = currentTime;
      return;
    }

    const elapsedMs = currentTime - this.lastLeakTime;

    if (elapsedMs <= 0) return;

    const msPerLeak = 1000 / this.leakRate;
    const actualLeak = Math.floor(elapsedMs / msPerLeak);

    if (actualLeak <= 0) return;

    this.queueSize = Math.max(0, this.queueSize - actualLeak);
    this.lastLeakTime += actualLeak * msPerLeak;
  }

  public getState(currentTime: number): LeakyBucketState {
    this.drain(currentTime);

    return {
      queueSize: this.queueSize,
      capacity: this.capacity,
      leakRate: this.leakRate,
      lastLeakTime: this.lastLeakTime,
    };
  }

  public reset(config: LeakyBucketConfig, startTime: number): void {
    this.capacity = config.capacity;
    this.leakRate = config.leakRate;
    this.queueSize = 0;
    this.lastLeakTime = startTime;
  }
}
