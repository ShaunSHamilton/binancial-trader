export interface AccountOrderACKType extends OrderType {
  orderListId: number;
  transactTime?: number;
}

export interface AccountOrderRESULTType extends AccountOrderVerbType {
  transactTime: number;
}

export interface AccountOrderFULLType extends AccountOrderRESULTType {
  fills: FillType[];
}
type FillType = {
  price: string; // "4000.00000000",
  qty: string; // "1.00000000",
  commission: string; // "4.00000000",
  commissionAsset: string; // "USDT"
};

export type AccountOrderType<T extends AccountOrderResponseEnum> =
  T extends AccountOrderResponseEnum.ACK
    ? AccountOrderACKType
    : T extends AccountOrderResponseEnum.RESULT
    ? AccountOrderRESULTType
    : AccountOrderFULLType;

export enum AccountOrderResponseEnum {
  ACK,
  RESULT,
  FULL,
}

export enum AccountOrderSideEnum {
  BUY = "BUY",
  SELL = "SELL",
}

export enum AccountOrderTimeInForceEnum {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK",
}

export interface AccountOrderVerbType extends OrderType {
  orderListId?: number; // -1; //Unless part of an OCO, the value will always be -1.
  origClientOrderId?: string;
  price?: string; // "0.1";
  origQty?: string; // "1.0";
  executedQty?: string; // "0.0";
  cummulativeQuoteQty?: string; // "0.0";
  status?: string; // "NEW";
  timeInForce?: string; // "GTC";
  type?: string; // "LIMIT";
  side?: string; // "BUY";
  stopPrice?: string;
  icebergQty?: string;
  transactTime?: number;
}

export interface AccountOrderGetType extends AccountOrderVerbType {
  stopPrice?: string; // "0.0";
  icebergQty: string; // "0.0";
  time: number; // 1499827319559;
  updateTime: number; // 1499827319559;
  isWorking: boolean; // true;
  origQuoteOrderQty: string; // "0.000000";
}

export interface AccountOrderDeleteType extends AccountOrderVerbType {
  origClientOrderId?: string;
}

export interface AccountOrderDeleteAllOpenType extends AccountOrderDeleteType {
  orders?: OrderType[];
  orderReports?: AccountOrderVerbType[];
  contingencyType?: string;
  listStatusType?: string;
  listOrderStatus?: string;
  listClientOrderId?: string;
  transactionTime?: number;
}

export interface AccountOrderPostNewOCOType extends AccountOrderACKType {
  contingencyType: string;
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  orders: OrderType[];
  orderReports?: AccountOrderVerbType[];
  transactionTime?: number;
}

type OrderType = {
  symbol: string;
  orderId?: number;
  clientOrderId?: string;
};

export interface AccountType {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
  accountType: string;
  balances: BalanceType[];
  permissions: string[];
}

type BalanceType = {
  asset: string;
  free: string;
  locked: string;
};

export interface AccountTradeType {
  symbol: string;
  id: number;
  orderId: number;
  orderListId: number;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
}
