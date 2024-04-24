import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <a className="Logo" href="/">
          Home
        </a>
        <a href="/analyse">Learn</a>

        <a href="/search">Search Stocks</a>
      </div>
      <div>
        <a href="/predict">Predict</a>
        <a href="/news">News</a>
      </div>
    </nav>
  );
}
