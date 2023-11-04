import LoadButton from "../components/LoadButton";
import TopBar from "../components/TopBar";
import "../styles/mainstyle.css";

function HomeView() {
  return (
    <>
      <TopBar />
      <h1>Welcome to PianoRoll frontend coding challenge!</h1>
      <a href="/pianorolls">
        <LoadButton buttonText={"Load Piano Rolls!"} />
      </a>
    </>
  );
}

export default HomeView;
