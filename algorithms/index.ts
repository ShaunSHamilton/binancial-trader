import {
  AccountOrderSideEnum,
  AccountOrderTimeInForceEnum,
  AccountOrderResponseEnum,
} from "../types/Account.ts";
import { assertErrType } from "../types/index.ts";
import { OrderTypes } from "../types/Symbol.ts";
import Order from "../components/Order.ts";
import { cron, TimesEnum } from "../tools/cron.ts";

async function checkOrderBook(ord: Order, orderId: number) {
  // Check orderBook and return latest order for symbol
  return await ord.getOrder(orderId);
}

// ---------------------------------

export function initialiseAlgorithm(
  symbol: string,
  baseAssetCountToUse: number,
  baseAssetPriceToBuy: number,
  percentIncreaseToSell: number,
  percentDecreaseToBuy: number
) {
  (async () => {
    const ord = new Order(symbol);
    let orderState = await executeOrder(ord, {
      type: AccountOrderSideEnum.BUY,
      baseAssetCountToUse,
      price: baseAssetPriceToBuy,
    });

    // CRON
    cron(
      TimesEnum.TEN_MINUTES,
      async () => {
        if (assertErrType(orderState)) {
          throw new Error(`orderState errored out with: ${orderState.message}`);
        }
        // // Check orderbook
        const latestOrderState = await checkOrderBook(ord, orderState.orderId);
        if (assertErrType(latestOrderState)) {
          throw new Error(
            `checkOrderBook errored out with: ${latestOrderState.message}`
          );
        }
        const { status, side, price } = latestOrderState;
        // TODO: Price is never undefined in response
        const baseAssetPrice = handleStringToNum(price ?? "0");
        if (status === "FILLED") {
          if (side === AccountOrderSideEnum.SELL) {
            const assetPriceToBuy =
              baseAssetPrice - baseAssetPrice * percentDecreaseToBuy;
            orderState = await executeOrder(ord, {
              type: AccountOrderSideEnum.BUY,
              baseAssetCountToUse,
              price: assetPriceToBuy,
            });
          } else if (side === AccountOrderSideEnum.BUY) {
            const assetPriceToSell =
              baseAssetPrice + baseAssetPrice * percentIncreaseToSell;
            orderState = await executeOrder(ord, {
              type: AccountOrderSideEnum.SELL,
              baseAssetCountToUse,
              price: assetPriceToSell,
            });
          }
        }
      },
      TimesEnum.MINUTE / 2,
      TimesEnum.WEEK
    );
  })();
}

function handleStringToNum(str: string) {
  return Number(str);
}

type OrderType = {
  type: AccountOrderSideEnum;
  baseAssetCountToUse: number;
  price: number;
};
function executeOrder(
  ord: Order,
  { type, baseAssetCountToUse, price }: OrderType
) {
  // Make order for amount
  return ord.postOrder<AccountOrderResponseEnum.FULL>(
    type,
    OrderTypes.LIMIT,
    AccountOrderTimeInForceEnum.GTC,
    baseAssetCountToUse,
    undefined,
    price
  );
}
// ---------------------------------

// TODO: Test state setter
function _algoState<T>(
  initialValue: T | null
): [T | null, (x: T | null) => T | null] {
  class Alg {
    innerState: T | null;
    constructor() {
      this.innerState = initialValue;
    }
    set val(newVal: T | null) {
      this.innerState = newVal;
    }
    get val() {
      return this.innerState;
    }
    stateSetter = (newValue: T | null) => (this.val = newValue);
  }
  const alg = new Alg();
  return [alg.val, alg.stateSetter];
}
