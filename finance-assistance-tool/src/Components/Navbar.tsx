import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";
import FinStimulate from "../assets/react.svg";
import "./Navbar.css";
function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <MenuIcon />,
    },
    {
      text: "Wallet",
      icon: <WalletIcon />,
    },
    {
      text: "Account",
      icon: <PersonIcon />,
    },
  ];
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo-container">
          <img src={FinStimulate} alt="" />
        </div>
        <div className="navbar-links-container">
          <a href="">Home</a>
          <a href="">Account</a>
          <a href="">Wallet</a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
