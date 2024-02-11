import "./HomePage.css";
import ApiCall from "../../Components/ApiCall";
import AppBar from "../../Components/Menu/AppBar";
import Footer from "../../Components/Footer/Footer";
import Logo from "../../../public/vite.svg";
import DailyView from "../../Components/DailyView/DailyView";
import MovingAverageView from "../../Components/MovingAverageView/Moving AverageView";

export default function HomePage() {
  return (
    <>
      <nav className="navbar">
        <div>
          <a className="Logo" href="/Home">
            FS
          </a>
          <a href="/About-us">About Us</a>
          <a href="/learn-stocks">Learn Stocks</a>
        </div>
        <a className="login-button" href="Login">
          My Account
        </a>
      </nav>
      <div className="home-page">
        <div className="left-container">
          <h1>Unlock Future Stock Performance</h1>
          <p>
            We help you predict what your future stocks will look like by using
            prediction models and various other technologies, helping you make
            better decisions.
          </p>
        </div>
        {/* <DailyView />
        <MovingAverageView /> */}
      </div>
      {/* <Footer /> */}
    </>
  );
}
