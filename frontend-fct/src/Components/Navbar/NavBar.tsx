import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <a className="Logo" href="/">
          Home
        </a>
        <a href="/analyse">Analyse</a>
        <a href="/search">Search</a>
        <a href="/predict">Predict</a>
      </div>
      <div>
        <a href="/news">News</a>
        <a className="login-button" href="/account">
          My Account
        </a>
      </div>
    </nav>
  );
}
