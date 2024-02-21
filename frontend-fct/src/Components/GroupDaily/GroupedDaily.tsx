import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale, 
  LinearScale, 
  PointElement
)

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
  const [data, setData] = useState<ApiResponse>({
    adjusted: false,
    queryCount: 0,
    results: [],
    resultsCount: 0,
    status: ""
  }); // State to store the fetched data

  // Function to fetch data from the server
  async function fetchServerData() {
    const serverRequest = await fetch("http://localhost:3000/grouped-daily");
    const response: ApiResponse = await serverRequest.json();
    console.log("Grouped Daily sent from server");
    return response;
  }

  // Function to fetch and set data
  const fetchData = async () => {
    const response = await fetchServerData();
    setData(response); // Set the fetched data in state
    console.log(response);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);  






  return (
    <div>
     <button className="refresh-button" onClick={fetchData}>
        Fetch Data
      </button>
      <div className="grouped-daily">
        <Line
          data={{
            labels: data.results?.map((item) => item.T),
            datasets: [
              {
                label: "Average VW Price",
                data: data.results?.map((item) => item.vw),
                backgroundColor: "#8884d8",
              },
            ],
          }}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Stock",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Avg Volume-Weighted Price",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );

}

export default GroupedDaily;
