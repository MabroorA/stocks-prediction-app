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
      <LineChart
        width={450}
        height={350}
        data={data}
        margin={{ top: 0, right: 5, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => {
            const date = new Date(timestamp);
            return `${
              date.getMonth() + 1
            }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
          }}
        >
          <Label value="Hour" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis dataKey="value">
          <Label value="Value" offset={0} position="left" />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" height={40} />
        <Line
          type="monotone"
          dataKey="value" // Use "value" instead of "avgprice" if that's the correct key
          name="Exponential Moving Average"
          stroke="#8884d8"
        />
      </LineChart>
    </>
  );
}

export default MovingAverageView;
