import { useEffect, useState } from 'react';
import { TickerHistoricalData } from '../../types';
import MockLineGraph from '../../Pages/Predict/MockLineGraph';

interface HistoricalGraphProps {
  symbol: string;
}



function HistoricalGraph({ symbol }: HistoricalGraphProps) {


  const [historicalData, setHistoricalData] = useState<TickerHistoricalData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const FINANCIAL_API_KEY = 'bSWGKUmYf4CDKEVMHWjqdP9t2AjiHWpm';
      const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${FINANCIAL_API_KEY}`;

      try {
        const response = await fetch(url);
        const data: { historical: TickerHistoricalData[] } = await response.json();
        console.log(data);
        setHistoricalData(data.historical.reverse());
      } catch (error) {
        console.error('Error fetching historical data:', error);
        <p>Error fetching historical data</p>
      }
    };

    fetchData();
  }, [symbol]);

  return <MockLineGraph data={historicalData} />;
}

export default HistoricalGraph;
