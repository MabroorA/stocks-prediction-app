export default async function daily_AvgPrice() {
  const API_KEY = process.env.API_KEY;
  const request = await fetch(
    "https://api.twelvedata.com/avgprice?apikey=0cedfa55583c4f2da1f7985dd27c48b1&interval=1day&symbol=NVDA&country=US&format=JSON"
  );
  const response = await request.json();
  return response;
}

export async function Exponential_Moving_Avg() {
  const API_KEY = process.env.Poly_API_KEY;
  const request = await fetch(
    "https://api.polygon.io/v1/indicators/ema/AAPL?timespan=hour&adjusted=true&window=50&series_type=close&order=desc&limit=5000&apiKey=UyzPkn5wTGhDq7aauKltPyTyNburS6FC"
  );
  const response = await request.json();
  return response;
}
// searching with Company/ticker name
export async function Search_ticker(ticker: string) {
  const API_KEY = process.env.Poly_API_KEY;
  const request = await fetch(
    `https://api.polygon.io/v3/reference/tickers?active=true&apiKey=${API_KEY}&ticker=${ticker}`
  );
  const response = await request.json();
  return response;
}
