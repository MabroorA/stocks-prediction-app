import "./HomePage.css";
import Logo from "../../../public/vite.svg";
import DailyView from "../../Components/DailyView/DailyView";
import MovingAverageView from "../../Components/MovingAverageView/Moving AverageView";
import NavBar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="left-container">
          <h1 className="non-color-change">Unlock Future</h1>
          <h1 className="color-change">Stock Performance</h1>
          <p className="introduction">
            We help you predict what your future stocks will look like by using
            prediction models and various other technologies, helping you make
            better decisions.
          </p>
          <button className="predict-button">Start Predicting</button>
        </div>
        <div className="right-container">
          <p>Rising Stocks this Week</p>
          <div className="top-stocks"></div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
