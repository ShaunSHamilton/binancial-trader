import { AccountOrderGetType } from "../types/Account.ts";

export const getAllOpenOrders: AccountOrderGetType[] = [
  {
    symbol: "LTCBTC",
    orderId: 1,
    orderListId: -1, //Unless OCO, the value will always be -1
    clientOrderId: "myOrder1",
    price: "0.1",
    origQty: "1.0",
    executedQty: "0.0",
    cummulativeQuoteQty: "0.0",
    status: "NEW",
    timeInForce: "GTC",
    type: "LIMIT",
    side: "BUY",
    stopPrice: "0.0",
    icebergQty: "0.0",
    time: 1499827319559,
    updateTime: 1499827319559,
    isWorking: true,
    origQuoteOrderQty: "0.000000",
  },
];
