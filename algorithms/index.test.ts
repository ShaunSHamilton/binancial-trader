// Testing algorithm on test data in ./data

import { TimesEnum } from "../tools/cron.ts";

type KlineDataType = {
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
// Find time to start from data
function timeToStart(data: KlineDataType[]) {
  return data[0].OpenTime;
}

async function getData() {
  try {
    const res = await Deno.readTextFile("./data/eth-gbp-002.json");
    return JSON.parse(res);
  } catch (e) {
    console.error(e);
    throw new Error("Error reading data. See logs for more info.");
  }
}

// TODO: writeOrders does not print what is expected
async function _writeOrders(orderState: OrderStateType[]) {
  try {
    await Deno.writeTextFile(
      "./data/eth-gbp-orders.json",
      JSON.stringify(orderState)
    );
    console.log("Written");
  } catch (e) {
    console.error(e.message);
  }
}

function s2n(str: string) {
  return Number(str);
}

function avg(...x: number[]) {
  const t = x.length;
  return x.reduce((a, c) => a + c, 0) / t;
}

const MOCK_INTERVAL = TimesEnum.MINUTE;
// const MOCK_STEPSIZE = TimesEnum.MINUTE;
const MOCK_TIMETOGO = TimesEnum.WEEK * 50;
const percentDecreaseToBuy = 0.05;
const percentIncreaseToSell = 0.05;

type OrderStateType = {
  side: "BUY" | "SELL";
  status: "NEW" | "FILLED" | "CANCELLED";
  price: number;
  timeFilled: number;
  baseAssetCount: number;
  tradeAssetCount: number;
};
const allOrderState: OrderStateType[] = [];
async function main() {
  const allData = await getData();
  const orderState: OrderStateType = {
    side: "BUY",
    status: "NEW",
    price: 1350,
    timeFilled: 1626035400000,
    baseAssetCount: 0,
    tradeAssetCount: 500,
  };
  const startOffset = timeToStart(allData);
  for (const data of allData) {
    const { Low, High, OpenTime, CloseTime } = data;
    if (OpenTime > MOCK_TIMETOGO + startOffset) break;
    const low = s2n(Low);
    const high = s2n(High);
    const avgTime = avg(OpenTime, CloseTime);
    if (
      orderState.status === "NEW" &&
      orderState.price > low &&
      orderState.price < high
    ) {
      orderState.status = "FILLED";
      orderState.timeFilled = avgTime;
      if (orderState.side === "BUY") {
        const tac = orderState.tradeAssetCount;
        orderState.baseAssetCount = tac / orderState.price;
        orderState.tradeAssetCount = 0;
      } else if (orderState.side === "SELL") {
        orderState.tradeAssetCount =
          orderState.baseAssetCount * orderState.price;
        orderState.baseAssetCount = 0;
      }
      console.log(orderState);
      // TODO: Deno .push appears asynchronous/batched??
      allOrderState.push(orderState);
    }

    if (orderState.timeFilled + MOCK_INTERVAL > avgTime) {
      continue;
    }
    if (orderState.status === "FILLED") {
      if (orderState.side === "SELL") {
        orderState.status = "NEW";
        orderState.side = "BUY";
        orderState.price =
          orderState.price - orderState.price * percentDecreaseToBuy;
      } else if (orderState.side === "BUY") {
        orderState.status = "NEW";
        orderState.side = "SELL";
        orderState.price =
          orderState.price + orderState.price * percentIncreaseToSell;
      }
    }
  }
  // await writeOrders(allOrderState);
}

main();
