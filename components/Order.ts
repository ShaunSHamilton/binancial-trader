import { handleDelete, handleGet, handlePost, error } from "../tools/index.ts";
import { ErrType, Prom } from "../types/index.ts";
import {
  AccountOrderDeleteAllOpenType,
  AccountOrderDeleteType,
  AccountOrderGetType,
  AccountOrderPostNewOCOType,
  AccountOrderResponseEnum,
  AccountOrderSideEnum,
  AccountOrderTimeInForceEnum,
  AccountOrderType,
} from "../types/Account.ts";
import { OrderTypes } from "../types/Symbol.ts";
import Account from "./Account.ts";

class Order extends Account {
  symbol: string;
  constructor(symbol: string) {
    super(symbol);
    this.symbol = symbol;
  }

  // get weight(): number {
  //   return {}
  // }

  async postOrder<T extends AccountOrderResponseEnum>(
    side: AccountOrderSideEnum,
    type: OrderTypes,
    timeInForce?: AccountOrderTimeInForceEnum,
    quantity?: number,
    quoteOrderQty?: number,
    price?: number,
    newClientOrderId?: string,
    stopPrice?: number,
    icebergQty?: number,
    newOrderRespType?: T,
    recvWindow?: number
  ): Prom<AccountOrderType<T>> {
    if (type === OrderTypes.LIMIT && (!timeInForce || !quantity || !price)) {
      return await error(["timeInForce", "quantity", "price"]);
    } else if (type === OrderTypes.MARKET && !(quantity || quoteOrderQty)) {
      return await error([], ["quantity", "quoteOrderQty"]);
    } else if (type === OrderTypes.STOP_LOSS && !(quantity && stopPrice)) {
      return await error(["quantity", "stopPrice"]);
    } else if (
      type === OrderTypes.STOP_LOSS_LIMIT &&
      !(timeInForce && quantity && price && stopPrice)
    ) {
      return await error(["timeInForce", "quantity", "price", "stopPrice"]);
    } else if (type === OrderTypes.TAKE_PROFIT && !(quantity && stopPrice)) {
      return await error(["quantity", "stopPrice"]);
    } else if (
      type === OrderTypes.TAKE_PROFIT_LIMIT &&
      !(timeInForce && quantity && price && stopPrice)
    ) {
      return await error(["timeInForce", "quantity", "price", "stopPrice"]);
    } else if (type === OrderTypes.LIMIT_MAKER && !(quantity && price)) {
      return await error(["quantity", "price"]);
    }
    return await handlePost(
      "/order",
      {
        symbol: this.symbol,
        side,
        type,
        timestamp: true,
        timeInForce,
        quantity,
        quoteOrderQty,
        price,
        newClientOrderId,
        stopPrice,
        icebergQty,
        newOrderRespType,
        recvWindow,
      },
      true
    );
  }

  async postTestOrder<T extends AccountOrderResponseEnum>(
    side: AccountOrderSideEnum,
    type: OrderTypes,
    timeInForce?: AccountOrderTimeInForceEnum,
    quantity?: number,
    quoteOrderQty?: number,
    price?: number,
    newClientOrderId?: string,
    stopPrice?: number,
    icebergQty?: number,
    newOrderRespType?: T,
    recvWindow?: number
  ): Prom<Record<string, unknown>> {
    if (type === OrderTypes.LIMIT && (!timeInForce || !quantity || !price)) {
      return await error(["timeInForce", "quantity", "price"]);
    } else if (type === OrderTypes.MARKET && !(quantity || quoteOrderQty)) {
      return await error([], ["quantity", "quoteOrderQty"]);
    } else if (type === OrderTypes.STOP_LOSS && !(quantity && stopPrice)) {
      return await error(["quantity", "stopPrice"]);
    } else if (
      type === OrderTypes.STOP_LOSS_LIMIT &&
      !(timeInForce && quantity && price && stopPrice)
    ) {
      return await error(["timeInForce", "quantity", "price", "stopPrice"]);
    } else if (type === OrderTypes.TAKE_PROFIT && !(quantity && stopPrice)) {
      return await error(["quantity", "stopPrice"]);
    } else if (
      type === OrderTypes.TAKE_PROFIT_LIMIT &&
      !(timeInForce && quantity && price && stopPrice)
    ) {
      return await error(["timeInForce", "quantity", "price", "stopPrice"]);
    } else if (type === OrderTypes.LIMIT_MAKER && !(quantity && price)) {
      return await error(["quantity", "price"]);
    }
    return await handlePost(
      "/order/test",
      {
        symbol: this.symbol,
        side,
        type,
        timestamp: true,
        timeInForce,
        quantity,
        quoteOrderQty,
        price,
        newClientOrderId,
        stopPrice,
        icebergQty,
        newOrderRespType,
        recvWindow,
      },
      true
    );
  }

