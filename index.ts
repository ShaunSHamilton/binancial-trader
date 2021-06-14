import MarketData from "./components/MarketData.ts";
import Binance from "./components/Binance.ts";
import Account from "./components/Account.ts";

const bin = new Binance();
// const exch = new ExchangeInfo("DOGEGBP");
const mark = new MarketData();
const acc = new Account();

async function main() {
  const inputArgs = Deno.args;
  if (inputArgs.includes("--test")) {
    console.log(await bin.testConnection());
  }
  if (inputArgs.includes("--getInfo")) {
    jLog(await mark.getAvgPrice("DOGEGBP"));
  }
  if (inputArgs.includes("--getMyTrades")) {
    jLog(await acc.getMyTrades("DOGEGBP", ...[, , ,], 3));
  }
}

main();

function jLog(json: Record<symbol, unknown>) {
  console.table(json);
}
