import { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // Assuming you have echarts imported

interface HistoricalGraphProps {
  symbol: string;
  fromDate: string;
  toDate: string;
}

interface DayData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}



function HistoricalGraph({ symbol, fromDate, toDate }: HistoricalGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const FINANCIAL_API_KEY = 'updJZ6J5tMLEtqk4DCy86VTUoLaxg3xF';  
      const url = `https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?from=${fromDate}&to=${toDate}&apikey=${FINANCIAL_API_KEY}`;
      const response = await fetch(url);
      const data: DayData[] = await response.json(); // Type the response as DayData[]
      console.log(data);
      
      
      // Calculate minimum and maximum prices for y-axis
      const minPrice: number = Math.min(...data.map((day) => day.low));
      const maxPrice: number = Math.max(...data.map((day) => day.high));

      const processedData: echarts.EChartsOption = {
        dataset: [
          {
            id: 'dataset_historical',
            source: data.map((day) => ({
              date: day.date,
              Open: day.open,
              High: day.high,
              Low: day.low,
              Close: day.close,
            })),
          },
        ],
        
        tooltip: {
          trigger: 'axis',
          position: 'inside',
          
        },
        xAxis: {
            
            type: 'time', // Set the x-axis type to 'time'
            axisLabel: {
                formatter: function (value, params) { // Function to format x-axis labels
                  const date = new Date(value);
                  // Check if it's a single day's worth of data
                  if (fromDate.slice(0, 10) === toDate.slice(0, 10)) {
                    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Show only time
                  } else {
                    return date.toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); // Show full date and time
                  }
                },
              },
            },
        yAxis: {
          min: minPrice,
          max: maxPrice,
          splitNumber: 6,
          axisLabel: {
            formatter: function (value: number) {
              return value.toFixed(1); // Format y-axis labels with 1 decimal place
            },
          },
        },
        grid: { 
            left: 50, 
            right: 19, 
            top: 30, 
            bottom: 35, 
          },
        series: [
          {
            type: 'line',
            datasetId: 'dataset_historical',
            showSymbol: false,
            encode: {
              x: 'date',
              y: 'Close',
              itemName: 'Year',
              tooltip: ['Open', 'High', 'Low', 'Close'],
            },
          },
        ],
      };

      if (!chartRef.current) return;
      const chart = echarts.init(chartRef.current);
      chart.setOption(processedData);
    };

    fetchData();
  }, [symbol, fromDate, toDate]);

  return <div ref={chartRef} style={{ width: '400px', height: '400px' }} />;
}

export default HistoricalGraph;
