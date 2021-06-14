import { RateLimitType } from "./RateLimit.ts";
import { ExchangeFilterType } from "./ExchangeFilter.ts";
import SymbolType from "./Symbol.ts";

export default interface ExchangeInfo {
  timezone: string; // "UTC"
  serverTime: number; // 156000000000
  rateLimits: RateLimitType[];
  exchangeFilters: ExchangeFilterType[];
  symbols: SymbolType[];
}
