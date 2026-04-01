// Throughput graph history length
export const HISTORY_LENGTH = 20;

export const DEFAULT_CAPACITY = 10;       // default capacity
export const DEFAULT_REQUEST_RATE = 8;    // requests per second

// Token Bucket default values
export const DEFAULT_REFILL_RATE = 5;     // tokens per second
export const DEFAULT_TOKENS = 10;         // initial tokens

// Fixed Window Defaults
export const DEFAULT_FW_LIMIT = 20;
export const DEFAULT_FW_WINDOW_MS = 5000;
export const DEFAULT_FW_REQUEST_RATE = 15;

// Sliding Window Counter Defaults
export const DEFAULT_SWC_LIMIT = 10;
export const DEFAULT_SWC_WINDOW_MS = 5000;
export const DEFAULT_SWC_REQUEST_RATE = 5;

// Leaky Bucket Defaults
export const DEFAULT_LEAK_RATE = 5;