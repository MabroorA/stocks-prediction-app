import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import daily_fetchStocksData, {
  Exponential_Moving_Avg,
} from "./data-fetching/fetch-stocks-data";

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
  console.log("Server Working");
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
    console.log("12DATA API called  ");
    const response = await daily_fetchStocksData();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data");
  }
});

// Exponential_Moving_Avg api call from polygen
app.get("/exponential-moving-avg", async (req: Request, res: Response) => {
  try {
    console.log("Ploygen API called  ");
    const response = await Exponential_Moving_Avg();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});