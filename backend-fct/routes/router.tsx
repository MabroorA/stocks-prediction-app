import {Router ,Request, Response} from "express";
import Historical_Daily_By_Ticker, {
  Losers,
  News_latest,
  Search_ticker,
  Stock_Company_Profile,
  top5,
} from "../src/data-fetching/fetch-stocks-data";

const express = require('express')

const router = Router();


router.get("/", (req: Request, res: Response) => {
    console.log("Server Working");
    res.send("Express + TypeScript Server");
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



// Latest News 
router.get("/news", async (req: Request, res: Response) => {

try {
    console.log("Latest News called");
    const response = await News_latest();
    res.send(response);
} catch (error) {
    console.log(error);
    res.status(500).send("Failed to get News");
}
});

// top 5 increased in price stock
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

// bottom 5 decreased in price stock
router.get("/losers", async (req: Request, res: Response) => {
  try {
    console.log("Biggests market Losers Called");
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
    console.log("Daily-historical Called");
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

// Stock profile
router.get("/financial-summary", async (req: Request, res: Response) => {
  try {
    console.log("financial-summary Called");
    const { ticker } = req.query; // Get the ticker parameter from the request query
    if (!ticker || typeof ticker !== "string") {
        throw new Error("Ticker parameter is missing or invalid");
    }
    const searchResult = await Stock_Company_Profile(ticker as string);
    res.send(searchResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get Stock profile ");
  }
});




export default router;

