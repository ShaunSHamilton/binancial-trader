import {
  // assertObjectMatch,
  AssertionError,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
// import ExchangeInfoType from "./types/ExchangeInfo.ts";
// import { AccountOrderSideEnum } from "./types/Account.ts";
// import { OrderTypes } from "./types/Symbol.ts";
import { getExchangeInfo } from "./fixtures/exchange.ts";
// import Order from "./components/Order.ts";
import ExchangeInfo from "./components/ExchangeInfo.ts";

// Init objects
const symbol = "DOGEGBP";
// const ord = new Order(symbol);
const exch = new ExchangeInfo(symbol);

Deno.test("ExchangeInfo :::> getCurrentPrice", async () => {
  assertReturnType(await exch.getCurrentPrice(), getExchangeInfo);
});

// Deno.test(
//   "Order :::> postTestOrder of type LIMIT without timeInForce",
//   async () => {
//     const res = {
//       message: "Incorrect arguments given",
//       suggestion: "'timeInForce', 'quantity', 'price', required",
//     };
//     assertObjectMatch(
//       await ord.postTestOrder(
//         AccountOrderSideEnum.BUY,
//         OrderTypes.LIMIT,
//         ...[],
//         10,
//         ...[],
//         1
//       ),
//       res
//     );
//   }
// );
// Deno.test(
//   "Order :::> postTestOrder of type MARKET without quoteOrderQty",
//   async () => {
//     const res = {
//       message: "Incorrect arguments given",
//       suggestion: "'quantity', 'quoteOrderQty', required",
//     };
//     assertObjectMatch(
//       await ord.postTestOrder(
//         AccountOrderSideEnum.BUY,
//         OrderTypes.MARKET,
//         ...[],
//         10
//       ),
//       res
//     );
//   }
// );

function assertReturnType(actual: unknown, expected: unknown): void {
  if (typeof actual !== typeof expected) {
    console.table(actual);
    console.table(expected);
    throw new AssertionError(`expected ${actual} to be of type ${expected}`);
  }
  if (typeof actual === "object" && typeof expected === "object") {
    for (const prop in actual) {
      if (typeof expected?.[prop] !== typeof actual[prop]) {
        console.table(actual[prop]);
        console.table(expected?.[prop]);
        throw new AssertionError(
          `expected ${prop}: ${typeof actual[
            prop
          ]} to be of type ${typeof expected?.[prop]}`
        );
      }
      assertReturnType(actual[prop], expected?.[prop]);
    }
  }
}
