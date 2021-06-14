export type ExchangeFilterType = ExchangeMaxNumOrders | ExchangeMaxAlgoOrders;

// enum ExchangeFilters {
//   EXCHANGE_MAX_NUM_ORDERS = "EXCHANGE_MAX_NUM_ORDERS",
//   EXCHANGE_MAX_ALGO_ORDERS = "EXCHANGE_MAX_ALGO_ORDERS",
// }

type ExchangeMaxNumOrders = {
  filterType: "EXCHANGE_MAX_NUM_ORDERS";
  maxNumOrders: number;
};

type ExchangeMaxAlgoOrders = {
  filterType: "EXCHANGE_MAX_ALGO_ORDERS";
  maxNumAlgoOrders: number;
};
