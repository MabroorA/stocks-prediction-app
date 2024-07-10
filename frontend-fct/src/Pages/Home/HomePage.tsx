
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
      <div className="flex flex-col justify-center py-32 mx-auto rounded-lg lg:flex-col">
        {/* Landing */}
        <div className="flex flex-col justify-center mx-auto text-center ">
          <div className="text-5xl lg:text-6xl leading-tight font-[Segoe UI] font-bold">

              Unlock Future
            <span className="  bg-clip-text text-transparent bg-gradient-to-r from-[#7fd1b9] to-[#de6e4b] p-2">
              Stock Performance
            </span>
          </div>
          <div className="w-1/2 py-8 mx-auto text-base text-center lg:text-lg">
            We help you predict what your future stocks will look like by using
            prediction models and various other technologies, helping you make
            better decisions.
          </div>
          <div className="flex justify-center ">
          <Link
            to="/predict"
            className=" w-fit p-2 rounded-lg border border-white bg-gradient-to-r from-[#7fd1b9] to-[#de6e4b] text-white text-base lg:text-lg font-medium mt-auto  flex items-center justify-center transition-shadow duration-300 hover:shadow-lg"
          >
            Start Predicting
          </Link>
          </div>
        </div>
        {/* Stocks Button */}
        <div className="flex flex-col justify-center py-8">
          <div className="flex flex-row-reverse justify-between right-container-header">
            <div className="toggle-button-container">
              <button
                className={`toggle-button ${
                  showTop5 ? "top-toggle" : "bottom-toggle"
                } bg-[#7fd1b9] text-white border border-white  py-2 px-5 cursor-pointer text-base lg:text-lg transition-all duration-30 rounded-3xl hover:shadow-lg`}
                onClick={toggleSection}
              >
                {showTop5 ? "Show Bottom 5" : "Show Top 5"}
              </button>
            </div>
            <div>
              <h1 className="text-lg font-bold title-stock lg:text-xl">
                {" "}
                {showTop5 ? "Todays Top 5 Gainers" : "Todays Bottom 5 Losers"}
              </h1>
            </div>
          </div>
          <div className="top-stocks">
            {showTop5 ? <Top_5 /> : <Bottom_5 />}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mx-auto my-10 text-center md:flex-row md:p-2 ">
        <div className="w-full md:w-2/5  my-2 p-2.5 bg-[#7fd1b9] rounded-3xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-bold text-[#FEFDED] mb-5">
            Prediction Using Machine learning{" "}
          </h1>
          <ul className="p-0 list-none ">
            <li className="text-base lg:text-lg text-[#666] mb-2.5 hover:text-[#FEFDED] ">
              Proven track record of accurate predictions
            </li>
            <li className="text-base lg:text-lg text-[#666] mb-2.5 hover:text-[#FEFDED] ">
              Utilizes Long Short-Term Memory (LSTM) Model on live data for
              predicting the next 30 days
            </li>
            <li className="text-base lg:text-lg text-[#666] mb-2.5 hover:text-[#FEFDED] ">
              Continuous model refinement through iterative training and user
              usage
            </li>
            <li className="text-base lg:text-lg text-[#666] mb-2.5 hover:text-[#FEFDED] ">
              Dynamic adaptation to market trends for enhanced predictive
              accuracy
            </li>
          </ul>
        </div>
        {/* Container */}
        <div className=" w-full md:w-2/5 my-2 p-2.5 bg-[#7fd1b9] rounded-3xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-bold text-[#FEFDED] mb-5">
            Informed Decision-Making
          </h1>
          <ul className="p-0 list-none ">
            <li className="text-base lg:text-lg text-[#666] mb-2.5 hover:text-[#FEFDED] ">
              Access to detailed market insights and trends
            </li>
            <li className="text-base lg:text-lg text-[#666] mb-2.5 hover:text-[#FEFDED] ">
              Historical performance data for informed comparisons
            </li>
            <li className="text-base lg:text-lg text-[#666] mb-2.5 hover:text-[#FEFDED] ">
              Real-time updates on market news and events
            </li>
            <li className="text-base lg:text-lg text-[#666] mb-2.5 hover:text-[#FEFDED] ">
              Customizable graphs for timely decision-making
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
