const apikey = "updJZ6J5tMLEtqk4DCy86VTUoLaxg3xF"
// searching with Company/ticker name
export async function Search_ticker(ticker: string) {
  const API_KEY = "UyzPkn5wTGhDq7aauKltPyTyNburS6FC";
  const request = await fetch(
    `https://api.polygon.io/v3/reference/tickers?active=true&apiKey=${API_KEY}&ticker=${ticker}`
  );
  const response = await request.json();
  return response;
}


// Latest News 
export async function News_latest() {
  try {
    const API = process.env.Poly_API_KEY;
    const request = await fetch(
      `https://api.polygon.io/v2/reference/news?limit=10&apiKey=UyzPkn5wTGhDq7aauKltPyTyNburS6FC`
    );
    if (!request.ok) {
      throw new Error(
        `Failed to fetch data , Status: ${request.status}`
      );
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching Grouped Daily data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}


// Top-5 
export async function top5() {
  try {
    
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${apikey}`
    );
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching Top 5 stocks data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
// Bottom-5 
export async function Losers() {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${apikey}`
    );
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching biggest Losers data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Full historical daily data for last 5 years
export default async function Historical_Daily_By_Ticker(ticker: string) {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${apikey}`
    );
    if (!request.ok) {
      throw new Error(
        `Failed to fetch data for ${ticker} Qoute From FMP, Status: ${request.status}`
      );
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching Grouped Daily data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
// Stock Company Profile
export async function Stock_Company_Profile(ticker: string) {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${apikey}`
    );
    if (!request.ok) {
      throw new Error(
        `Failed to fetch ${ticker} Profile FMP, Status: ${request.status}`
      );
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching Stock Profile:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}