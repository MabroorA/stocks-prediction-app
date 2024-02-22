import { useState, useEffect } from "react";

interface IntradayData {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}
export default function IntraData_without_ticker() {
  const [intradayData, setIntradayData] = useState<IntradayData[]>([]);

  const fetchIntradayData = async () => {
    try {
      const response = await fetch("http://localhost:3000/intraday");
      const data = await response.json();
      setIntradayData(data || []);
    } catch (error) {
      console.error("Error fetching intraday data:", error);
    }
  };

  useEffect(() => {
    fetchIntradayData();
  }, []);
  return (
    <div className="intra-data">
      <h1>Intraday Data</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>Low</th>
            <th>High</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {intradayData.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.open}</td>
              <td>{data.low}</td>
              <td>{data.high}</td>
              <td>{data.close}</td>
              <td>{data.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
