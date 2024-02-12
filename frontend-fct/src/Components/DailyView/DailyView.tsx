import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import "./DailyView.css";
function DailyView() {
  // Define the type for the fetched data
  interface DailyData {
    datetime: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    avgprice: number;
    meta: {
      symbol: string;
      interval: string;
      currency: string;
      exchange_timezone: string;
      exchange: string;
      mic_code: string;
      type: string;
    };
  }
  // getting data from server api call
  async function fetchServerData(): Promise<{ values: DailyData[] }> {
    const serverRequest = await fetch("http://localhost:3000/daily-view");
    const response = await serverRequest.json();
    console.log(response, "IS THE SERVER RESPONSE");
    return response;
  }

  const [data, setData] = useState<DailyData[]>([]); // State to store the fetched data

  const fetchData = async () => {
    const response = await fetchServerData();
    setData(response.values); // Set the fetched data in state
    console.log(response, "Daily View Working");
  };

  useEffect(() => {
    fetchData();
  }, []);
  // line graph

  return (
    <>
    <button className="refresh-button" onClick={fetchData}>
          Refresh
        </button>
      <div className="daily-view">
        {data.length > 0 && (
          <LineChart
            width={400}
            height={400}
            data={data}
            margin={{ top: 10, right: 15, left: 50, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="0 0" />
            <XAxis dataKey="datetime">
              <Label value="Date" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="avgprice">
              <Label value="Avg Price" offset={-35} position="insideLeft" />
            </YAxis>

            <Tooltip />
            <Legend verticalAlign="top" height={40} />
            <Line
              type="monotone"
              dataKey="avgprice"
              name="IBM Average Price "
              stroke="#de6e4b"
            />
          </LineChart>
        )}
      </div>
    </>
  );
}

export default DailyView;
