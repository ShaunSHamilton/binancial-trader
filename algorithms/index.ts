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

export type KlineDataType = {
  OpenTime: number;
  Open: string;
  High: string;
  Low: string;
  Close: string;
  Volume: string;
  CloseTime: number;
  QuoteAssetVolume: string;
  NumTrades: number;
  TakerBuyBaseAssetVolume: string;
  TakerBuyQuoteAssetVolume: string;
  Ignore: string;
};

export function bollenger(
  candleKlines: KlineDataType[],
  timeToUse: keyof KlineDataType = "Close",
  movingAveragePeriod = 20
) {
  const arr = candleKlines
    .slice(-movingAveragePeriod)
    ?.map((kline) => s2n(kline[timeToUse]));
  const mid = arr.reduce((acc, curr) => acc + curr, 0) / movingAveragePeriod;
  const sigma =
    (arr.reduce((acc, curr) => (acc + curr) ^ 2, 0) / movingAveragePeriod) ^
    (1 / 2);
  const upper = mid + sigma * 2;
  const lower = mid - sigma * 2;
  return { mid, upper, lower };
}

export function s2n(str: string | number) {
  return Number(str);
}

export function avg(...x: number[]) {
  const t = x.length;
  return x.reduce((a, c) => a + c, 0) / t;
}

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
