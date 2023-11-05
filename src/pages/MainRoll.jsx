import TopBar from "../components/TopBar";
import { getItemsFromData } from "../utils/storage";
import { useParams } from "react-router-dom";
import PianoRoll from "../components/PianoRoll";
import MainPianoRoll from "../components/MainPianoRoll";
import "../styles/mainstyle.css";

function MainRollView() {
  const { rollId } = useParams();
  const partData = getItemsFromData(20);

  // Check if rollId is a valid number and within the range of available data
  const isValidRollId =
    !isNaN(rollId) && rollId >= 0 && rollId < partData.length;

  return (
    <>
      <TopBar />
      <div className="two-columns-container">
        <div className="main-roll">
          {isValidRollId ? (
            <>
              This is a piano roll number {rollId}
              <MainPianoRoll sequence={partData[rollId]} />
            </>
          ) : (
            <h1>Roll number {rollId} doesn't exist</h1>
          )}
          {/* This is a piano roll number {rollId}
          <MainPianoRoll sequence={partData[rollId]} /> */}
        </div>

        <div className="scrollable-rolls">
          {partData.map((partData, index) =>
            index !== Number(rollId) ? (
              <div key={index}>
                This is a piano roll number {index}
                <a href={`/pianorolls/${index}`}>
                  <PianoRoll sequence={partData} />
                </a>
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default MainRollView;
