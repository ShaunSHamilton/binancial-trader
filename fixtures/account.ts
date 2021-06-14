import {
  AccountOrderACKType,
  AccountOrderRESULTType,
  AccountOrderFULLType,
  AccountOrderDeleteAllOpenType,
  AccountOrderDeleteType,
  AccountOrderGetType,
  AccountOrderPostNewOCOType,
  AccountTradeType,
  AccountType,
} from "../types/Account.ts";

export const postOrderACK: AccountOrderACKType = {
  symbol: "BTCUSDT",
  orderId: 28,
  orderListId: -1, //Unless OCO, value will be -1
  clientOrderId: "6gCrw2kRUAF9CvJDGP16IP",
  transactTime: 1507725176595,
};
export const postOrderRESULT: AccountOrderRESULTType = {
  symbol: "BTCUSDT",
  orderId: 28,
  orderListId: -1, //Unless OCO, value will be -1
  clientOrderId: "6gCrw2kRUAF9CvJDGP16IP",
  transactTime: 1507725176595,
  price: "0.00000000",
  origQty: "10.00000000",
  executedQty: "10.00000000",
  cummulativeQuoteQty: "10.00000000",
  status: "FILLED",
  timeInForce: "GTC",
  type: "MARKET",
  side: "SELL",
};
export const postOrderFULL: AccountOrderFULLType = {
  symbol: "BTCUSDT",
  orderId: 28,
  orderListId: -1, //Unless OCO, value will be -1
  clientOrderId: "6gCrw2kRUAF9CvJDGP16IP",
  transactTime: 1507725176595,
  price: "0.00000000",
  origQty: "10.00000000",
  executedQty: "10.00000000",
  cummulativeQuoteQty: "10.00000000",
  status: "FILLED",
  timeInForce: "GTC",
  type: "MARKET",
  side: "SELL",
  fills: [
    {
      price: "4000.00000000",
      qty: "1.00000000",
      commission: "4.00000000",
      commissionAsset: "USDT",
    },
    {
      price: "3999.00000000",
      qty: "5.00000000",
      commission: "19.99500000",
      commissionAsset: "USDT",
    },
    {
      price: "3998.00000000",
      qty: "2.00000000",
      commission: "7.99600000",
      commissionAsset: "USDT",
    },
    {
      price: "3997.00000000",
      qty: "1.00000000",
      commission: "3.99700000",
      commissionAsset: "USDT",
    },
    {
      price: "3995.00000000",
      qty: "1.00000000",
      commission: "3.99500000",
      commissionAsset: "USDT",
    },
  ],
};

export const postOrderTest = {};

export const getOrder: AccountOrderGetType = {
  symbol: "LTCBTC",
  orderId: 1,
  orderListId: -1, //Unless part of an OCO, the value will always be -1.
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
};

export const deleteOrder: AccountOrderDeleteType = {
  symbol: "LTCBTC",
  origClientOrderId: "myOrder1",
  orderId: 4,
  orderListId: -1, //Unless part of an OCO, the value will always be -1.
  clientOrderId: "cancelMyOrder1",
  price: "2.00000000",
  origQty: "1.00000000",
  executedQty: "0.00000000",
  cummulativeQuoteQty: "0.00000000",
  status: "CANCELED",
  timeInForce: "GTC",
  type: "LIMIT",
  side: "BUY",
};

