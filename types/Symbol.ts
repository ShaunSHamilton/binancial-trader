export default interface SymbolType {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: (keyof typeof OrderTypes)[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: SymbolFilterTypes[];
  permissions: (keyof typeof PermissionTypes)[];
}

export enum OrderTypes {
  LIMIT = "LIMIT",
  LIMIT_MAKER = "LIMIT_MAKER",
  MARKET = "MARKET",
  STOP_LOSS = "STOP_LOSS",
  STOP_LOSS_LIMIT = "STOP_LOSS_LIMIT",
  TAKE_PROFIT = "TAKE_PROFIT",
  TAKE_PROFIT_LIMIT = "TAKE_PROFIT_LIMIT",
}

enum PermissionTypes {
  SPOT = "SPOT",
  MARGIN = "MARGIN",
}

type SymbolFilterTypes =
  | PriceFilter
  | PercentPrice
  | LotSize
  | MinNotional
  | IcebergParts
  | MarketLotSize
  | MaxNumOrders
  | MaxNumAlgoOrders
  | MaxNumIcebergOrders
  | MaxPositionFilter;

export enum SymbolFiltersEnum {
  PRICE_FILTER = "PRICE_FILTER",
  PERCENT_PRICE = "PERCENT_PRICE",
  LOT_SIZE = "LOT_SIZE",
  MIN_NOTIONAL = "MIN_NOTIONAL",
  ICEBERG_PARTS = "ICEBERG_PARTS",
  MARKET_LOT_SIZE = "MARKET_LOT_SIZE",
  MAX_NUM_ORDERS = "MAX_NUM_ORDERS",
  MAX_NUM_ALGO_ORDERS = "MAX_NUM_ALGO_ORDERS",
  MAX_NUM_ICEBERG_ORDERS = "MAX_NUM_ICEBERG_ORDERS",
  MAX_POSITION = "MAX_POSITION",
}

type PriceFilter = {
  filterType: SymbolFiltersEnum.PRICE_FILTER;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
};

type PercentPrice = {
  filterType: SymbolFiltersEnum.PERCENT_PRICE;
  multiplierUp: string;
  multiplierDown: string;
  avgPriceMins: number;
};

type LotSize = {
  filterType: SymbolFiltersEnum.LOT_SIZE;
  minQty: string;
  maxQty: string;
  stepSize: string;
};

type MinNotional = {
  filterType: SymbolFiltersEnum.MIN_NOTIONAL;
  minNotional: string;
  applyToMarket: boolean;
  avgPriceMins: number;
};

type IcebergParts = {
  filterType: SymbolFiltersEnum.ICEBERG_PARTS;
  limit: number;
};

type MarketLotSize = {
  filterType: SymbolFiltersEnum.MARKET_LOT_SIZE;
  minQty: string;
  maxQty: string;
  stepSize: string;
};

type MaxNumOrders = {
  filterType: SymbolFiltersEnum.MAX_NUM_ORDERS;
  maxNumOrders: number;
};

type MaxNumAlgoOrders = {
  filterType: SymbolFiltersEnum.MAX_NUM_ALGO_ORDERS;
  maxNumAlgoOrders: number;
};

type MaxNumIcebergOrders = {
  filterType: SymbolFiltersEnum.MAX_NUM_ICEBERG_ORDERS;
  maxNumIcebergOrders: number;
};

type MaxPositionFilter = {
  filterType: SymbolFiltersEnum.MAX_POSITION;
  maxPosition: string;
};
