import ExchangeInfoType from "../types/ExchangeInfo.ts";
import { handleGet } from "../tools/index.ts";

class ExchangeInfo {
  EXCHANGE_INFO_URL: string;
  constructor(symbol: string) {
    this.EXCHANGE_INFO_URL = `/exchangeInfo?symbol=${symbol}`;
  }

  async getCurrentPrice(): Promise<ExchangeInfoType> {
    return await handleGet(this.EXCHANGE_INFO_URL);
  }
}

export default ExchangeInfo;
