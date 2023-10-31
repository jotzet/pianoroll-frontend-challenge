import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PianoRoll from "./PianoRoll";
import {
  saveDataToFile,
  get20itemsFromData,
  isDataInStorage,
} from "../utils/storage";

function PianoRollDisplay() {
  const [pdata, setPdata] = useState(null);

  useEffect(() => {
    async function loadData() {
      let partDataArray = [];

      if (isDataInStorage()) {
        partDataArray = get20itemsFromData();
      } else {
        try {
          const response = await fetch("https://pianoroll.ai/random_notes");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const responseData = await response.json();
          saveDataToFile(responseData);
          partDataArray = get20itemsFromData();
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
      {pdata ? (
        <div className="piano-rolls-container">
          {pdata.map((partData, index) => (
            <Link key={index} to={`/pianorolls/${index}`}>
              <PianoRoll key={index} sequence={partData} />
            </Link>
          ))}
        </div>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default PianoRollDisplay;