export const deleteOpenOrders: AccountOrderDeleteAllOpenType[] = [
  {
    symbol: "BTCUSDT",
    origClientOrderId: "E6APeyTJvkMvLMYMqu1KQ4",
    orderId: 11,
    orderListId: -1,
    clientOrderId: "pXLV6Hz6mprAcVYpVMTGgx",
    price: "0.089853",
    origQty: "0.178622",
    executedQty: "0.000000",
    cummulativeQuoteQty: "0.000000",
    status: "CANCELED",
    timeInForce: "GTC",
    type: "LIMIT",
    side: "BUY",
  },
  {
    symbol: "BTCUSDT",
    origClientOrderId: "A3EF2HCwxgZPFMrfwbgrhv",
    orderId: 13,
    orderListId: -1,
    clientOrderId: "pXLV6Hz6mprAcVYpVMTGgx",
    price: "0.090430",
    origQty: "0.178622",
    executedQty: "0.000000",
    cummulativeQuoteQty: "0.000000",
    status: "CANCELED",
    timeInForce: "GTC",
    type: "LIMIT",
    side: "BUY",
  },
  {
    orderListId: 1929,
    contingencyType: "OCO",
    listStatusType: "ALL_DONE",
    listOrderStatus: "ALL_DONE",
    listClientOrderId: "2inzWQdDvZLHbbAmAozX2N",
    transactionTime: 1585230948299,
    symbol: "BTCUSDT",
    orders: [
      {
        symbol: "BTCUSDT",
        orderId: 20,
        clientOrderId: "CwOOIPHSmYywx6jZX77TdL",
      },
      {
        symbol: "BTCUSDT",
        orderId: 21,
        clientOrderId: "461cPg51vQjV3zIMOXNz39",
      },
    ],
    orderReports: [
      {
        symbol: "BTCUSDT",
        origClientOrderId: "CwOOIPHSmYywx6jZX77TdL",
        orderId: 20,
        orderListId: 1929,
        clientOrderId: "pXLV6Hz6mprAcVYpVMTGgx",
        price: "0.668611",
        origQty: "0.690354",
        executedQty: "0.000000",
        cummulativeQuoteQty: "0.000000",
        status: "CANCELED",
        timeInForce: "GTC",
        type: "STOP_LOSS_LIMIT",
        side: "BUY",
        stopPrice: "0.378131",
        icebergQty: "0.017083",
      },
      {
        symbol: "BTCUSDT",
        origClientOrderId: "461cPg51vQjV3zIMOXNz39",
        orderId: 21,
        orderListId: 1929,
        clientOrderId: "pXLV6Hz6mprAcVYpVMTGgx",
        price: "0.008791",
        origQty: "0.690354",
        executedQty: "0.000000",
        cummulativeQuoteQty: "0.000000",
        status: "CANCELED",
        timeInForce: "GTC",
        type: "LIMIT_MAKER",
        side: "BUY",
        icebergQty: "0.639962",
      },
    ],
  },
];

