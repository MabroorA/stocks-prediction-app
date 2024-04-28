import NavBar from '../../Components/Navbar/NavBar'
import { MockDataPoint } from '../../types';
import ChartsLineGraph from './ChartsLineGraph/ChartsLineGraph'
import MockLineGraph from './MockLineGraph'
import "./Predict.css"

const mockData: MockDataPoint[] = [
  { date: "2024-04-21", high: 100, low: 80 },
  { date: "2024-04-22", high: 110, low: 85 },
  { date: "2024-04-23", high: 105, low: 75 },
  { date: "2024-04-24", high: 95, low: 70 },
  { date: "2024-04-25", high: 98, low: 72 },
];

export default function PredictPage() {
  return (
    <>
    <NavBar/>
    <div>
        <h1 className='predict-title'>Predict Page</h1>
        <MockLineGraph data={mockData}/>
        {/* <ChartsLineGraph/> */}
    </div>    
    </>
  )
}