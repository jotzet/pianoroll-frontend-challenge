import React from "react";
import PianoRoll from "./PianoRoll";
import CloseIcon from "../assets/closeicon.png";
import LoadButton from "./LoadButton";

class MainPianoRoll extends PianoRoll {
  constructor(props) {
    super(props);

    this.state = {
      clicksNumber: 0, //how many times has user clicked on the roll
      isSelecting: false, // is user currently using the selection tool?
      selectionStart: 0, // start of selection coordinates
      selectionEnd: 0, // end of selection coordinates
      containerWidth: 0, // variable to store the dimensions of a roll
    };
    this.handleResize = this.handleResize.bind(this);
  }

  //the selection should properly adjust in case of an resize
  handleResize() {
    if (this.svgContainer) {
      const newSize = this.svgContainer.getBoundingClientRect().width;
      const scaleFactor = newSize / this.state.containerWidth;
      this.setState({
        selectionStart: this.state.selectionStart * scaleFactor,
        selectionEnd: this.state.selectionEnd * scaleFactor,
        containerWidth: newSize,
      });
    }
  }

  /*
  this function logs all the selected notes as well as the total number of them;
  if the note begins before (or ends after) the selection, it is cut;
  for the details check the cutPianoRollData() function in the PianoRoll component
  */
  cutMainRollData = () => {
    if (this.svgContainer) {
      const containerWidth = this.svgContainer.getBoundingClientRect().width;
      const roundedStartDimension =
        Math.floor((this.state.selectionStart / containerWidth) * 1000) / 1000;
      const roundedEndDimension =
        Math.ceil((this.state.selectionEnd / containerWidth) * 1000) / 1000;

      const selectedData = this.cutPianoRollData(
        roundedStartDimension,
        roundedEndDimension
      );
      console.log(`the selected data: ${JSON.stringify(selectedData)}`);
      console.log(`number of notes: ${selectedData.length}`);
    }
  };

  componentDidMount() {
    try {
      this.drawPianoRoll(this.props.sequence);
    } catch (error) {
      console.error("An error occurred in componentDidMount:", error);
    }
    if (this.svgContainer) {
      this.svgContainer.addEventListener("mousedown", this.handleMouseDown);
      this.svgContainer.addEventListener("mousemove", this.handleMouseMove);
      this.svgContainer.addEventListener("mouseup", this.handleMouseUp);
      this.setState({
        containerWidth: this.svgContainer.getBoundingClientRect().width,
      });
      window.addEventListener("resize", this.handleResize);
    }
  }

  componentWillUnmount() {
    if (this.svgContainer) {
      this.svgContainer.removeEventListener("mousedown", this.handleMouseDown);
      this.svgContainer.removeEventListener("mousemove", this.handleMouseMove);
      this.svgContainer.removeEventListener("mouseup", this.handleMouseUp);
      window.removeEventListener("resize", this.handleResize);
    }
  }

  handleMouseDown = (event) => {
    const x = event.clientX - this.svgContainer.getBoundingClientRect().left;
    if (this.state.clicksNumber === 0) {
      this.setState({
        clicksNumber: 1,
        isSelecting: true,
        selectionStart: x,
        selectionEnd: x,
      });
    } else if (this.state.clicksNumber === 1) {
      this.setState({
        selectionEnd: x,
        clicksNumber: 2,
        isSelecting: false,
      });
    } else {
      this.setState({
        clicksNumber: 0,
      });
    }
  };

  handleCloseClick = () => {
    this.setState({
      isSelecting: false,
      selectionStart: 0,
      selectionEnd: 0,
    });
  };

  handleMouseMove = (event) => {
    if (this.state.isSelecting) {
      const x = event.clientX - this.svgContainer.getBoundingClientRect().left;
      this.setState({
        selectionEnd: x,
      });
    }
  };

  handleMouseUp = () => {
    if (this.state.isSelecting) {
      // start coords should always be before the end coords
      let newSelectionStart = Math.min(
        this.state.selectionStart,
        this.state.selectionEnd
      );
      let newSelectionEnd = Math.max(
        this.state.selectionStart,
        this.state.selectionEnd
      );

      this.setState({
        selectionStart: newSelectionStart,
        selectionEnd: newSelectionEnd,
      });
    }
  };

  render() {
    const { selectionStart, selectionEnd } = this.state;
    const rectX = Math.min(selectionStart, selectionEnd);
    const rectWidth = Math.abs(selectionEnd - selectionStart);

    const selectionStyle = {
      "--rectX": `${rectX}px`,
      "--rectWidth": `${rectWidth}px`,
    };

    const closeSelectionStyle = {
      "--position": `${rectX + rectWidth}px`,
    };

    const startCoordStyle = {
      "--position": `${rectX - 5}px`,
    };

    const endCoordStyle = {
      "--position": `${rectX + rectWidth}px`,
    };

    return (
      <>
        <div
          className="selection-container"
          ref={(container) => {
            this.svgContainer = container;
          }}
        >
          {this.svgElement && (
            <div className="selection" style={selectionStyle}></div>
          )}

          {rectWidth > 0 && (
            <>
              <div className="start-coord" style={startCoordStyle}></div>
              <div className="end-coord" style={endCoordStyle}></div>
              <div
                className="close-selection"
                style={closeSelectionStyle}
                onClick={this.handleCloseClick}
              >
                <img src={CloseIcon} alt="Close" width={"30px"} />
              </div>
            </>
          )}
        </div>
        {this.state.clicksNumber > 1 && (
          <LoadButton
            onClick={this.cutMainRollData}
            buttonText={"Log the selected data"}
          />
        )}
      </>
    );
  }
}

export default MainPianoRoll;
