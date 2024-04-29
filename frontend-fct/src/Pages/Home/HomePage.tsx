import "./HomePage.css";
import NavBar from "../../Components/Navbar/NavBar";
import Bottom_5 from "../../Components/Bottom-5/Bottom_5";
import Top_5 from "../../Components/Top-5/Top_5";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function HomePage() {

  const [showTop5, setShowTop5] = useState(true);

  const toggleSection = () => {
    setShowTop5(!showTop5);
  };
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

          <Link to="/predict" className="predict-button">
            Start Predicting
          </Link>
        </div>
        <div className="right-container">
          <div className="right-container-header">
            <div className="toggle-button-container">
              <button
                className={`toggle-button ${
                  showTop5 ? "top-toggle" : "bottom-toggle"
                }`}
                onClick={toggleSection}
              >
                {showTop5 ? "Show Bottom 5" : "Show Top 5"}
              </button>
            </div>
            <div>
              <h1 className="title-stock">
                {showTop5 ? "Top 5 Gainers" : "Bottom 5 Losers"}
              </h1>
            </div>
          </div>
          <div className="top-stocks">
            {showTop5 ? <Top_5 /> : <Bottom_5 />}
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="bottom-left-text-container">
          <h1 className="text-titles">Prediction Using Machine learning </h1>
          <div className="text-lists">
            <li>Proven track record of accurate predictions</li>
            <li>Utilizes Long Short-Term Memory (LSTM) Model on live data for predicting the next 30 days</li>
            <li>Continuous model refinement through iterative training and user usage </li>
            <li>Dynamic adaptation to market trends for enhanced predictive accuracy</li>
            
            
          </div>
        </div>
        <div className="bottom-right-text-container">
          <h1 className="text-titles">Informed Decision-Making</h1>
          <div className="text-lists">
            <li>Access to detailed market insights and trends</li>
            <li>Historical performance data for informed comparisons</li>
            <li>Real-time updates on market news and events</li>
            <li>Customizable graphs for timely decision-making</li>
          </div>
        </div>
      </div>
    </>
  );
}
