import { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // Assuming you have echarts imported
import { TickerHistoricalData } from '../../types';

interface HistoricalGraphProps {
  symbol: string;
}



function HistoricalGraph({ symbol }: HistoricalGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const FINANCIAL_API_KEY = 'bSWGKUmYf4CDKEVMHWjqdP9t2AjiHWpm';


      const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${FINANCIAL_API_KEY}`;
      const response = await fetch(url);
      const data: { historical: TickerHistoricalData[] } = await response.json();
      console.log(data);
      
      
      // Process data
      const prices = data.historical.map((item) => item.close)
      const years = data.historical.map((item) => new Date(item.date).getFullYear()).reverse();
      const uniqueYears = Array.from(new Set(years));


      // Calculate minimum and maximum prices
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

       // Set up chart options
      const option: echarts.EChartsOption = {
        xAxis: {
          type: 'category',
          data: uniqueYears.map(String),
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
          scale: true,
          min: minPrice, 
          max: maxPrice,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: false }
        },
        grid: {
          bottom: 20
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: prices,
            itemStyle: {
              color: 'blue',
            }
          }
        ]
      };

      if (!chartRef.current) return;
      const chart = echarts.init(chartRef.current);
      chart.setOption(option);
    };

    fetchData();
  }, [symbol]);

  return <div ref={chartRef} style={{ width: '400px', height: '400px' }} />;
}

export default HistoricalGraph;
