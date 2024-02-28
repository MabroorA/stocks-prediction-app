import IntraData from '../../Components/IntraData_Given_ticker_&_timeframe/IntraData';
import NavBar from '../../Components/Navbar/NavBar'
import "./Analyse.css"
export default function Analyse() {
  return (
    <>
      <NavBar />
      <div className="analyse-container">
        <h1 className="title">Analyse</h1>
        <IntraData />
      </div>
    </>
  );
}
