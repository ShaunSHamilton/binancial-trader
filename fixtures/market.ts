import {
  MarketAggTradeType,
  MarketAvgPriceType,
  MarketDepthType,
  MarketHistoricalTradeType,
  MarketKline,
  // MarketKlinesEnum,
  MarketTicker24hrType,
  MarketTickerBookTickerType,
  MarketTickerPriceType,
  MarketTradeType,
} from "../types/MarketData.ts";

export const getDepth: MarketDepthType = {
  lastUpdateId: 1027024,
  bids: [
    [
      "4.00000000", // PRICE
      "431.00000000", // QTY
    ],
  ],
  asks: [["4.00000200", "12.00000000"]],
};

export const getTrades: MarketTradeType[] = [
  {
    id: 28457,
    price: "4.00000100",
    qty: "12.00000000",
    quoteQty: "48.000012",
    time: 1499865549590,
    isBuyerMaker: true,
    isBestMatch: true,
  },
];

export const getHistoricalTrades: MarketHistoricalTradeType[] = [
  {
    id: 28457,
    price: "4.00000100",
    qty: "12.00000000",
    quoteQty: "48.000012",
    time: 1499865549590,
    isBuyerMaker: true,
    isBestMatch: true,
  },
];

export const getAggTrades: MarketAggTradeType[] = [
  {
    a: 26129, // Aggregate tradeId
    p: "0.01633102", // Price
    q: "4.70443515", // Quantity
    f: 27781, // First tradeId
    l: 27781, // Last tradeId
    T: 1498793709153, // Timestamp
    m: true, // Was the buyer the maker?
    M: true, // Was the trade the best price match?
  },
];

export const getKlines: MarketKline = [
  [
    1499040000000, // Open time
    "0.01634790", // Open
    "0.80000000", // High
    "0.01575800", // Low
    "0.01577100", // Close
    "148976.11427815", // Volume
    1499644799999, // Close time
    "2434.19055334", // Quote asset volume
    308, // Number of trades
    "1756.87402397", // Taker buy base asset volume
    "28.46694368", // Taker buy quote asset volume
    "17928899.62484339", // Ignore.
  ],
];

export const getAvgPrice: MarketAvgPriceType = {
  mins: 5,
  price: "9.35751834",
};

export const getTicker24hr: MarketTicker24hrType = {
  symbol: "BNBBTC",
  priceChange: "-94.99999800",
  priceChangePercent: "-95.960",
  weightedAvgPrice: "0.29628482",
  prevClosePrice: "0.10002000",
  lastPrice: "4.00000200",
  lastQty: "200.00000000",
  bidPrice: "4.00000000",
  askPrice: "4.00000200",
  openPrice: "99.00000000",
  highPrice: "100.00000000",
  lowPrice: "0.10000000",
  volume: "8913.30000000",
  quoteVolume: "15.30000000",
  openTime: 1499783499040,
  closeTime: 1499869899040,
  firstId: 28385, // First tradeId
  lastId: 28460, // Last tradeId
  count: 76, // Trade count
};

export const getTickerPrice: MarketTickerPriceType = {
  symbol: "LTCBTC",
  price: "4.00000200",
};

export const getTickerBookTicker: MarketTickerBookTickerType = {
  symbol: "LTCBTC",
  bidPrice: "4.00000000",
  bidQty: "431.00000000",
  askPrice: "4.00000200",
  askQty: "9.00000000",
};
