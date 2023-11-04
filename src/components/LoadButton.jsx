import "../styles/mainstyle.css";
import { deleteDataFromFile } from "../utils/storage";

const LoadButton = ({ buttonText, buttonColor, onClick }) => {
  const buttonStyle = {
    backgroundColor: buttonColor || "#944038",
  };

  return (
    <div className="button-container">
      <button
        className="load-button"
        style={buttonStyle}
        onClick={() => {
          if (onClick) {
            onClick();
          } else {
            deleteDataFromFile();
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default LoadButton;
