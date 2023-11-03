import "../styles/components.css";
import { deleteDataFromFile } from "../utils/storage";

const LoadButton = ({ buttonText }) => {
  return (
    <div className="buttonContainer">
      <button
        className="load-button"
        onClick={() => {
          deleteDataFromFile();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default LoadButton;
