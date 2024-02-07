import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { fetchStocksData } from "./data-fetching/fetch-stocks-data";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  console.log("WE JUST GOT A REQUEST AT THIS ENDPOINT");
  res.send("Express + TypeScript Server");
});

app.get("/fetch-data", async (req: Request, res: Response) => {
  console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
  try {
    console.log("making a call to the external API");
    const response = await fetchStocksData();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
