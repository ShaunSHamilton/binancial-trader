import { assertObjectMatch, AssertionError } from "./deps.ts";
// import ExchangeInfoType from "./types/ExchangeInfo.ts";
import { AccountOrderSideEnum } from "./types/Account.ts";
import { OrderTypes } from "./types/Symbol.ts";
import { getExchangeInfo } from "./fixtures/exchange.ts";
import { getAccount, getMyTrades } from "./fixtures/account.ts";
import { getAllOpenOrders } from "./fixtures/order.ts";
import Order from "./components/Order.ts";
import ExchangeInfo from "./components/ExchangeInfo.ts";
import Account from "./components/Account.ts";
import { hasBeenFlagged } from "./tools/index.ts";

// Init objects
const symbol = "DOGEGBP";
const ord = new Order(symbol);
const acc = new Account(symbol);
const exch = new ExchangeInfo(symbol);

if (hasBeenFlagged(["--all", "--exch"])) {
  Deno.test("ExchangeInfo :::> getCurrentPrice", async () => {
    assertReturnType(await exch.getCurrentPrice(), getExchangeInfo);
  });
}
if (hasBeenFlagged(["--all", "--acc"])) {
  Deno.test("Account :::> getAccount", async () => {
    assertReturnType(await acc.getAccount(), getAccount);
  });

  Deno.test("Account :::> getMyTrades", async () => {
    assertReturnType(await acc.getMyTrades(), getMyTrades);
  });
}
if (hasBeenFlagged(["--all", "--ord"])) {
  Deno.test(
    "Order :::> postTestOrder of type LIMIT without timeInForce",
    async () => {
      const res = {
        message: "Incorrect arguments given",
        suggestion: "'timeInForce', 'quantity', 'price', required",
      };
      assertObjectMatch(
        await ord.postTestOrder(
          AccountOrderSideEnum.BUY,
          OrderTypes.LIMIT,
          ...[],
          10,
          ...[],
          1
        ),
        res
      );
    }
  );
  Deno.test(
    "Order :::> postTestOrder of type MARKET without quoteOrderQty",
    async () => {
      const res = {
        message: "Incorrect arguments given",
        suggestion: "'quantity', 'quoteOrderQty', required",
      };
      assertObjectMatch(
        await ord.postTestOrder(
          AccountOrderSideEnum.BUY,
          OrderTypes.MARKET,
          ...[],
          10
        ),
        res
      );
    }
  );
  Deno.test("Order :::> getAllOpenOrders without recvWindow", async () => {
    assertReturnType(await ord.getAllOpenOrders(), getAllOpenOrders);
  });
}

function assertReturnType(actual: unknown, expected: unknown): void {
  if (typeof actual !== typeof expected) {
    console.table(actual);
    console.table(expected);
    throw new AssertionError(`expected ${actual} to be of type ${expected}`);
  }
  // TODO: test for arrays?
  if (typeof actual === "object" && typeof expected === "object") {
    for (const prop in actual) {
      // @ts-expect-error If prop does not exist on params, assertion should throw
      if (typeof expected?.[prop] !== typeof actual[prop]) {
        /* @ts-expect-error */
        console.table(actual[prop]);
        /* @ts-expect-error */
        console.table(expected?.[prop]);
        throw new AssertionError(
          /* @ts-expect-error */
          `expected ${prop}: ${typeof actual[
            prop
            /* @ts-expect-error */
          ]} to be of type ${typeof expected?.[prop]}`
        );
      }
      /* @ts-expect-error */
      assertReturnType(actual[prop], expected?.[prop]);
    }
  }
}
