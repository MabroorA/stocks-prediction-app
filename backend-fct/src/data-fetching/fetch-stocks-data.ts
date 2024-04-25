
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
    "https://api.polygon.io/v1/indicators/ema/AAPL?timespan=day&adjusted=true&window=10&series_type=close&order=desc&limit=500&apiKey=UyzPkn5wTGhDq7aauKltPyTyNburS6FC"
  );
  const response = await request.json();
  return response;
}
// searching with Company/ticker name
export async function Search_ticker(ticker: string) {
  const API_KEY = "UyzPkn5wTGhDq7aauKltPyTyNburS6FC";
  const request = await fetch(
    `https://api.polygon.io/v3/reference/tickers?active=true&apiKey=${API_KEY}&ticker=${ticker}`
  );
  const response = await request.json();
  return response;
}
export async function Search_to_display_ticker(ticker: string) {
  try {
      const API_KEY = process.env.Poly_API_KEY;
      const request = await fetch(
          `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=7&series_type=close&order=asc&limit=100&apiKey=${API_KEY}`
      );
      if (!request.ok) {
          throw new Error(`Failed to fetch data for ${ticker}. Status: ${request.status}`);
      }
      const response = await request.json();
      return response;
  } catch (error) {
      console.error("Error fetching ticker data:", error);
      throw error; // Re-throw the error to be handled by the caller
  }
}
// Group Daily
export async function Grouped_Daily() {
  try {
    const API = process.env.Poly_API_KEY;
    const request = await fetch(
      `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=UyzPkn5wTGhDq7aauKltPyTyNburS6FC`
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

// Full Qoute Single Stock (to be implemented)
export async function Single_Stock_Qoute(ticker: string) {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${ticker}apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1`
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
//financialmodelingprep.com/api/v3/historical-chart/15min/AAPL?from=2024-02-21&to=2024-02-21&apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1


// Not implemented Yet
// Stock data every 15min intervals in a day
export async function IntraDay_Given_Stock_and_Timeframe(ticker: string) {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-chart/15min/${ticker}?from=2024-02-21&to=2024-02-21&apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1`
    );
    if (!request.ok) {
      throw new Error(
        `Failed to fetch Daily data for ${ticker} Qoute From FMP, Status: ${request.status}`
      );
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching Grouped Daily data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}


// withouth params
// Stock data every 15min intervals in a day
export async function IntraDay() {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-chart/45min/AAPL?from=2024-02-21&to=2024-02-21&apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1`
    );
    if (!request.ok) {
      throw new Error(`Failed to fetch IntraDay data , Status: ${request.status}`);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching Grouped IntraDay data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Top-5 
export async function top5() {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1`
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
      `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1`
    );
    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching biggest Losers data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Full historical daily data for last 5 years
export async function Historical_Daily_By_Ticker(ticker: string) {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1`
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
// Full historical daily data for last 5 years
export async function Stock_Company_Profile(ticker: string) {
  try {
    const request = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1`
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