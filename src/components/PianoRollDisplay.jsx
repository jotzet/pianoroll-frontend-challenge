import React, { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Piano Roll Data</h1>
      {data ? (
        <ul>
          {data.slice(0, 2).map((note, index) => (
            <li key={index}>
              Pitch: {note.pitch}, Duration: {note.duration}, start:{note.start}
              , end:{note.end} velocity:{note.velocity}
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default PianoRollDisplay;
