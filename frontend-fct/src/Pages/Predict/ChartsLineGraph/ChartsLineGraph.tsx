import { useState } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, 
Legend, Filler} from "chart.js"
import { Line } from "react-chartjs-2";
import "./ChartsLineGraph.css"


interface TickerHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

interface PredictionResponse {
  date: string[];
  original_close: number[];
  predicted_close: number[];
  accuracy: number;
}

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
)

export default function ChartsLineGraph() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TickerHistoricalData[]>(
    []
  );
  const [chartData, setChartData] = useState<any>({});
  const [searchButtonClicked, setSearchButtonClicked] = useState<boolean>(false); // Track if search button is clicked
  const [predictionResponse, setPredictionResponse] = useState<PredictionResponse | null>(null);

  // handling search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchResults([]); // Reset searchResults when search query changes
  };

  // performing ticker search
  const searchTicker = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/daily-historical?ticker=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.historical.reverse());
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
      const response = await fetch("http://127.0.0.1:5000/predict-with-enhanced-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticker_data: data }),
      });
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
              {chartData.labels && (
                <>
                  <h3
                    style={{
                      color: "lightcoral",
                      fontSize: "20px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {searchQuery}'s Historical Data of 5 years{" "}
                  </h3>
                  <Line
                    data={chartData}
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
                            text: "Daily High",
                          },
                        },
                      },
                    }}
                  />
                  <div className="line-graph-buttons">
                    <button className="download-button" onClick={downloadData}>
                      Download Raw Chart
                    </button>

                    <button
                      className="predict-stock-button"
                      // onClick={console.log(predict)}
                    >
                      Predict {searchQuery.toUpperCase()} Future Price
                    </button>
                  </div>
                  
                  {predictionResponse ? (
                <>
                  <h3 style={{ textAlign: "center" }}>
                    Predicted vs Actual Close Prices
                  </h3>
                  <p style={{ textAlign: "center" }}>
                    Accuracy: {predictionResponse.accuracy?.toFixed(2) ?? 0}
                  </p>
                  <Line
                    data={{
                      labels: predictionResponse.date,
                      datasets: [
                        {
                          label: "Actual Close",
                          data: predictionResponse.original_close,
                          borderColor: "blue",
                          borderWidth: 1,
                        },
                        {
                          label: "Predicted Close",
                          data: predictionResponse.predicted_close,
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
                </>
              ) : (
                <p style={{ textAlign: "center" }}>Loading...</p>
              )}
                  
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
