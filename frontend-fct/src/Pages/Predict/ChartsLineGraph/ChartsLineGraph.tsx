import { useEffect, useState } from "react";
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
  // handling search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // performing ticker search
  const searchTicker = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/daily-historical?ticker=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.historical.reverse());
      console.log(data);
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
    } catch (error) {
      console.error("Error searching ticker:", error);
    }

    // setting chart data
  };

  // on search button click
  const handleSearchButtonClick = () => {
    searchTicker();
  };
  const downloadData = (ticker: string) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      searchResults.map((row) => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${ticker}_5_year_data.csv`);
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    if (searchQuery !== "") {
      searchTicker();
    }
  }, [searchQuery]);

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
          {/* <button className="search-button" onClick={handleSearchButtonClick}>Search</button> */}
        </div>
        <div className="search-line-graph-result">
          {searchResults.length > 0 && (
            <div className="search-result">
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

              <button onClick={() => downloadData(searchQuery)}>
                Download Raw Chart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
