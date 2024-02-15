import "./HomePage.css";
import DailyView from "../../Components/DailyView/DailyView";
import MovingAverageView from "../../Components/MovingAverageView/Moving AverageView";
import NavBar from "../../Components/Navbar/NavBar";
import SearchPage from "../SearchStocksPage/SearchPage";
import Search_to_display from "../Ticker-to-display/Search-to-display";
import Searchdisplay from "../Ticker-to-display/Searchdisplay";

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
          <h1 className="title-stock">Rising Stocks this Week</h1>
          <div className="top-stocks">
            <h1>Top 5 Stocks will go here</h1>
            <SearchPage />
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="bottom-left-text-container">
          <h1 className="text-titles">Why Choose Us?</h1>
          <div className="text-lists">
            <li>Proven track record of accurate predictions</li>
            <li>Intuitive and user-friendly platform interface</li>
            <li>Comprehensive analysis incorporating various data sources</li>
            <li>
              Personalized recommendations based on individual investment goals
            </li>
            <li>Responsive and dedicated customer support </li>
          </div>
        </div>
        <div className="bottom-right-text-container">
          <h1 className="text-titles">Informed Decision-Making</h1>
          <div className="text-lists">
            <li>Access to detailed market insights and trends</li>
            <li>Historical performance data for informed comparisons</li>
            <li>Risk analysis tools to evaluate potential outcomes</li>
            <li>Real-time updates on market news and events </li>
            <li>Customizable alerts for timely decision-making</li>
          </div>
        </div>
      </div>
      <div className="Graphs-container">
          <div className="bottom-right-graph-container">
            <DailyView/>
          </div>
          <div className="bottom-right-graph-container">
          {/* <Search_to_display/> */}
          <Searchdisplay/>
          </div>
        </div>
      {/* <Footer /> */}
    </>
  );
}
