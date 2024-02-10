import "./HomePage.css";
import ApiCall from "../../Components/ApiCall";
import AppBar from "../../Components/Menu/AppBar";
import Footer from "../../Components/Footer/Footer";
import DailyView from "../../Components/DailyView/DailyView";

export default function HomePage() {
  return (
    <>
      <AppBar />
      <div className="home-page">
        <h1>Home</h1>
        <DailyView />
      </div>
      {/* <Footer /> */}
    </>
  );
}
