import TopBar from "../components/TopBar";
import { get20itemsFromData } from "../utils/storage";
import { useParams } from "react-router-dom";
import PianoRoll from "../components/PianoRoll";

function MainRollView() {
  const { rollId } = useParams();
  const partData = get20itemsFromData();

  return (
    <>
      <TopBar />
      <div>Displaying ID: {rollId}</div>
      <PianoRoll sequence={partData[rollId]} />
    </>
  );
}

export default MainRollView;
