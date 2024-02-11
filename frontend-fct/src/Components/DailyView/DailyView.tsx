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
  async function fetchServerData() {
    const serverRequest = await fetch("http://localhost:3000/daily-view");
    const response = await serverRequest.json();
    console.log(response, "IS THE SERVER RESPONSE");
    return response;
  }

  const [data, setData] = useState<DailyData[]>([]); // State to store the fetched data

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchServerData();
      setData(response.values); // Set the fetched data in state
      console.log(response, "Daily View Working");
    };
    fetchData();
  }, []);

  // line graph

  return (
    <>
      <div className="daily-view">
        <div>DailyView Data </div>
        {data.length > 0 && (
          <LineChart
            width={1750}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" activeDot={{ r: 8 }}>
              <Label value="Date" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="avgprice">
              <Label value="Avg Price" offset={0} position="insideLeft" />
            </YAxis>

            <Tooltip />
            <Legend verticalAlign="top" height={40} />
            <Line
              type="monotone"
              dataKey="avgprice"
              name="IBM Average Price "
              stroke="#8884d8"
            />
          </LineChart>
        )}
        {/* {data && (
          <div>
            <h2>json data from server :</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </>
  );
}

export default DailyView;
