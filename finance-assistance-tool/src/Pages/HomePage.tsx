import Slider from "../Components/Slider";
import AppBar from "../Components/AppBar";
import SearchAppBar from "../Components/AppBar";
import "./HomePage.css";
import ApiCall from "../Components/ApiCall";
export default function HomePage() {
  return (
    <>
      <AppBar />
      <div className="content">
        <h1>Home</h1>
        <p>Todays rising Stock</p>
        <ApiCall />
      </div>
    </>
  );
}
