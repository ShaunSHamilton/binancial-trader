// Algorithm selling when price breaks out of upper bollenger band
// Buying when price breaks out of lower bollenger band

import {
  AccountOrderSideEnum,
  AccountOrderTimeInForceEnum,
  AccountOrderResponseEnum,
} from "../types/Account.ts";
import { assertErrType } from "../types/index.ts";
import { OrderTypes } from "../types/Symbol.ts";
import Order from "../components/Order.ts";
import { cron, TimesEnum } from "../tools/cron.ts";
import { bollenger } from "./index.ts";

async function checkOrderBook(ord: Order, orderId: number) {
  // Check orderBook and return latest order for symbol
  return await ord.getOrder(orderId);
}

// ---------------------------------
/**
 * Initialises Bollenger Trading Algorithm
 * @param {string} symbol - The trading pair symbol to use
 * @param {number} baseAssetCountToUse - The amount of base asset to use
 * @param {number} percentIncreaseToSell - How far above the upper Bollenger band to sell
 * @param {number} percentDecreaseToBuy - How far below the lower Bollenger band to buy
 */
export function initialiseAlgorithm(
  symbol: string,
  baseAssetCountToUse: number,
  percentIncreaseToSell: number,
  percentDecreaseToBuy: number
) {
  (async () => {
    const ord = new Order(symbol);
    let orderState = await executeOrder(ord, {
      type: AccountOrderSideEnum.BUY,
      baseAssetCountToUse,
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
        // Check current price with latest movingAverage
        // If there is asset to sell:
        // // If price is above bollenger.upper, sell
        // If there is money to buy:
        // // if price is below bollenger.lower, buy
        if (status === "FILLED") {
          if (side === AccountOrderSideEnum.SELL) {
          } else if (side === AccountOrderSideEnum.BUY) {
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
function executeOrder(ord: Order, { type, baseAssetCountToUse }: OrderType) {
  // Make order for amount
  return ord.postOrder<AccountOrderResponseEnum.FULL>(
    type,
    OrderTypes.MARKET,
    AccountOrderTimeInForceEnum.GTC,
    baseAssetCountToUse
  );
}
