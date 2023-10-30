import "./components.css";

const LoadButton = ({ buttonText }) => {
  return (
    <div className="buttonContainer">
      <button>{buttonText}</button>
    </div>
  );
};

export default LoadButton;
