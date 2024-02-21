import {Router ,Request, Response} from "express";
import { Exponential_Moving_Avg, Grouped_Daily, Search_ticker, Search_to_display_ticker } from "../src/data-fetching/fetch-stocks-data";
const express = require('express')

const router = Router();


router.get("/", (req: Request, res: Response) => {
    console.log("Server Working");
    res.send("Express + TypeScript Server");
  });
  
// router.get("/fetch-data", async (req: Request, res: Response) => {
// console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
// try {
//     console.log("Calling external API (alpha vantage) ");
//     const response = await daily_fetchStocksData();
//     res.send(response);
// } catch (error) {
//     console.log(error);
//     res.status(500).send("Failed to get data");
// }
// });
  
// Daily api call from alphavantage
router.get("/daily-view", async (req: Request, res: Response) => {
console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
try {
    console.log("12DATA API called  ");
    const response = await Exponential_Moving_Avg();
    res.send(response);
} catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data");
}
});

// Exponential_Moving_Avg api call from polygen
router.get("/exponential-moving-avg", async (req: Request, res: Response) => {
try {
    console.log("Ploygen API called  ");
    const response = await Exponential_Moving_Avg();
    res.send(response);
} catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data");
}
});
// Searching a ticker
// Route to handle ticker search
router.get("/search-ticker", async (req: Request, res: Response) => {
try {
    const { ticker } = req.query; // Get the ticker parameter from the request query
    if (!ticker || typeof ticker !== "string") {
    throw new Error("Ticker parameter is missing or invalid");
    }
    const searchResult = await Search_ticker(ticker); // Call the Search_ticker function
    res.send(searchResult);
} catch (error) {
    console.log(error);
    res.status(500).send("Failed to search ticker");
}
});

// Searching to display 
// Searching to display
router.get("/ticker-to-display", async (req: Request, res: Response) => {
try {
    const { ticker } = req.query; // Get the ticker parameter from the request query
    if (!ticker || typeof ticker !== "string") {
        throw new Error("Ticker parameter is missing or invalid");
    }
    const searchResult = await Search_to_display_ticker(ticker as string); // Call the Search_ticker function
    res.send(searchResult);
} catch (error) {
    console.error("Error searching ticker:", error);
    res.status(500).send("Failed to search ticker");
}
});
// Grouped Daily
router.get("/grouped-daily", async (req: Request, res: Response) => {
console.log("Getting grouped daily");
try {
    console.log("Calling Grouped Daily");
    const response = await Grouped_Daily();
    res.send(response);
} catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data");
}
});


export default router;