  async getOrder(
    orderId?: number,
    origClientOrderId?: string,
    recvWindow?: number
  ): Prom<AccountOrderGetType> {
    if (!(orderId ?? origClientOrderId) || (orderId && origClientOrderId)) {
      const err: ErrType = {
        message: "Either 'orderId' or 'origClientOrderId' must be sent",
        suggestion: "Ensure to give the correct arguments",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handleGet(
      "/order",
      {
        symbol: this.symbol,
        orderId,
        origClientOrderId,
        recvWindow,
        timestamp: true,
      },
      true
    );
  }

  async deleteOrder(
    orderId?: number,
    origClientOrderId?: string,
    newClientOrderId?: string,
    recvWindow?: number
  ): Prom<AccountOrderDeleteType> {
    if (!(orderId ?? origClientOrderId) || (orderId && origClientOrderId)) {
      const err: ErrType = {
        message: "Either 'orderId' or 'origClientOrderId' must be sent",
        suggestion: "Ensure to give the correct arguments",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handleDelete(
      "/order",
      {
        symbol: this.symbol,
        timestamp: true,
        orderId,
        origClientOrderId,
        newClientOrderId,
        recvWindow,
      },
      true
    );
  }

  async deleteAllOpenOrders(
    recvWindow?: number
  ): Prom<AccountOrderDeleteAllOpenType> {
    return await handleDelete(
      "/openOrders",
      { symbol: this.symbol, timestamp: true, recvWindow },
      true
    );
  }

  async getAllOpenOrders(recvWindow?: number): Prom<AccountOrderGetType[]> {
    return await handleGet(
      "/openOrders",
      { symbol: this.symbol, timestamp: true, recvWindow },
      true
    );
  }

  async getAllOrders(
    orderId?: number,
    startTime?: number,
    endTime?: number,
    limit?: number,
    recvWindow?: number
  ): Prom<AccountOrderGetType[]> {
    return await handleGet(
      "/allOrders",
      {
        symbol: this.symbol,
        timestamp: true,
        orderId,
        startTime,
        endTime,
        limit,
        recvWindow,
      },
      true
    );
  }

  async postNewOCO(
    side: AccountOrderSideEnum,
    quantity: number,
    price: number,
    stopPrice: number,
    listClientOrderId?: string,
    limitClientOrderId?: string,
    limitIcebergQty?: number,
    stopClientOrderId?: string,
    stopLimitPrice?: number,
    stopIcebergQty?: number,
    stopLimitTimeInForce?: AccountOrderTimeInForceEnum,
    newOrderRespType?: AccountOrderResponseEnum,
    recvWindow?: number
  ): Prom<AccountOrderPostNewOCOType> {
    if (stopLimitPrice && !stopLimitTimeInForce) {
      const err: ErrType = {
        message:
          "Both 'stopLimitPrice' and 'stopLimitTimeInForce' are required",
        suggestion: "Ensure to give the correct arguments to postNewOCO",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handlePost(
      "/order/oco",
      {
        symbol: this.symbol,
        side,
        quantity,
        price,
        stopPrice,
        timestamp: true,
        listClientOrderId,
        limitClientOrderId,
        limitIcebergQty,
        stopClientOrderId,
        stopLimitPrice,
        stopIcebergQty,
        stopLimitTimeInForce,
        newOrderRespType,
        recvWindow,
      },
      true
    );
  }

  async deleteOrderList(
    orderListId?: number,
    listClientOrderId?: string,
    newClientOrderId?: string,
    recvWindow?: number
  ): Prom<AccountOrderPostNewOCOType> {
    if (orderListId && listClientOrderId) {
      const err: ErrType = {
        message: "Either 'orderListId' or 'listClientOrderId' must be sent",
        suggestion: "Ensure to give the correct arguments",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handleDelete(
      "/order",
      {
        symbol: this.symbol,
        timestamp: true,
        orderListId,
        listClientOrderId,
        newClientOrderId,
        recvWindow,
      },
      true
    );
  }

  async getOrderList(
    orderListId?: number,
    origClientOrderId?: string,
    recvWindow?: number
  ): Prom<AccountOrderPostNewOCOType> {
    if (orderListId && origClientOrderId) {
      const err: ErrType = {
        message: "Either 'orderListId' or 'listClientOrderId' must be sent",
        suggestion: "Ensure to give the correct arguments",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handleGet(
      "/orderList",
      {
        timestamp: true,
        orderListId,
        origClientOrderId,
        recvWindow,
      },
      true
    );
  }

  async getAllOrderList(
    fromId?: number,
    startTime?: number,
    endTime?: number,
    limit?: number,
    recvWindow?: number
  ): Prom<AccountOrderPostNewOCOType[]> {
    if (fromId && (startTime || endTime)) {
      const err: ErrType = {
        message: `Either 'fromId' or ${
          (startTime && "startTime") || (endTime && "endTime")
        } must be sent`,
        suggestion: "Ensure to give the correct arguments",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handleGet(
      "/allOrderList",
      {
        timestamp: true,
        fromId,
        startTime,
        endTime,
        limit,
        recvWindow,
      },
      true
    );
  }

  async getOpenOrderList(
    recvWindow?: number
  ): Prom<AccountOrderPostNewOCOType[]> {
    if (recvWindow && recvWindow > 60000) {
      const err: ErrType = {
        message: `'recvWindow' must be less than 60000`,
        suggestion: "Ensure to give the correct arguments",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handleGet(
      "/openOrderList",
      {
        timestamp: true,
        recvWindow,
      },
      true
    );
  }
}

export default Order;
