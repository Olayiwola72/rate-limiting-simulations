import type { TokenBucketState } from "./token-bucket.types";

export class TokenBucket {
  private capacity: number;
  private tokens: number;
  private refillRate: number;
  private lastRefillTime: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate;
    this.lastRefillTime = performance.now();
  }

  private refill() {
    const now = performance.now();
    const elapsedSeconds = (now - this.lastRefillTime) / 1000;

    const tokensToAdd = elapsedSeconds * this.refillRate;

    if (tokensToAdd >= 1) {
      this.tokens = Math.min(
        this.capacity,
        this.tokens + Math.floor(tokensToAdd)
      );
      this.lastRefillTime = now;
    }
  }

  public allowRequest(): boolean {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }

    return false;
  }

  public getState(): TokenBucketState {
    this.refill();

    return {
      capacity: this.capacity,
      tokens: this.tokens,
      refillRate: this.refillRate,
    };
  }

  public reset(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefillTime = performance.now();
  }
}