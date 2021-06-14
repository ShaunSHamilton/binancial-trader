import { handleGet } from "../tools/index.ts";

type ServerTimeType = {
  serverTime: number;
};

class Binance {
  constructor() {}
  async testConnection() {
    return await handleGet("/ping");
  }
  async getServerTime(): Promise<ServerTimeType> {
    return await handleGet("/time");
  }
}

export default Binance;
