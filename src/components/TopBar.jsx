import React, { useState } from "react";
import whiteSvg from "../assets/white.svg";
import HowToIcon from "../assets/howto.png";
import "../styles/mainstyle.css";

const TopBar = () => {
  return (
    <>
      <nav className="top-bar">
        <div className="logo-container">
          <a href="/">
            <img src={whiteSvg} alt="Logo" />
          </a>
        </div>

        <a href="/manual">
          <img src={HowToIcon} alt="How to use this website" width={"30px"} />
        </a>
      </nav>
    </>
  );
};
export default TopBar;
