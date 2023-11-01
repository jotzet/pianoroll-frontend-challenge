import TopBar from "../components/TopBar";
import { getItemsFromData } from "../utils/storage";
import { useParams } from "react-router-dom";
import PianoRoll from "../components/PianoRoll";
import MainPianoRoll from "../components/MainPianoRoll";
import "./views.css";

function MainRollView() {
  const { rollId } = useParams();
  const partData = getItemsFromData(20);

  return (
    <>
      <TopBar />
      <div className="two-columns-container">
        <div className="main-roll">
          This is a piano roll number {rollId}
          <MainPianoRoll sequence={partData[rollId]} svgClassName="svg-main" />
        </div>

        <div className="scrollable-rolls">
          {partData.map((partData, index) =>
            index !== Number(rollId) ? (
              <div key={index}>
                This is a piano roll number {index}
                <a href={`/pianorolls/${index}`}>
                  <PianoRoll sequence={partData} svgClassName="svg-plain" />
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
