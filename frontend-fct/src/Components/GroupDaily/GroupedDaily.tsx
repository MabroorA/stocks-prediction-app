import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

function GroupedDaily() {
  const [data, setData] = useState([]); // State to store the fetched data

  // Function to fetch data from the server
  async function fetchServerData() {
    const serverRequest = await fetch("http://localhost:3000/grouped-daily");
    const response = await serverRequest.json();
    console.log(response, "Grouped Daily sent from server");
    return response;
  }

  // Function to fetch and set data
  const fetchData = async () => {
    const response = await fetchServerData();
    setData(response.values); // Set the fetched data in state
    console.log(response, "GroupedDaily Working");
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);  
  return (
    <div>
      <button className="refresh-button" onClick={fetchData}>
        Refresh
      </button>
      <div className="grouped-daily">
        {data.length > 0 && (
          <BarChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="T">
              <Label value="Stock" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label
                value="Avg Volume-Weighted Price"
                offset={-5}
                position="insideLeft"
                angle={-90}
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="vw" fill="#8884d8" name="Average VW Price" />
          </BarChart>
        )}
      </div>
    </div>
  );

}

export default GroupedDaily;
