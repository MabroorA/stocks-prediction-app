import React from "react";

const StockTable = ({ metaData, timeSeriesData }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(timeSeriesData).map((date) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{timeSeriesData[date]["1. open"]}</td>
              <td>{timeSeriesData[date]["2. high"]}</td>
              <td>{timeSeriesData[date]["3. low"]}</td>
              <td>{timeSeriesData[date]["4. close"]}</td>
              <td>{timeSeriesData[date]["5. volume"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
