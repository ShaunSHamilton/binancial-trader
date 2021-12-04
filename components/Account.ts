import { handleGet } from "../tools/index.ts";
import { AccountType, AccountTradeType } from "../types/Account.ts";
import { Prom, ErrType } from "../types/index.ts";
import Binance from "./Binance.ts";

class Account extends Binance {
  symbol: string;
  constructor(symbol: string) {
    super();
    this.symbol = symbol;
  }

  async getAccount(recvWindow?: number): Prom<AccountType> {
    if (recvWindow && recvWindow > 60000) {
      const err: ErrType = {
        message: `'recvWindow' must be less than 60000`,
        suggestion: "Ensure to give the correct arguments",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handleGet("/account", { timestamp: true, recvWindow }, true);
  }

  async getMyTrades(
    orderId?: number,
    startTime?: number,
    endTime?: number,
    fromId?: number,
    limit?: number,
    recvWindow?: number
  ): Prom<AccountTradeType[]> {
    if (recvWindow && recvWindow > 60000) {
      const err: ErrType = {
        message: `'recvWindow' must be less than 60000`,
        suggestion: "Ensure to give the correct arguments",
      };
      return new Promise((resolve, _) => resolve(err));
    }
    return await handleGet(
      "/myTrades",
      {
        symbol: this.symbol,
        timestamp: true,
        orderId,
        startTime,
        endTime,
        fromId,
        limit,
        recvWindow,
      },
      true
    );
  }
}

export default Account;
