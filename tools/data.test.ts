import { hasBeenFlagged, assertReturnType } from "./index.ts";
import { arrArrToArrRecord } from "./data.ts";
import { MarketKline } from "../types/MarketData.ts";

if (hasBeenFlagged(["--data"])) {
  Deno.test("DATA :::> arrArrToRecord returns expected return type", () => {
    const actual = arrArrToArrRecord(testData);
    const expected = [
      {
        OpenTime: 1623636000000,
        Open: "1774.45000000",
        High: "1780.00000000",
        Low: "1767.32000000",
        Close: "1771.12000000",
        Volume: "225.75816000",
        CloseTime: 1623639599999,
        QuoteAssetVolume: "400258.83507420",
        NumTrades: 404,
        TakerBuyBaseAssetVolume: "128.43680000",
        TakerBuyQuoteAssetVolume: "227809.08043840",
        Ignore: "0",
      },
    ];
    assertReturnType(actual, expected);
  });
}

const testData: MarketKline = [
  [
    1499040000000, // Open time
    "0.01634790", // Open
    "0.80000000", // High
    "0.01575800", // Low
    "0.01577100", // Close
    "148976.11427815", // Volume
    1499644799999, // Close time
    "2434.19055334", // Quote asset volume
    308, // Number of trades
    "1756.87402397", // Taker buy base asset volume
    "28.46694368", // Taker buy quote asset volume
    "17928899.62484339", // Ignore.
  ],
];
