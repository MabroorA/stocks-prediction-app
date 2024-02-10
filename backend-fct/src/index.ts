import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { daily_fetchStocksData } from "./data-fetching/fetch-stocks-data";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;
const cors = require("cors");

// cors access
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.get("/", (req: Request, res: Response) => {
  console.log("WE JUST GOT A REQUEST AT THIS ENDPOINT");
  res.send("Express + TypeScript Server");
});

app.get("/fetch-data", async (req: Request, res: Response) => {
  console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
  try {
    console.log("Calling external API (alpha vantage) ");
    const response = await daily_fetchStocksData();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data");
  }
});

// Daily api call from alphavantage
app.get("/daily-view", async (req: Request, res: Response) => {
  console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
  try {
    console.log("Calling external API (alpha vantage) ");
    const response = await daily_fetchStocksData();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data");
  }
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
