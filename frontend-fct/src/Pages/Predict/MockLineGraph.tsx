import { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // Assuming you have echarts imported
import { MockDataPoint, TickerHistoricalData } from '../../types';


interface MockLineGraphProps {
  data: TickerHistoricalData[]; // Pass mock data as props
}


function MockLineGraph({ data }: MockLineGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) {
        return; // If data is undefined or empty, exit early
      }
    // Process mock data
    const dates = data.map((item: TickerHistoricalData) => item.date);
    const highs = data.map((item: TickerHistoricalData) => item.high);
    const lows = data.map((item: TickerHistoricalData) => item.low);

    // Set up chart options
    const option: echarts.EChartsOption = {
      color: ["green", "red"], // Customize colors for high and low lines
        legend: {
          data: ['High Price', 'Low Price'], // Legend data for high and low lines
          textStyle: {
            color: '#333', // Customize legend text color
          },
        },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        padding:0,
        
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#8392A5' } }
      },
      yAxis: {
        axisLine: { lineStyle: { color: '#8392A5' } },
        splitLine: { show: false }
      },
      series: [
        {
          name: 'High Price',  
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: highs,
          itemStyle: {
            color: 'green',
          }
        },
        {
          name: 'Low Price',      
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: lows,
          itemStyle: {
            color: 'red',
          }
        }
      ]
    };

    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);

    // Cleanup function
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '1280px', height: '400px' }} />;
}

export default MockLineGraph;
