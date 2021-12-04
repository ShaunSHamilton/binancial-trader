import { ExchangeFiltersEnum } from "../types/ExchangeFilter.ts";
import ExchangeInfoType from "../types/ExchangeInfo.ts";
import { SymbolFiltersEnum } from "../types/Symbol.ts";

export const getExchangeInfo: ExchangeInfoType = {
  timezone: "UTC",
  serverTime: 1565246363776,
  rateLimits: [
    {
      rateLimitType: "REQUEST_WEIGHT",
      interval: "MINUTE",
      intervalNum: 1,
      limit: 1200,
    },
    {
      rateLimitType: "ORDERS",
      interval: "SECOND",
      intervalNum: 1,
      limit: 10,
    },
    {
      rateLimitType: "RAW_REQUESTS",
      interval: "MINUTE",
      intervalNum: 5,
      limit: 5000,
    },
  ],
  exchangeFilters: [
    {
      filterType: ExchangeFiltersEnum.EXCHANGE_MAX_NUM_ORDERS,
      maxNumOrders: 1000,
    },
    {
      filterType: ExchangeFiltersEnum.EXCHANGE_MAX_NUM_ALGO_ORDERS,
      maxNumAlgoOrders: 200,
    },
  ],
  symbols: [
    {
      symbol: "ETHBTC",
      status: "TRADING",
      baseAsset: "ETH",
      baseAssetPrecision: 8,
      quoteAsset: "BTC",
      quotePrecision: 8, // will be removed in future api versions (v4+)
      quoteAssetPrecision: 8,
      baseCommissionPrecision: 8,
      quoteCommissionPrecision: 8,
      orderTypes: [
        "LIMIT",
        "LIMIT_MAKER",
        "MARKET",
        "STOP_LOSS",
        "STOP_LOSS_LIMIT",
        "TAKE_PROFIT",
        "TAKE_PROFIT_LIMIT",
      ],
      icebergAllowed: true,
      ocoAllowed: true,
      quoteOrderQtyMarketAllowed: true,
      isSpotTradingAllowed: true,
      isMarginTradingAllowed: true,
      filters: [
        {
          filterType: SymbolFiltersEnum.PRICE_FILTER,
          minPrice: "0.00000100",
          maxPrice: "100000.00000000",
          tickSize: "0.00000100",
        },
        {
          filterType: SymbolFiltersEnum.PERCENT_PRICE,
          multiplierUp: "1.3000",
          multiplierDown: "0.7000",
          avgPriceMins: 5,
        },
        {
          filterType: SymbolFiltersEnum.LOT_SIZE,
          minQty: "0.00100000",
          maxQty: "100000.00000000",
          stepSize: "0.00100000",
        },
        {
          filterType: SymbolFiltersEnum.MIN_NOTIONAL,
          minNotional: "0.00100000",
          applyToMarket: true,
          avgPriceMins: 5,
        },
        {
          filterType: SymbolFiltersEnum.ICEBERG_PARTS,
          limit: 10,
        },
        {
          filterType: SymbolFiltersEnum.MARKET_LOT_SIZE,
          minQty: "0.00100000",
          maxQty: "100000.00000000",
          stepSize: "0.00100000",
        },
        {
          filterType: SymbolFiltersEnum.MAX_NUM_ORDERS,
          maxNumOrders: 25,
        },
        {
          filterType: SymbolFiltersEnum.MAX_NUM_ALGO_ORDERS,
          maxNumAlgoOrders: 5,
        },
        {
          filterType: SymbolFiltersEnum.MAX_NUM_ICEBERG_ORDERS,
          maxNumIcebergOrders: 5,
        },
        {
          filterType: SymbolFiltersEnum.MAX_POSITION,
          maxPosition: "10.00000000",
        },
      ],
      permissions: ["SPOT", "MARGIN"],
    },
  ],
};
