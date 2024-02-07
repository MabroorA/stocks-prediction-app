import "./HomePage.css";
import ApiCall from "../../Components/ApiCall";
import AppBar from "../../Components/Menu/AppBar";
import Footer from "../../Components/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <AppBar />
      <div className="content">
        <h1>Home</h1>
        <p>Todays rising Stock</p>
        <div className="data">
          <ApiCall />
        </div>
        <Footer />
      </div>
      {/* <Footer /> */}
    </>
  );
}
