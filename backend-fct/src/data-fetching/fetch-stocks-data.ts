export async function fetchStocksData() {
  const API_KEY = process.env.API_KEY;
  const request = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"
  );
  const response = await request.json();
  return response;
}
