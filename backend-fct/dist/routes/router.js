"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_stocks_data_1 = require("../src/data-fetching/fetch-stocks-data");
const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    console.log("Server Working");
    res.send("Express + TypeScript Server");
});
router.get("/fetch-data", async (req, res) => {
    console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
    try {
        console.log("Calling external API (alpha vantage) ");
        const response = await daily_fetchStocksData();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get data");
    }
});
// Daily api call from alphavantage
router.get("/daily-view", async (req, res) => {
    console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
    try {
        console.log("12DATA API called  ");
        const response = await daily_fetchStocksData();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get data");
    }
});
// Exponential_Moving_Avg api call from polygen
router.get("/exponential-moving-avg", async (req, res) => {
    try {
        console.log("Ploygen API called  ");
        const response = await (0, fetch_stocks_data_1.Exponential_Moving_Avg)();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get data");
    }
});
// Searching a ticker
// Route to handle ticker search
router.get("/search-ticker", async (req, res) => {
    try {
        const { ticker } = req.query; // Get the ticker parameter from the request query
        if (!ticker || typeof ticker !== "string") {
            throw new Error("Ticker parameter is missing or invalid");
        }
        const searchResult = await (0, fetch_stocks_data_1.Search_ticker)(ticker); // Call the Search_ticker function
        res.send(searchResult);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to search ticker");
    }
});
// Searching to display 
// Searching to display
router.get("/ticker-to-display", async (req, res) => {
    try {
        const { ticker } = req.query; // Get the ticker parameter from the request query
        if (!ticker || typeof ticker !== "string") {
            throw new Error("Ticker parameter is missing or invalid");
        }
        const searchResult = await (0, fetch_stocks_data_1.Search_to_display_ticker)(ticker); // Call the Search_ticker function
        res.send(searchResult);
    }
    catch (error) {
        console.error("Error searching ticker:", error);
        res.status(500).send("Failed to search ticker");
    }
});
// Grouped Daily
router.get("/grouped-daily", async (req, res) => {
    console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
    try {
        console.log("Calling Grouped Daily");
        const response = await (0, fetch_stocks_data_1.Grouped_Daily)();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get data");
    }
});
module.exports = router;
function daily_fetchStocksData() {
    throw new Error("Function not implemented.");
}
