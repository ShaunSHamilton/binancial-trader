export type RateLimitType = RequestWeight | Orders | RawRequests;

// enum RateLimits {
//   REQUEST_WEIGHT = "REQUEST_WEIGHT",
//   ORDERS = "ORDERS",
//   RAW_REQUESTS = "RAW_REQUESTS",
// }
// const RateLimits = {
//   REQUEST_WEIGHTS: "REQUEST_WEIGHTS",
//   ORDERS: "ORDERS",
//   RAW_REQUESTS: "RAW_REQUESTS"
// } as const;

type SubRateLimit = {
  interval: string;
  intervalNum: number;
  limit: number;
};

type RequestWeight = {
  rateLimitType: "REQUEST_WEIGHT";
} & SubRateLimit;

type Orders = {
  rateLimitType: "ORDERS";
} & SubRateLimit;

type RawRequests = {
  rateLimitType: "RAW_REQUESTS";
} & SubRateLimit;