export const getOpenOrders: AccountOrderGetType[] = [
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

export const getAllOrders: AccountOrderGetType[] = [
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

export const postOrderOCO: AccountOrderPostNewOCOType = {
  orderListId: 0,
  contingencyType: "OCO",
  listStatusType: "EXEC_STARTED",
  listOrderStatus: "EXECUTING",
  listClientOrderId: "JYVpp3F0f5CAG15DhtrqLp",
  transactionTime: 1563417480525,
  symbol: "LTCBTC",
  orders: [
    {
      symbol: "LTCBTC",
      orderId: 2,
      clientOrderId: "Kk7sqHb9J6mJWTMDVW7Vos",
    },
    {
      symbol: "LTCBTC",
      orderId: 3,
      clientOrderId: "xTXKaGYd4bluPVp78IVRvl",
    },
  ],
  orderReports: [
    {
      symbol: "LTCBTC",
      orderId: 2,
      orderListId: 0,
      clientOrderId: "Kk7sqHb9J6mJWTMDVW7Vos",
      transactTime: 1563417480525,
      price: "0.000000",
      origQty: "0.624363",
      executedQty: "0.000000",
      cummulativeQuoteQty: "0.000000",
      status: "NEW",
      timeInForce: "GTC",
      type: "STOP_LOSS",
      side: "BUY",
      stopPrice: "0.960664",
    },
    {
      symbol: "LTCBTC",
      orderId: 3,
      orderListId: 0,
      clientOrderId: "xTXKaGYd4bluPVp78IVRvl",
      transactTime: 1563417480525,
      price: "0.036435",
      origQty: "0.624363",
      executedQty: "0.000000",
      cummulativeQuoteQty: "0.000000",
      status: "NEW",
      timeInForce: "GTC",
      type: "LIMIT_MAKER",
      side: "BUY",
    },
  ],
};

export const deleteOrderList: AccountOrderPostNewOCOType = {
  orderListId: 0,
  contingencyType: "OCO",
  listStatusType: "ALL_DONE",
  listOrderStatus: "ALL_DONE",
  listClientOrderId: "C3wyj4WVEktd7u9aVBRXcN",
  transactionTime: 1574040868128,
  symbol: "LTCBTC",
  orders: [
    {
      symbol: "LTCBTC",
      orderId: 2,
      clientOrderId: "pO9ufTiFGg3nw2fOdgeOXa",
    },
    {
      symbol: "LTCBTC",
      orderId: 3,
      clientOrderId: "TXOvglzXuaubXAaENpaRCB",
    },
  ],
  orderReports: [
    {
      symbol: "LTCBTC",
      origClientOrderId: "pO9ufTiFGg3nw2fOdgeOXa",
      orderId: 2,
      orderListId: 0,
      clientOrderId: "unfWT8ig8i0uj6lPuYLez6",
      price: "1.00000000",
      origQty: "10.00000000",
      executedQty: "0.00000000",
      cummulativeQuoteQty: "0.00000000",
      status: "CANCELED",
      timeInForce: "GTC",
      type: "STOP_LOSS_LIMIT",
      side: "SELL",
      stopPrice: "1.00000000",
    },
    {
      symbol: "LTCBTC",
      origClientOrderId: "TXOvglzXuaubXAaENpaRCB",
      orderId: 3,
      orderListId: 0,
      clientOrderId: "unfWT8ig8i0uj6lPuYLez6",
      price: "3.00000000",
      origQty: "10.00000000",
      executedQty: "0.00000000",
      cummulativeQuoteQty: "0.00000000",
      status: "CANCELED",
      timeInForce: "GTC",
      type: "LIMIT_MAKER",
      side: "SELL",
    },
  ],
};

export const getOrderList: AccountOrderPostNewOCOType = {
  orderListId: 27,
  contingencyType: "OCO",
  listStatusType: "EXEC_STARTED",
  listOrderStatus: "EXECUTING",
  listClientOrderId: "h2USkA5YQpaXHPIrkd96xE",
  transactionTime: 1565245656253,
  symbol: "LTCBTC",
  orders: [
    {
      symbol: "LTCBTC",
      orderId: 4,
      clientOrderId: "qD1gy3kc3Gx0rihm9Y3xwS",
    },
    {
      symbol: "LTCBTC",
      orderId: 5,
      clientOrderId: "ARzZ9I00CPM8i3NhmU9Ega",
    },
  ],
};

export const getAllOrderList: AccountOrderPostNewOCOType[] = [
  {
    orderListId: 29,
    contingencyType: "OCO",
    listStatusType: "EXEC_STARTED",
    listOrderStatus: "EXECUTING",
    listClientOrderId: "amEEAXryFzFwYF1FeRpUoZ",
    transactionTime: 1565245913483,
    symbol: "LTCBTC",
    orders: [
      {
        symbol: "LTCBTC",
        orderId: 4,
        clientOrderId: "oD7aesZqjEGlZrbtRpy5zB",
      },
      {
        symbol: "LTCBTC",
        orderId: 5,
        clientOrderId: "Jr1h6xirOxgeJOUuYQS7V3",
      },
    ],
  },
  {
    orderListId: 28,
    contingencyType: "OCO",
    listStatusType: "EXEC_STARTED",
    listOrderStatus: "EXECUTING",
    listClientOrderId: "hG7hFNxJV6cZy3Ze4AUT4d",
    transactionTime: 1565245913407,
    symbol: "LTCBTC",
    orders: [
      {
        symbol: "LTCBTC",
        orderId: 2,
        clientOrderId: "j6lFOfbmFMRjTYA7rRJ0LP",
      },
      {
        symbol: "LTCBTC",
        orderId: 3,
        clientOrderId: "z0KCjOdditiLS5ekAFtK81",
      },
    ],
  },
];

export const getOpenOrderList: AccountOrderPostNewOCOType[] = [
  {
    orderListId: 31,
    contingencyType: "OCO",
    listStatusType: "EXEC_STARTED",
    listOrderStatus: "EXECUTING",
    listClientOrderId: "wuB13fmulKj3YjdqWEcsnp",
    transactionTime: 1565246080644,
    symbol: "1565246079109",
    orders: [
      {
        symbol: "LTCBTC",
        orderId: 4,
        clientOrderId: "r3EH2N76dHfLoSZWIUw1bT",
      },
      {
        symbol: "LTCBTC",
        orderId: 5,
        clientOrderId: "Cv1SnyPD3qhqpbjpYEHbd2",
      },
    ],
  },
];

export const getAccount: AccountType = {
  makerCommission: 15,
  takerCommission: 15,
  buyerCommission: 0,
  sellerCommission: 0,
  canTrade: true,
  canWithdraw: true,
  canDeposit: true,
  updateTime: 123456789,
  accountType: "SPOT",
  balances: [
    {
      asset: "BTC",
      free: "4723846.89208129",
      locked: "0.00000000",
    },
    {
      asset: "LTC",
      free: "4763368.68006011",
      locked: "0.00000000",
    },
  ],
  permissions: ["SPOT"],
};

export const getMyTrades: AccountTradeType[] = [
  {
    symbol: "BNBBTC",
    id: 28457,
    orderId: 100234,
    orderListId: -1,
    price: "4.00000100",
    qty: "12.00000000",
    quoteQty: "48.000012",
    commission: "10.10000000",
    commissionAsset: "BNB",
    time: 1499865549590,
    isBuyer: true,
    isMaker: false,
    isBestMatch: true,
  },
];
