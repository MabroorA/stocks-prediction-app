import { useEffect, useState } from "react";
import { TickerHistoricalData } from "../../types";
import MockLineGraph from "../../Pages/Predict/MockLineGraph";

interface HistoricalGraphProps {
  symbol: string;
  period?: string;
}

function getStartDate(period: string): string {
  const today = new Date(); // Get today's date

  switch (period) {
      case "5Y": // 5 years
          return new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()).toISOString();
      
      case "1Y": // 1 year
          return new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).toISOString();

      case "6M": // 6 months
          return new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()).toISOString();

      case "3M": // 3 months
          return new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()).toISOString();

      case "1M": // 1 month
          return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toISOString();

      case "5D": // 5 days
          return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString();
      
      default:
          return "2019-05-02Tabs"; // Invalid period
  }
}

function HistoricalGraph({ symbol, period = "5Y" }: HistoricalGraphProps) {
  const [historicalData, setHistoricalData] = useState<TickerHistoricalData[]>(
    []
  );

  const formattedStartDate = getStartDate(period).split('T')[0]
  console.log(formattedStartDate)

  useEffect(() => {
    const fetchData = async () => {
      const FINANCIAL_API_KEY = "bSWGKUmYf4CDKEVMHWjqdP9t2AjiHWpm";
      const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${FINANCIAL_API_KEY}&start_date=2024-03-27&end_date=2024-04-04`;

      try {
        const response = await fetch(url);
        const data: { historical: TickerHistoricalData[] } =
          await response.json();
        console.log(data);
        setHistoricalData(data.historical.reverse());
      } catch (error) {
        console.error("Error fetching historical data:", error);
        <p>Error fetching historical data</p>;
      }
    };

    fetchData();
  }, [symbol]);

  const formattedData = historicalData.filter(dataPoint => new Date(dataPoint.date) > new Date(formattedStartDate))

  return <MockLineGraph data={formattedData}  />;
}

export default HistoricalGraph;
