"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fetch_stocks_data_1 = __importStar(require("../src/data-fetching/fetch-stocks-data"));
const express = require('express');
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    console.log("Server Working");
    res.send("Express + TypeScript Server");
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
// Latest News 
router.get("/news", async (req, res) => {
    try {
        console.log("Latest News called");
        const response = await (0, fetch_stocks_data_1.News_latest)();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get News");
    }
});
// top 5 increased in price stock
router.get("/top5", async (req, res) => {
    try {
        console.log("Calling Top 5");
        const response = await (0, fetch_stocks_data_1.top5)();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get Top 5");
    }
});
// bottom 5 decreased in price stock
router.get("/losers", async (req, res) => {
    try {
        console.log("Biggests market Losers Called");
        const response = await (0, fetch_stocks_data_1.Losers)();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get Losers");
    }
});
// daily historical data throughout the day
router.get("/daily-historical", async (req, res) => {
    try {
        console.log("Daily-historical Called");
        const { ticker } = req.query; // Get the ticker parameter from the request query
        if (!ticker || typeof ticker !== "string") {
            throw new Error("Ticker parameter is missing or invalid");
        }
        const searchResult = await (0, fetch_stocks_data_1.default)(ticker);
        res.send(searchResult);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get daily historical");
    }
});
// Stock profile
router.get("/financial-summary", async (req, res) => {
    try {
        console.log("financial-summary Called");
        const { ticker } = req.query; // Get the ticker parameter from the request query
        if (!ticker || typeof ticker !== "string") {
            throw new Error("Ticker parameter is missing or invalid");
        }
        const searchResult = await (0, fetch_stocks_data_1.Stock_Company_Profile)(ticker);
        res.send(searchResult);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get Stock profile ");
    }
});
exports.default = router;
