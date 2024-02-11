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

import "./MovingAverageView.css";
function MovingAverageView() {
  // Define the type for the fetched data
  interface EmaResponse {
    next_url: string;
    request_id: string;
    results: {
      underlying: {
        url: string;
      };
      values: {
        timestamp: number;
        value: number;
      }[];
    };
    status: string;
  }
  // getting data from server api call
  async function fetchServerData() {
    const serverRequest = await fetch(
      "http://localhost:3000/exponential-moving-avg"
    );
    const response = await serverRequest.json();
    console.log(response, "IS THE SERVER RESPONSE");
    return response;
  }

  const [data, setData] = useState<EmaResponse[]>([]); // State to store the fetched data

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchServerData();
      setData(response.results.values || []); // Set the fetched data in state
      console.log(response.results.values, "moving average");
    };
    fetchData();
  }, []);

  // line graph

  return (
    <>
      <div className="Moving-avg-view">
        <div>Exponential Moving Average </div>
        <LineChart
          width={1750}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="value" />

          <Tooltip />
          <Legend verticalAlign="top" height={40} />
          <Line
            type="monotone"
            dataKey="value" // Use "value" instead of "avgprice" if that's the correct key
            name="Moving Average"
            stroke="#8884d8"
          />
        </LineChart>
      </div>
    </>
  );
}

export default MovingAverageView;
