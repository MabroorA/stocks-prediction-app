import {  useState } from "react";
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
import {
  PredictionResponse,
  TickerHistoricalData,
  TickerResponse,
} from "../../../types";
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
  Filler,
);



export default function ChartsLineGraph() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [searchedQuery, setSearchedQuery] = useState<string>("");

  const [searchResults, setSearchResults] = useState<TickerResponse | null>(null);

  const [chartData, setChartData] = useState<any>({});
  // const [searchButtonClicked, setSearchButtonClicked] =
  // useState<boolean>(false); // Track if search button is clicked
  const [predictionResponse, setPredictionResponse] =
    useState<PredictionResponse | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [isPredictionLoading, setIsPredictionLoading] = useState(false)
  const [isPredictionError, setIsPredictionError] = useState(false)

  // performing ticker search
  const searchTicker = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setSearchedQuery(searchQuery);
      const response = await fetch(
        `${Backend_url}/daily-historical?ticker=${searchQuery}`,
      );
      const data = await response.json();

      setSearchResults(data);
      setChartData({
        labels: data.historical.map(
          (result: TickerHistoricalData) => result.date,
        ),
        datasets: [
          {
            label: "high",
            data: data.historical.map(
              (result: TickerHistoricalData) => result.high,
            ),
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
          {
            label: "low",
            data: data.historical.map(
              (result: TickerHistoricalData) => result.low,
            ),
            borderColor: "red",
            borderWidth: 1,
          },
        ],
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching ticker:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  console.log(searchResults, 'aare the search')

  // sending data to flask after recieveing from node
  const sendDataToFlask = async (data: TickerResponse) => {
    console.log("sendDataToFlask is being run");
    console.log(data)
    try {
      setIsPredictionLoading(true)
      setIsPredictionError(false);
      setPredictionResponse(null)
      const response = await fetch(
        "http://127.0.0.1:5000/predict-with-enhanced-model",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticker_data: data }),
        },
      );
      const responseData = await response.json();
      setPredictionResponse(responseData);
      setIsPredictionLoading(false)
      console.log("Response from Flask:", responseData);
      
    } catch (error) {
      setIsLoading(false)
      setIsPredictionError(true)
      console.error("Error sending data to Flask:", error);
    }
  };

  const downloadData = () => {
    const columnNames = Object.keys((searchResults as TickerResponse).historical[0]); // Extract column names from the first row
    const csvContent =
      "data:text/csv;charset=utf-8," +
      columnNames.join(",") +
      "\n" +
      (searchResults as TickerResponse).historical
        .map((row) => Object.values(row).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${searchQuery}_5_year_data.csv`);
    document.body.appendChild(link);
    link.click();
  };
  let shouldBuyMore = undefined;

  if (predictionResponse) {
    shouldBuyMore =
      predictionResponse?.predicted_prices[0]?.close >
        predictionResponse?.original_prices[0]?.close ?? undefined;
  }

  if (isLoading)
    return (
      <p style={{ textAlign: "center", padding: "28px" }}>
        Getting Historical data
      </p>
    );

  return (
    <>
      <div className="line-graph">
        <div className="search">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Enter Ticker To Predict"
          />
          <button className="search-button" onClick={() => searchTicker()}>
            Search
          </button>
        </div>
        {isError && (
          <div>
            <p style={{ textAlign: "center", padding: "28px" }}>
              You searched for {searchedQuery}. An Error occured with your
              search. Please make sure your ticker value is correct and try
              again.
            </p>
          </div>
        )}
        {!isError && (
          <div className="search-line-graph-result">
            <div className="search-result">
              {chartData.labels && (
                <>
                  <div className="table">
                    <h3 className="table-title">
                      {searchedQuery}'s Historical Data of 5 years
                    </h3>
                    <div className="main-graph">
                      <HistoricalGraph
                        symbol={searchedQuery}
                      />
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
                        onClick={() => {
                          if (searchResults) {
                            sendDataToFlask(searchResults);
                          }
                        }}
                      >
                        Predict {searchedQuery.toUpperCase()} Future Price
                      </button>
                    </div>
                  </div>
                  {predictionResponse && !isPredictionLoading && !isPredictionError && (
                    <div className="table">
                      <h3 className="table-title">
                        Predicted vs Actual Close Prices
                      </h3>
                      <Line
                        data={{
                          labels: [
                            ...predictionResponse.original_prices.map(
                              (item) => item.date,
                            ),
                            ...predictionResponse.predicted_prices.map(
                              (item) => item.date,
                            ),
                          ],
                          datasets: [
                            {
                              label: "Actual Close",
                              data: predictionResponse.original_prices.map(
                                (item) => item.close,
                              ),
                              borderColor: "blue",
                              borderWidth: 1,
                            },
                            {
                              label: "Predicted Close",
                              data: [
                                ...Array(
                                  predictionResponse.original_prices.length,
                                ).fill(null),
                                ...predictionResponse.predicted_prices.map(
                                  (item) => item.close,
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {shouldBuyMore === true && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p>
                              The prediction model shows that this stock will
                              rise in value. Click below to buy more.
                            </p>
                            <button
                              onClick={() => {
                                console.log("clicked buying more stocks");
                              }}
                              style={{
                                background: "green",
                                color: "white",
                              }}
                            >
                              Buy Stocks
                            </button>
                          </div>
                        )}
                        {shouldBuyMore === false && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p>
                              The prediction model shows that this stock will
                              drop in value. Click below to sell.
                            </p>
                            <button
                              onClick={() => {
                                console.log("clicked selling stocks");
                              }}
                              style={{
                                background: "red",
                                color: "white",
                              }}
                            >
                              Sell Stocks
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {!predictionResponse && !isPredictionLoading && !isPredictionError && (
                    <p style={{ textAlign: "center" }}>
                      Run model for Predictions{" "}
                    </p>
                  )}
                  {
                    !isPredictionLoading && !predictionResponse && isPredictionError && (
                      <div>
                        <p style={{ textAlign: "center" }}>There was an error with running the prediction model. Please try again later.</p>
                      </div>
                    )
                  }
                  {
                    isPredictionLoading && !predictionResponse && !isPredictionError && (
                      <div>
                        <p style={{ textAlign: "center" }}>The prediction model is calculating. This may take some time (20 seconds max). Please wait...</p>
                      </div>
                    )
                  }
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
