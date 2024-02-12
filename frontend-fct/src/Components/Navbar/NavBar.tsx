import React from "react";
import "./Navbar.css";
function NavBar() {
  return (
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
  );
}

export default NavBar;
