"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock_Company_Profile = exports.Losers = exports.top5 = exports.News_latest = exports.Search_ticker = void 0;
const apikey = "wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1";
// searching with Company/ticker name
async function Search_ticker(ticker) {
    const API_KEY = "UyzPkn5wTGhDq7aauKltPyTyNburS6FC";
    const request = await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&apiKey=${API_KEY}&ticker=${ticker}`);
    const response = await request.json();
    return response;
}
exports.Search_ticker = Search_ticker;
// Latest News 
async function News_latest() {
    try {
        const API = process.env.Poly_API_KEY;
        const request = await fetch(`https://api.polygon.io/v2/reference/news?limit=10&apiKey=UyzPkn5wTGhDq7aauKltPyTyNburS6FC`);
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
exports.News_latest = News_latest;
// Top-5 
async function top5() {
    try {
        const request = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${apikey}`);
        const response = await request.json();
        return response;
    }
    catch (error) {
        console.error("Error fetching Top 5 stocks data:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
exports.top5 = top5;
// Bottom-5 
async function Losers() {
    try {
        const request = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${apikey}`);
        const response = await request.json();
        return response;
    }
    catch (error) {
        console.error("Error fetching biggest Losers data:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
exports.Losers = Losers;
// Full historical daily data for last 5 years
async function Historical_Daily_By_Ticker(ticker) {
    try {
        const request = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${apikey}`);
        if (!request.ok) {
            throw new Error(`Failed to fetch data for ${ticker} Qoute From FMP, Status: ${request.status}`);
        }
        const response = await request.json();
        return response;
    }
    catch (error) {
        console.error("Error fetching Grouped Daily data:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
exports.default = Historical_Daily_By_Ticker;
// Stock Company Profile
async function Stock_Company_Profile(ticker) {
    try {
        const request = await fetch(`https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${apikey}`);
        if (!request.ok) {
            throw new Error(`Failed to fetch ${ticker} Profile FMP, Status: ${request.status}`);
        }
        const response = await request.json();
        return response;
    }
    catch (error) {
        console.error("Error fetching Stock Profile:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
exports.Stock_Company_Profile = Stock_Company_Profile;
