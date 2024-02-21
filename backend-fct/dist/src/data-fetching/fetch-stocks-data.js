"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grouped_Daily = exports.Search_to_display_ticker = exports.Search_ticker = exports.Exponential_Moving_Avg = void 0;
async function daily_AvgPrice() {
    const API_KEY = process.env.API_KEY;
    const request = await fetch("https://api.twelvedata.com/avgprice?apikey=0cedfa55583c4f2da1f7985dd27c48b1&interval=1day&symbol=NVDA&country=US&format=JSON");
    const response = await request.json();
    return response;
}
exports.default = daily_AvgPrice;
async function Exponential_Moving_Avg() {
    const API_KEY = process.env.Poly_API_KEY;
    const request = await fetch("https://api.polygon.io/v1/indicators/ema/AAPL?timespan=hour&adjusted=true&window=50&series_type=close&order=desc&limit=5000&apiKey=UyzPkn5wTGhDq7aauKltPyTyNburS6FC");
    const response = await request.json();
    return response;
}
exports.Exponential_Moving_Avg = Exponential_Moving_Avg;
// searching with Company/ticker name
async function Search_ticker(ticker) {
    const API_KEY = process.env.Poly_API_KEY;
    const request = await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&apiKey=${API_KEY}&ticker=${ticker}`);
    const response = await request.json();
    return response;
}
exports.Search_ticker = Search_ticker;
async function Search_to_display_ticker(ticker) {
    try {
        const API_KEY = process.env.Poly_API_KEY;
        const request = await fetch(`https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=7&series_type=close&order=asc&limit=100&apiKey=${API_KEY}`);
        if (!request.ok) {
            throw new Error(`Failed to fetch data for ${ticker}. Status: ${request.status}`);
        }
        const response = await request.json();
        return response;
    }
    catch (error) {
        console.error("Error fetching ticker data:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
exports.Search_to_display_ticker = Search_to_display_ticker;
// Group Daily
async function Grouped_Daily() {
    try {
        const API = process.env.Poly_API_KEY;
        const request = await fetch(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=UyzPkn5wTGhDq7aauKltPyTyNburS6FC`);
        if (!request.ok) {
            throw new Error(`Failed to fetch data , Status: ${request.status}`);
        }
        const response = await request.json();
        return response;
    }
    catch (error) {
        console.error("Error fetching Grouped Daily data:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
exports.Grouped_Daily = Grouped_Daily;
