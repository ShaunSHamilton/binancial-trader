export interface MarketDepthType {
  lastUpdateId: number;
  bids: string[][];
  asks: string[][];
}

export interface MarketTradeType {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export interface MarketHistoricalTradeType {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export interface MarketAggTradeType {
  a: number; // Aggregate tradeId
  p: string; // Price
  q: string; // Quantity
  f: number; // First tradeId
  l: number; // Last tradeId
  T: number; // Timestamp
  m: boolean; // Was the buyer the maker?
  M: boolean; // Was the trade the best price match?
}

export type MarketKline = (string | number)[][];

export enum MarketKlinesEnum {
  OpenTime,
  Open,
  High,
  Low,
  Close,
  Volume,
  CloseTime,
  QuoteAssetVolume,
  NumTrades,
  TakerBuyBaseAssetVolume,
  TakerBuyQuoteAssetVolume,
  Ignore,
}

export enum MarketKlineEnum {
  ONE_MINUTE = "1m",
  THREE_MINUTES = "3m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  THIRTY_MINUTES = "30m",
  ONE_HOUR = "1h",
  TWO_HOUR = "2h",
  FOUR_HOUR = "4h",
  SIX_HOUR = "6h",
  EIGHT_HOUR = "8h",
  TWELVE_HOUR = "12h",
  ONE_DAY = "1d",
  THREE_DAY = "3d",
  ONE_WEEK = "1w",
  ONE_MONTH = "1M",
}

export interface MarketAvgPriceType {
  mins: number;
  price: string;
}

export interface MarketTicker24hrType {
  symbol: string; // "BNBBTC";
  priceChange: string; // "-94.99999800";
  priceChangePercent: string; // "-95.960";
  weightedAvgPrice: string; // "0.29628482";
  prevClosePrice: string; // "0.10002000";
  lastPrice: string; // "4.00000200";
  lastQty: string; // "200.00000000";
  bidPrice: string; // "4.00000000";
  askPrice: string; // "4.00000200";
  openPrice: string; // "99.00000000";
  highPrice: string; // "100.00000000";
  lowPrice: string; // "0.10000000";
  volume: string; // "8913.30000000";
  quoteVolume: string; // "15.30000000";
  openTime: number; // 1499783499040;
  closeTime: number; // 1499869899040;
  firstId: number; // 28385; // First tradeId
  lastId: number; // 28460; // Last tradeId
  count: number; // 76; // Trade count
}

export interface MarketTickerPriceType {
  symbol: string;
  price: string;
}

export interface MarketTickerBookTickerType {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}
