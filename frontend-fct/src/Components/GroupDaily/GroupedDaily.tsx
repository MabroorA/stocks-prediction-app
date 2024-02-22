import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Label,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ApiResponse {
  adjusted: boolean;
  queryCount: number;
  results: {
    T: string;
    c: number;
    h: number;
    l: number;
    n: number;
    o: number;
    t: number;
    v: number;
    vw: number;
  }[];
  resultsCount: number;
  status: string;
}

function GroupedDaily() {
  const fetchServerData = async (): Promise<ApiResponse> => {
    const serverRequest = await fetch("http://localhost:3000/grouped-daily");
    const response = await serverRequest.json();
    console.log("Grouped Daily sent from server");
    return response;
  };

  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchServerData();
        const formattedData = response.results.map((item) => ({
          name: new Date(item.t).toLocaleDateString(),
          value: item.c,
        }));
        setData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="grouped-daily">
        <LineChart
          width={450}
          height={350}
          data={data}
          margin={{ top: 0, right: 5, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name">
            <Label value="Date" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Value" offset={0} position="left" />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" height={40} />
          <Line
            type="monotone"
            dataKey="value"
            name="Grouped Daily Data"
            stroke="#8884d8"
          />
        </LineChart>
      </div>
    </div>
  );
}

export default GroupedDaily;
