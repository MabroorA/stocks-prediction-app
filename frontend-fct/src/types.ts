export type TickerResponse = {
  historical: TickerHistoricalData[];
  symbol: string;
}


export interface TickerHistoricalData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjClose: number;
    volume: number;
    unadjustedVolume: number;
    change: number;
    changePercent: number;
    vwap: number;
    label: string;
    changeOverTime: number;
}
  
export  interface PredictionResponse {
    original_prices: {
      close: number;
      date: string;
    }[];
    predicted_prices: {
      close: number;
      date: string;
    }[];
}
export interface StockSummary {
    symbol: string;
    price: number;
    beta: number;
    volAvg: number;
    mktCap: number;
    lastDiv: number;
    range?: string;
    changes: number;
    companyName: string;
    currency: string;
    cik?: string;
    isin?: string;
    cusip?: string;
    exchange: string;
    exchangeShortName: string;
    industry: string;
    website: string;
    description: string;
    ceo: string;
    sector?: string;
    country?: string;
    fullTimeEmployees?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    dcfDiff?: number;
    dcf?: number;
    image: string;
    ipoDate?: string;
    defaultImage?: boolean;
    isEtf?: boolean;
    isActivelyTrading: boolean;
    isAdr?: boolean;
    isFund?: boolean;
  }
export  interface MockDataPoint {
    date: string;
    high: number;
    low: number;
  }