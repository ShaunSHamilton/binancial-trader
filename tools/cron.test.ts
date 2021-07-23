import { assert, assertThrowsAsync } from "../deps.ts";
import { checkCron, cron } from "./cron.ts";
import { hasBeenFlagged } from "./index.ts";

if (hasBeenFlagged(["--cron"])) {
  Deno.test("CRON :::> checkCron returns true", () => {
    const startTime = Date.now();
    const result = checkCron(startTime, 0);

    assert(result, `expected ${result} to be ${true}`);
  });

  Deno.test("CRON :::> cron runs for 0.8 seconds", async () => {
    let c = 0;
    const mockCB = () => {
      c++;
    };
    cron(600, mockCB, 200, 800);
    async function wait() {
      return await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
    await wait();
    assert(c === 2, `expected ${c} to be ${2}`);
  });

  Deno.test("CRON :::> throws if interval is less than stepSize", async () => {
    const mockCB = () => {};
    async function wait() {
      return await new Promise((res) => {
        cron(100, mockCB, 120, 120);
        res("Throw");
      });
    }
    await assertThrowsAsync(wait);
  });

  Deno.test("CRON :::> cron should run CB on initialisation", async () => {
    let c = 0;
    const mockCB = () => {
      c++;
    };
    cron(120, mockCB, 20, 50);
    async function wait() {
      return await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    }
    await wait();
    assert(c === 1, `expected ${c} to be ${1}`);
  });
}
