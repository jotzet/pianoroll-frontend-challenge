import "./components.css";

const LoadButton = ({ buttonText, onClick }) => {
  return (
    <div className="buttonContainer">
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default LoadButton;
