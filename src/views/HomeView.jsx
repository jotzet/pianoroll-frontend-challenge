import LoadButton from "../components/LoadButton";
import TopBar from "../components/TopBar";

function HomeView() {
  return (
    <>
      <TopBar />
      <h1> Welcome to PianoRoll frontend coding challenge!</h1>
      <a href="/pianorolls">
        <LoadButton buttonText={"LOAD"} />
      </a>
    </>
  );
}

export default HomeView;
