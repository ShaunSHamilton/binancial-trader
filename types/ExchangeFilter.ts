export type ExchangeFilterType =
  | ExchangeMaxNumOrders
  | ExchangeMaxNumAlgoOrders;

export enum ExchangeFiltersEnum {
  EXCHANGE_MAX_NUM_ORDERS = "EXCHANGE_MAX_NUM_ORDERS",
  EXCHANGE_MAX_NUM_ALGO_ORDERS = "EXCHANGE_MAX_NUM_ALGO_ORDERS",
}

type ExchangeMaxNumOrders = {
  filterType: ExchangeFiltersEnum.EXCHANGE_MAX_NUM_ORDERS;
  maxNumOrders: number;
};

type ExchangeMaxNumAlgoOrders = {
  filterType: ExchangeFiltersEnum.EXCHANGE_MAX_NUM_ALGO_ORDERS;
  maxNumAlgoOrders: number;
};
