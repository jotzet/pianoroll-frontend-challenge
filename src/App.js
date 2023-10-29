import React, { useState } from "react";
import TopBar from "./components/TopBar";
import "./main.css";
import PianoRollDisplay from "./components/PianoRollDisplay";
import LoadButton from "./components/LoadButton";

function App() {
  const [isDisplayVisible, setDisplayVisible] = useState(false);

  const handleButtonClick = () => {
    setDisplayVisible(!isDisplayVisible);
    console.log(isDisplayVisible);
  };

  return (
    <div className="App">
      <TopBar />
      <h1> Welcome to PianoRoll frontend coding challenge!</h1>

      {!isDisplayVisible && (
        <LoadButton
          buttonText={"Load Piano Rolls!"}
          onClick={handleButtonClick}
        >
          Click Me
        </LoadButton>
      )}

      {isDisplayVisible && <PianoRollDisplay />}
    </div>
  );
}

export default App;
