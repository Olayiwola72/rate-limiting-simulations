export interface LeakyBucketConfig {
    capacity: number;      // max queue size
    leakRate: number;      // requests drained per second
}

export interface LeakyBucketState {
    queueSize: number;
    capacity: number;
    leakRate: number;
    lastLeakTime: number;
}