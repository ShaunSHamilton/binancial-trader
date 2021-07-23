import { assert } from "https://deno.land/std@0.102.0/testing/asserts.ts";
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
    assert(c === 1, `expected ${c} to be ${1}`);
  });
}
