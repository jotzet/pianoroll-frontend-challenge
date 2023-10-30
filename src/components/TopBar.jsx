import React from "react";
import whiteSvg from "../assets/white.svg";
import "./components.css";

const TopBar = () => {
  return (
    <nav className="top-bar">
      <div className="logo-container">
        <a href="*">
          <img src={whiteSvg} alt="Logo" />
        </a>
      </div>
    </nav>
  );
};
export default TopBar;
