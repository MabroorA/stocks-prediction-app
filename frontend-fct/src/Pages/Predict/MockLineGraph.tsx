import { useEffect, useRef } from "react";
import * as echarts from "echarts"; // Assuming you have echarts imported
import { TickerHistoricalData } from "../../types";

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

    let series: any = [];

    const highs = data.map((item) => item.high);
    const lows = data.map((item) => item.low);
    series = [
      {
        name: "High Price",
        type: "line",
        data: highs,
        smooth: true,
        itemStyle: {
          color: "green",
        },
      },
      {
        name: "Low Price",
        type: "line",
        data: lows,
        smooth: true,
        itemStyle: {
          color: "red",
        },
      },
    ];


    // Set up chart options
    const option: echarts.EChartsOption = {
      color: ["green", "red"], // Customize colors for high and low lines
      legend: {
        data: ["High Price", "Low Price"], // Legend data for high and low lines
        textStyle: {
          color: "#333", // Customize legend text color
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        padding: 0,
      },
      grid: {
        containLabel: true,
        
      },
      xAxis: {
        type: "category",
        data: dates,
        
        axisLine: { lineStyle: { color: "#8392A5" } },

      },
      yAxis: {
        axisLine: { lineStyle: { color: "#8392A5" } },
        splitLine: { show: false },
      },
      series: series,
    };

    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);

    // Cleanup function
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}

export default MockLineGraph;
