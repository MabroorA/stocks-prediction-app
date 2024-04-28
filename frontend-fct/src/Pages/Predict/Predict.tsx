import NavBar from '../../Components/Navbar/NavBar'
import ChartsLineGraph from './ChartsLineGraph/ChartsLineGraph'
import "./Predict.css"


export default function PredictPage() {


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