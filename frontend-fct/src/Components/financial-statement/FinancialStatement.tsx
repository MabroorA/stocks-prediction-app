import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface financialStatement{
    symbol:string;
}

interface FinancialSummaryData {
    date: string;
    revenue: number;
    netIncome: number;
}

const mockData: FinancialSummaryData[] = [
    {
      date: "2023",
      revenue: 383285000000,
      netIncome: 96995000000
    },
    {
      date: "2022",
      revenue: 394328000000,
      netIncome: 99803000000
    },
    {
      date: "2021",
      revenue: 365817000000,
      netIncome: 94680000000
    },
    {
      date: "2020",
      revenue: 274515000000,
      netIncome: 57411000000
    },
    {
      date: "2019",
      revenue: 260174000000,
      netIncome: 55256000000
    }
  ];

export default function FinancialStatement({symbol}:financialStatement) {

    const chartRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch financial statement data for the given symbol
            // const response = await fetch(`https://api.example.com/financial-statements/${symbol}`);
            // const data: FinancialData[] = await response.json();
    
            // Extract revenue and net income data
            // const dates = data.map(item => item.date);
            // const revenue = data.map(item => item.revenue);
            // const netIncome = data.map(item => item.netIncome);
            
            const dates = mockData.map(item => item.date);
            const revenue = mockData.map(item => item.revenue);
            const netIncome = mockData.map(item => item.netIncome);
            
            // 
            const revenues = mockData.map(item => item.revenue);
            const netIncomes = mockData.map(item => item.netIncome);

            const minValue  = Math.min(...revenues, ...netIncomes);
            const maxValue  = Math.max(...revenues, ...netIncomes);

            // Add some padding to the y-axis
            const padding = Math.abs(maxValue  - minValue) * 0.1; // 10% padding
            const minYAxisValue = minValue - padding;
            const maxYAxisValue = maxValue + padding;

            // Set up chart options
            const option: echarts.EChartsOption = {
                color:["purple", "#63B7F1"],
                legend: {
                    data: ["Revenue","Net Income"],
                    
                },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross'
                }
                
            },
            xAxis: {
                type: 'category',
                data: dates,
                axisLine: { lineStyle: { color: '#8392A5' } }
                

            },
            yAxis: {
                scale: true,
                min: minYAxisValue,
                max: maxYAxisValue,
                axisLine: { lineStyle: { color: '#8392A5' } },
                splitLine: { show: false },
                axisLabel: {
                    formatter: (value: number) => (value / 1e9).toFixed(0) + 'B' // Format to billions
                }
            },
            series: [
                {
                name: 'Revenue',
                type: 'line',
                smooth:true,
                showSymbol: false,
                data: revenue,
                lineStyle: {
                    width: 0
                },
                areaStyle: {
                    opacity: 0.4,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#7C5EEE' 
                        },
                        {
                            offset: 1,
                            color: '#F5F5F6' 
                        }
                    ])
                },
            },
                {
                name: 'Net Income',
                type: 'line',
                smooth:true,
                showSymbol: false,
                data: netIncome,
                lineStyle: {
                    width: 0
                },
                areaStyle: {
                    opacity: 0.4,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#63B7F1' // Dark Green color gradient start
                        },
                        {
                            offset: 1,
                            color: '#E2EDF6' // Light Green color gradient end
                        }
                    ])
                },
                }
            ]
            };
    
            // Initialize ECharts instance and set options
            if (!chartRef.current) return;
            const chart = echarts.init(chartRef.current);
            chart.setOption(option);
          } catch (error) {
            console.error('Error fetching financial data:', error);
          }
        };
    
        fetchData();
      }, [symbol]);

  return (
    <>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </>
  );
};

