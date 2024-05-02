import { useEffect, useState } from "react";
import { TickerHistoricalData } from "../../types";
import MockLineGraph from "../../Pages/Predict/MockLineGraph";

interface HistoricalGraphProps {
  symbol: string;
  selectedGraph: string;
}

function HistoricalGraph({ symbol, selectedGraph }: HistoricalGraphProps) {
  const [historicalData, setHistoricalData] = useState<TickerHistoricalData[]>(
    []
  );

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

  return <MockLineGraph data={historicalData} selectedGraph={selectedGraph} />;
}

export default HistoricalGraph;
