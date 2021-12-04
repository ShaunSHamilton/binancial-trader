// Testing algorithm on test data in ./data
import { KlineDataType, s2n, avg } from "./index.ts";
import { TimesEnum } from "../tools/cron.ts";

// Find time to start from data
function timeToStart(data: KlineDataType[]) {
  return data[0].OpenTime;
}

async function getData() {
  try {
    const res = await Deno.readTextFile("./data/gbp-usdt-001.json");
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

const MOCK_INTERVAL = TimesEnum.HOUR;
// const MOCK_STEPSIZE = TimesEnum.MINUTE;
const MOCK_TIMETOGO = TimesEnum.WEEK * 50;
const percentDecreaseToBuy = 0.01;
const percentIncreaseToSell = 0.01;

type VariableState = {
  percentDecreaseToBuy: number;
  percentIncreaseToSell: number;
  mockTimeToGo: number;
  mockInterval: number;
  price: number;
};

type OrderStateType = {
  side: "BUY" | "SELL";
  status: "NEW" | "FILLED" | "CANCELLED";
  price: number;
  timeFilled: number;
  baseAssetCount: number;
  tradeAssetCount: number;
};
export async function main({
  percentDecreaseToBuy,
  percentIncreaseToSell,
  mockTimeToGo,
  mockInterval,
  price,
}: VariableState) {
  // const allOrderState: OrderStateType[] = [];
  const allOrderState: OrderStateType[] = [];
  const allData = await getData();
  const orderState: OrderStateType = {
    side: "SELL",
    status: "NEW",
    price,
    timeFilled: 1607968800000,
    baseAssetCount: 100,
    tradeAssetCount: 0,
  };
  const startOffset = timeToStart(allData);
  for (const data of allData) {
    const { Low, High, OpenTime, CloseTime } = data;
    if (OpenTime > mockTimeToGo + startOffset) break;
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
      // TODO: Find common way to push non-referenced value
      allOrderState.push(
        Object.entries(orderState).reduce(
          (acc, curr) => ({ ...acc, [curr[0]]: curr[1] }),
          [] as unknown as OrderStateType
        )
      );
    }

    if (orderState.timeFilled + mockInterval > avgTime) {
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
  return allOrderState;
  // await writeOrders(allOrderState);
}

(async () => {
  const bestProfitState = {
    tradeAssetCount: 0,
    price: 1.3286,
    percentDecreaseToBuy: 0.04,
    percentIncreaseToSell: 0.11,
    mockInterval: 0,
    mockTimeToGo: 0,
  };
  const inititalConditions = {
    percentDecreaseToBuy: percentDecreaseToBuy,
    percentIncreaseToSell: percentIncreaseToSell,
    mockInterval: MOCK_INTERVAL,
    mockTimeToGo: MOCK_TIMETOGO,
    price: 1.385,
  };
  for (let i = inititalConditions.percentDecreaseToBuy; i <= 0.2; i += 0.005) {
    for (
      let j = inititalConditions.percentIncreaseToSell;
      j <= 0.2;
      j += 0.005
    ) {
      for (let price = inititalConditions.price; price <= 1.5; price += 0.05) {
        // ------------------------------------------------------------------------------
        const orderStates = await main({
          ...inititalConditions,
          percentDecreaseToBuy: i,
          percentIncreaseToSell: j,
          price,
        });
        // -------------------------------------------------------------------------------
        const tradeAssetCount =
          orderStates[orderStates.length - 1].tradeAssetCount;
        if (tradeAssetCount > bestProfitState.tradeAssetCount) {
          bestProfitState.tradeAssetCount = tradeAssetCount;
          bestProfitState.price = price;
          bestProfitState.percentDecreaseToBuy = i;
          bestProfitState.percentIncreaseToSell = j;
          console.log(bestProfitState);
        }
      }
    }
  }
  console.log(bestProfitState);
})();
