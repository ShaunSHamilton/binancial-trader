import { handleGet } from "../tools/index.ts";
import Binance from "./Binance.ts";
import {
  MarketAggTradeType,
  MarketAvgPriceType,
  MarketDepthType,
  MarketHistoricalTradeType,
  MarketKline,
  MarketKlineEnum,
  MarketTicker24hrType,
  MarketTickerBookTickerType,
  MarketTickerPriceType,
  MarketTradeType,
} from "../types/MarketData.ts";

class MarketData extends Binance {
  symbol: string;
  constructor(symbol: string) {
    super();
    this.symbol = symbol;
  }

  async getDepth(limit?: number): Promise<MarketDepthType> {
    return await handleGet("/depth", { symbol: this.symbol, limit });
  }

  async getTrades(limit?: number): Promise<MarketTradeType[]> {
    return await handleGet("/trades", { symbol: this.symbol, limit });
  }

  async getHistoricalTrades(
    limit?: number,
    fromId?: number
  ): Promise<MarketHistoricalTradeType[]> {
    return await handleGet("/historicalTrades", {
      symbol: this.symbol,
      limit,
      fromId,
    });
  }

  async getAggTrades(
    fromId?: number,
    startTime?: number,
    endTime?: number,
    limit?: number
  ): Promise<MarketAggTradeType[]> {
    return await handleGet("/aggTrades", {
      symbol: this.symbol,
      fromId,
      startTime,
      endTime,
      limit,
    });
  }

  async getKlines(
    interval: MarketKlineEnum,
    startTime?: number,
    endTime?: number,
    limit?: number
  ): Promise<MarketKline> {
    return await handleGet("/klines", {
      symbol: this.symbol,
      interval,
      startTime,
      endTime,
      limit,
    });
  }

  async getAvgPrice(): Promise<MarketAvgPriceType> {
    return await handleGet("/avgPrice", { symbol: this.symbol });
  }

  async getTicker24hr(
    symbol = this.symbol
  ): Promise<MarketTicker24hrType | MarketTicker24hrType[]> {
    return await handleGet("/ticker/24hr", { symbol });
  }

  async getTickerPrice(
    symbol = this.symbol
  ): Promise<MarketTickerPriceType | MarketTickerPriceType[]> {
    return await handleGet("/ticker/price", { symbol });
  }

  async getTickerBookTicker(
    symbol = this.symbol
  ): Promise<MarketTickerBookTickerType | MarketTickerBookTickerType[]> {
    return await handleGet("/ticker/bookTicker", { symbol });
  }
}

export default MarketData;
