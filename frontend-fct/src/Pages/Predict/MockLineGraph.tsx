import { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // Assuming you have echarts imported
import { MockDataPoint } from '../../types';


interface MockLineGraphProps {
  data: MockDataPoint[]; // Pass mock data as props
}


function MockLineGraph({ data }: MockLineGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Process mock data
    const dates = data.map((item: MockDataPoint) => item.date);
    const highs = data.map((item: MockDataPoint) => item.high);
    const lows = data.map((item: MockDataPoint) => item.low);

    // Set up chart options
    const option: echarts.EChartsOption = {
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
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: highs,
          itemStyle: {
            color: 'green',
          }
        },
        {
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

  return <div ref={chartRef} style={{ width: '550px', height: '360px' }} />;
}

export default MockLineGraph;
