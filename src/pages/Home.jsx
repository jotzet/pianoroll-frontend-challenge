import LoadButton from "../components/LoadButton";
import TopBar from "../components/TopBar";
import { deleteDataFromFile } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import "../styles/mainstyle.css";

function HomeView() {
  const navigate = useNavigate();

  const handleClick = () => {
    deleteDataFromFile();
    navigate("/pianorolls");
  };

  return (
    <>
      <TopBar />
      <h1>Welcome to PianoRoll frontend coding challenge!</h1>

      <LoadButton onClick={handleClick} buttonText={"Load Piano Rolls!"} />
    </>
  );
}

export default HomeView;
