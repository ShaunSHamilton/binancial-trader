import MarketData from "../components/MarketData.ts";
import {
  MarketKlineEnum,
  MarketKlinesEnum,
  MarketKline,
} from "../types/MarketData.ts";

export async function getKlineData(
  symbol = "ETHGBP",
  interval: MarketKlineEnum
) {
  const m = new MarketData(symbol);
  const klineData = await m.getKlines(interval, undefined, undefined, 1000);
  createJsonFile(klineData);
}

async function createJsonFile(klineData: MarketKline) {
  const klineArr = arrArrToArrRecord(klineData);
  try {
    await Deno.writeTextFile("./data/eth-gbp.json", JSON.stringify(klineArr));
    console.log("Written");
  } catch (e) {
    console.error(e.message);
  }
}

export function arrArrToArrRecord(klineData: MarketKline) {
  const klineArr = [];
  for (const kline of klineData) {
    klineArr.push(
      kline.reduce(
        (acc, curr, i) => ({ ...acc, [MarketKlinesEnum[i]]: curr }),
        {}
      )
    );
  }
  return klineArr;
}
