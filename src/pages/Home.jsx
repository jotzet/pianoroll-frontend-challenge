import LoadButton from "../components/LoadButton";
import TopBar from "../components/TopBar";
import { deleteDataFromFile } from "../utils/storage";
import "../styles/mainstyle.css";

function HomeView() {
  return (
    <>
      <TopBar />
      <h1>Welcome to PianoRoll frontend coding challenge!</h1>
      <a href="/pianorolls">
        <LoadButton
          onClick={deleteDataFromFile()}
          buttonText={"Load Piano Rolls!"}
        />
      </a>
    </>
  );
}

export default HomeView;
