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
          <p>
            We help you predict what your future stocks will look like by using
            prediction models and various other technologies, helping you make
            better decisions.
          </p>
        </div>
        <div className="right-container">
          <h1>Rising Stocks this Week</h1>
          <DailyView />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
