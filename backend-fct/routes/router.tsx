import {Router ,Request, Response} from "express";
import {
  Exponential_Moving_Avg,
  Grouped_Daily,
  Historical_Daily_By_Ticker,
  IntraDay,
  IntraDay_Given_Stock_and_Timeframe,
  Losers,
  News_latest,
  Search_ticker,
  Search_to_display_ticker,
  Single_Stock_Qoute,
  top5,
} from "../src/data-fetching/fetch-stocks-data";

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

// Latest News 
router.get("/news", async (req: Request, res: Response) => {
console.log("Getting Latest News");
try {
    console.log("Calling Latest News");
    const response = await News_latest();
    res.send(response);
} catch (error) {
    console.log(error);
    res.status(500).send("Failed to get News");
}
});


router.get("/top5", async (req: Request, res: Response) => {
  try {
    console.log("Calling Top 5");
    const response = await top5();
    res.send(response);
} catch (error) {
    console.log(error);
    res.status(500).send("Failed to get Top 5");
}
});
router.get("/losers", async (req: Request, res: Response) => {
  try {
    console.log("Calling Biggests Losers ");
    const response = await Losers();
    res.send(response);
} catch (error) {
    console.log(error);
    res.status(500).send("Failed to get Losers");
}
});

// daily historical data throughout the day
router.get("/daily-historical", async (req: Request, res: Response) => {
  try {
    const { ticker } = req.query; // Get the ticker parameter from the request query
    if (!ticker || typeof ticker !== "string") {
        throw new Error("Ticker parameter is missing or invalid");
    }
    const searchResult = await Historical_Daily_By_Ticker(ticker as string);
    res.send(searchResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get daily historical");
  }
});





// Not implemented Yet
router.get("/qoute", async (req: Request, res: Response) => {
  try {
    const { ticker } = req.query; // Get the ticker parameter from the request query
    if (!ticker || typeof ticker !== "string") {
      throw new Error("Ticker parameter is missing or invalid");
    }
    const searchResult = await Single_Stock_Qoute(ticker as string); // Call the Search_ticker function
    res.send(searchResult);
  } catch (error) {
    console.error("Error searching ticker:", error);
    res.status(500).send("Failed to search ticker for Qoute");
  }
});

// Not implemented Yet
// interval data throughout the day
router.get("/intraday", async (req: Request, res: Response) => {
  try {
    const { ticker } = req.query; // Get the ticker parameter from the request query
    if (!ticker || typeof ticker !== "string") {
        throw new Error("Ticker parameter is missing or invalid");
    }
    const searchResult = await IntraDay_Given_Stock_and_Timeframe(ticker as string);
    res.send(searchResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get IntraData");
  }
});

export default router;

