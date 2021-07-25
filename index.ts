import MarketData from "./components/MarketData.ts";
import Binance from "./components/Binance.ts";
import Account from "./components/Account.ts";

const bin = new Binance();
// const exch = new ExchangeInfo("DOGEGBP");
const mark = new MarketData("DOGEGBP");
const acc = new Account("DOGEGBP");

async function main() {
  const inputArgs = Deno.args;
  if (inputArgs.includes("--test")) {
    console.log(await bin.testConnection());
  }
  if (inputArgs.includes("--getInfo")) {
    jLog(await mark.getAvgPrice());
  }
  if (inputArgs.includes("--getMyTrades")) {
    jLog(await acc.getMyTrades(...[, , ,], 3));
  }
}

main();

function jLog(json: Record<symbol, unknown>) {
  console.table(json);
}

// WANTED USE CASES

// GENERAL ALGORITHM

// Takes a given amount of asset
// While isAssetAvailable, isCanInvest

// Buy at initial amount
// If assetMarketPrice === assetPurchasePrice + x% -> sell
// If assetSalePrice - y% === assetMarketPrice -> buy

// initialiseAlgorithm(assetCount, assetPriceToBuy, percentIncreaseToSell, percentDecreaseToBuy);

// BOLL ALGORITHM

// If assetMarketPrice < BOLL_LOWER, investInAsset
// If assetMarketPrice > BOLL_UPPER, withdrawFromAsset
