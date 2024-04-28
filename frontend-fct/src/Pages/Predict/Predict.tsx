import { useState } from 'react';
import NavBar from '../../Components/Navbar/NavBar'
import { MockDataPoint, PredictionResponse, TickerHistoricalData } from '../../types';
import ChartsLineGraph from './ChartsLineGraph/ChartsLineGraph'
import MockLineGraph from './MockLineGraph'
import "./Predict.css"
import HistoricalGraph from '../../Components/historical-graph/HistoricalGraph';


const mockData: MockDataPoint[] = [
  { date: "2024-04-21", high: 100, low: 80 },
  { date: "2024-04-22", high: 110, low: 85 },
  { date: "2024-04-23", high: 105, low: 75 },
  { date: "2024-04-24", high: 95, low: 70 },
  { date: "2024-04-25", high: 98, low: 72 },
];

interface MockHistoricalData {
  date: string;
  high: number;
  low: number;
}
const mockHistoricalData: MockHistoricalData[] = [
  { date: '2024-04-21', high: 100, low: 80 },
  { date: '2024-04-22', high: 110, low: 85 },
  { date: '2024-04-23', high: 105, low: 75 },
  { date: '2024-04-24', high: 95, low: 70 },
  { date: '2024-04-25', high: 98, low: 72 },
];
export default function PredictPage() {


  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchButtonClicked, setSearchButtonClicked] = useState<boolean>(false); // Track if search button is clicked



  
  // handling search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  // on search button click
  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
  };

  return (
    <>
    <NavBar/>
    <div>
      <h1 className='predict-title'>Predict Page</h1>
      {/* <HistoricalGraph symbol={searchQuery} /> */}
      <ChartsLineGraph />
    </div>
  </>
  )
}