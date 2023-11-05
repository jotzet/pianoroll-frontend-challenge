import React, { useEffect, useState } from "react";
import PianoRoll from "../components/PianoRoll";
import {
  saveDataToFile,
  getItemsFromData,
  isDataInStorage,
} from "../utils/storage";
import TopBar from "../components/TopBar";
import loader from "../assets/loader.gif";
import "../styles/mainstyle.css";

function AllRollsView() {
  const [pdata, setPdata] = useState(null);

  useEffect(() => {
    async function loadData() {
      let partDataArray = [];

      if (isDataInStorage()) {
        partDataArray = getItemsFromData(21);
      } else {
        try {
          const response = await fetch("https://pianoroll.ai/random_notes");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const responseData = await response.json();
          saveDataToFile(responseData);
          partDataArray = getItemsFromData(20);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }

      setPdata(partDataArray);
    }

    loadData();
  }, []);

  return (
    <div>
      <TopBar />
      {pdata ? (
        <div className="piano-rolls-container">
          {pdata.map((partData, index) => (
            <div key={index} className="piano-roll-card">
              This is a piano roll number {index}
              <a href={`/pianorolls/${index}`}>
                <PianoRoll sequence={partData} />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <img src={loader} alt="Loading" />
      )}
    </div>
  );
}

export default AllRollsView;
