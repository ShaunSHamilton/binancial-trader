import { config, hmac, AssertionError } from "../deps.ts";
import { ErrType } from "../types/index.ts";
const BASE_URL = "https://api.binance.com/api/v3";
const { SECRET_KEY, API_KEY } = config();

async function handleGet(
  endpoint: string,
  queryParams?: Record<string, unknown>,
  isSigned = false
) {
  if (queryParams?.timestamp) {
    queryParams.timestamp = time();
  }
  const query = createQuery(queryParams);
  let endQuery = BASE_URL + endpoint + query;
  if (isSigned) {
    endQuery += `&signature=${createSignature(query.slice(1))}`;
  }
  return await handleResponse(
    await connectionWrapper("GET", endQuery, isSigned)
  ).json();
}

async function handlePost(
  endpoint: string,
  body: Record<string, unknown>,
  isSigned = false,
  additionalConfig?: Record<string, unknown>
) {
  const endQuery = BASE_URL + endpoint;
  return await handleResponse(
    await connectionWrapper("POST", endQuery, isSigned, body, additionalConfig)
  ).json();
}

async function handleDelete(
  endpoint: string,
  body: Record<string, unknown>,
  isSigned = false,
  additionalConfig?: Record<string, unknown>
) {
  const endQuery = BASE_URL + endpoint;
  return await handleResponse(
    await connectionWrapper(
      "DELETE",
      endQuery,
      isSigned,
      body,
      additionalConfig
    )
  ).json();
}

async function handlePut(
  endpoint: string,
  body: Record<string, unknown>,
  isSigned = false,
  additionalConfig?: Record<string, unknown>
) {
  const endQuery = BASE_URL + endpoint;
  return await handleResponse(
    await connectionWrapper("PUT", endQuery, isSigned, body, additionalConfig)
  ).json();
}

function handleResponse(response: Response): Response {
  if (response.status === 429) {
    throw new Error(
      `Interrupt: 429 - Request rate limit broken. Wait ${response.headers?.get(
        "Retry-After"
      )}s`
    );
  }
  if (response.status === 418) {
    throw new Error(
      `Interrupt: 418 - IP address auto-banned. Wait ${response.headers?.get(
        "Rety-After"
      )}s`
    );
  }
  return response;
}

async function connectionWrapper(
  method: string,
  endQuery: string,
  isSigned: boolean,
  body?: Record<string, unknown>,
  additionalConfig?: Record<string, unknown>
) {
  if (body?.timestamp) {
    body.timestamp = time();
  }
  if (isSigned && method !== "GET" && body) {
    body.signature = createSignature(createQuery(body));
  }
  logger(`Attempting ${method} request`, endQuery, "tools/index.ts");
  let c = 0;
  const int = setInterval(() => {
    c++;
    if (c >= 2) {
      throw new Error(`Request Timeout!\nRequest URL: ${endQuery}`);
    }
  }, 9000);
  const options = body
    ? { body: JSON.stringify(body), ...additionalConfig }
    : {};
  // const res = await fetch("");
  const res = await fetch(endQuery, {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-MBX-APIKEY": `${API_KEY}`,
    },
    ...options,
  });
  clearInterval(int);
  return res;
}

function createQuery(queryParams: Record<string, unknown> | undefined) {
  if (Object.entries(queryParams || {}).length <= 0) return "";
  const query = Object.entries(queryParams || {})
    ?.map(([param, val], i) => {
      if (val) {
        return `${i === 0 ? "?" : "&"}${param}=${val}`;
      }
    })
    ?.join("");
  return query;
}

function createSignature(bodyString: string) {
  console.log(bodyString);
  if (!SECRET_KEY) throw new Error("No secret key given for signature!");
  return hmac("sha256", SECRET_KEY, bodyString, "utf8", "hex");
}

function logger(message: string, url: string, file = "") {
  console.log(`${message} : ${file} :: ${url}`);
}

function time() {
  return new Date().getTime();
}

function error(
  and?: string[],
  or?: string[],
  message?: string,
  suggestion?: string
): Promise<ErrType> {
  let sugg = "";
  if (and?.length) {
    for (const a of and) {
      sugg += `'${a}', `;
    }
    sugg += "required";
  }
  if (or?.length) {
    for (const o of or) {
      sugg += `'${o}' or `;
    }
    sugg += "required";
  }
  const err: ErrType = {
    message: message || `Incorrect arguments given`,
    suggestion: sugg || suggestion || "Ensure to give the correct arguments",
  };
  return new Promise((resolve, _) => resolve(err));
}

// HTTP Return Code
/*
- 403: Web Application Firewall Limit has been violated
- 429: Breaking a request rate limit
- 418: IP address has been auto-banned for excessive 429
- 5XX: Issue on Binance. NOT necessarily a failed request.
- Error Codes: https://github.com/binance/binance-spot-api-docs/blob/master/errors.md
*/

function hasBeenFlagged(flags: string[]): boolean {
  return flags.some((flag) => Deno.args.includes(flag));
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

export {
  handleGet,
  handlePost,
  handleDelete,
  handlePut,
  createSignature,
  logger,
  time,
  error,
  hasBeenFlagged,
  assertReturnType,
};
