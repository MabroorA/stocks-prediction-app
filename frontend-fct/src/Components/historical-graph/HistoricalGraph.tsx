import { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // Assuming you have echarts imported

interface HistoricalGraphProps {
  symbol: string;
}

interface DayData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}



function HistoricalGraph({ symbol }: HistoricalGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const FINANCIAL_API_KEY = 'bSWGKUmYf4CDKEVMHWjqdP9t2AjiHWpm';
      const today = new Date();
      const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());  

      // formatting
      const fromDate = fiveYearsAgo.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
      const toDate = today.toISOString().slice(0, 10);

      const url = `https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?from=${fromDate}&to=${toDate}&apikey=${FINANCIAL_API_KEY}`;
      const response = await fetch(url);
      const data: DayData[] = await response.json(); // Type the response as DayData[]
      console.log(data);
      
      
      // Calculate minimum and maximum prices for y-axis
      const minPrice: number = Math.min(...data.map((day) => day.low));
      const maxPrice: number = Math.max(...data.map((day) => day.high));
      // dates n prices
      const dates = data.map((item) => item.date);
      const prices = data.map((item) => [item.open, item.close, item.low, item.high]);

       // Set up chart options
      const option: echarts.EChartsOption = {
        xAxis: {
          type: 'category',
          data: dates.reverse(),
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: false }
        },
        grid: {
          bottom: 80
        },
        series: [
          {
            type: 'candlestick',
            data: prices,
            itemStyle: {
              color: '#FD1050',
              color0: '#0CF49B',
              borderColor: '#FD1050',
              borderColor0: '#0CF49B'
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
