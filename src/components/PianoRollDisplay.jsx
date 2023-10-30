import React, { useEffect, useState } from "react";
import PianoRoll from "./PianoRoll";

function PianoRollDisplay() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadPianoRollData() {
      try {
        const response = await fetch("https://pianoroll.ai/random_notes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadPianoRollData();
  }, []);

  const partDataArray = [];

  for (let it = 0; it < 20; it++) {
    const start = it * 60;
    const end = start + 60;
    const partData = data ? data.slice(start, end) : [];
    partDataArray.push(partData);
  }

  return (
    <div>
      <h1>Piano Roll Data</h1>
      {data ? (
        <ul>
          {partDataArray.map((partData, index) => (
            <PianoRoll key={index} sequence={partData} />
          ))}
        </ul>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default PianoRollDisplay;
