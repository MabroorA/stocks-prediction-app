import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./ChartsLineGraph.css";
import { PredictionResponse, TickerHistoricalData } from "../../../types";
import HistoricalGraph from "../../../Components/historical-graph/HistoricalGraph";
import { Backend_url } from "../../../API/API_URL";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartsLineGraph() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TickerHistoricalData[]>(
    []
  );
  const [chartData, setChartData] = useState<any>({});
  const [searchButtonClicked, setSearchButtonClicked] =
    useState<boolean>(false); // Track if search button is clicked
  const [predictionResponse, setPredictionResponse] =
    useState<PredictionResponse | null>(null);
  const [isUpStock, setIsUpStock] = useState<boolean>(false); // Track if stock is up or down

  // handling search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // performing ticker search
  const searchTicker = async () => {
    if (!searchButtonClicked) return;
    try {
      const response = await fetch(
        `${Backend_url}/daily-historical?ticker=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.historical);
      setChartData({
        labels: data.historical.map(
          (result: TickerHistoricalData) => result.date
        ),
        datasets: [
          {
            label: "high",
            data: data.historical.map(
              (result: TickerHistoricalData) => result.high
            ),
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
          {
            label: "low",
            data: data.historical.map(
              (result: TickerHistoricalData) => result.low
            ),
            borderColor: "red",
            borderWidth: 1,
          },
        ],
      });
      console.log(data);
      await sendDataToFlask(data);
    } catch (error) {
      console.error("Error searching ticker:", error);
    }
  };

  // sending data to flask after recieveing from node
  const sendDataToFlask = async (data: TickerHistoricalData[]) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict-with-enhanced-model",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticker_data: data }),
        }
      );
      const responseData = await response.json();
      console.log("Response from Flask:", responseData);
      setPredictionResponse(responseData);
    } catch (error) {
      console.error("Error sending data to Flask:", error);
    }
  };
  // on search button click
  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
    searchTicker();
  };
  const downloadData = () => {
    const columnNames = Object.keys(searchResults[0]); // Extract column names from the first row
    const csvContent =
      "data:text/csv;charset=utf-8," +
      columnNames.join(",") +
      "\n" +
      searchResults.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${searchQuery}_5_year_data.csv`);
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    if (searchButtonClicked) {
      searchTicker();
    }
  }, [searchButtonClicked]);
  return (
    <>
      <div className="line-graph">
        <div className="search">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Enter Ticker To Predict"
          />
          <button className="search-button" onClick={handleSearchButtonClick}>
            Search
          </button>
        </div>
        <div className="search-line-graph-result">
          {searchButtonClicked && (
            <div className="search-result">
              {chartData.labels ? (
                <>
                  <div className="table">
                    <h3 className="table-title">
                      {searchQuery}'s Historical Data of 5 years
                    </h3>

                    <HistoricalGraph
                      symbol={searchQuery}
                      selectedGraph="line"
                    />
                    <div className="line-graph-buttons">
                      {isUpStock ? (
                        <button
                          className="download-button"
                          style={{ cursor: "pointer" }}
                          onClick={downloadData}
                        >
                          Buy Stock
                        </button>
                      ) : (
                        <button
                          className="download-button"
                          onClick={downloadData}
                        >
                          Sell Stock
                        </button>
                      )}
                    </div>

                    <div className="line-graph-buttons">
                      <button
                        className="download-button"
                        onClick={downloadData}
                      >
                        Download Raw Chart
                      </button>
                      <button
                        className="predict-stock-button"
                        // onClick={console.log(predict)}
                      >
                        Predict {searchQuery.toUpperCase()} Future Price
                      </button>
                    </div>
                  </div>
                  {predictionResponse ? (
                    <div className="table">
                      <h3 className="table-title">
                        Predicted vs Actual Close Prices
                      </h3>
                      <Line
                        data={{
                          labels: [
                            ...predictionResponse.original_prices.map(
                              (item) => item.date
                            ),
                            ...predictionResponse.predicted_prices.map(
                              (item) => item.date
                            ),
                          ],
                          datasets: [
                            {
                              label: "Actual Close",
                              data: predictionResponse.original_prices.map(
                                (item) => item.close
                              ),
                              borderColor: "blue",
                              borderWidth: 1,
                            },
                            {
                              label: "Predicted Close",
                              data: [
                                ...Array(
                                  predictionResponse.original_prices.length
                                ).fill(null),
                                ...predictionResponse.predicted_prices.map(
                                  (item) => item.close
                                ),
                              ],
                              borderColor: "green",
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          scales: {
                            x: {
                              title: {
                                display: true,
                                text: "Date",
                              },
                            },
                            y: {
                              title: {
                                display: true,
                                text: "Price",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <p style={{ textAlign: "center" }}>Predicting...</p>
                  )}
                </>
              ) : (
                <p style={{ textAlign: "center" }}>Getting Historical data</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
