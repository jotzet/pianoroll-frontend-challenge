import React from "react";
import PianoRoll from "./PianoRoll";

class MainPianoRoll extends PianoRoll {
  constructor(props) {
    super(props);

    this.state = {
      clicksNumber: 0,
      isSelecting: false, // is user currently using the selection tool?
      selectionStart: 0, // start of selection coordinates
      selectionEnd: 0, // end of selection coordinates
    };
  }

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
    }
  }

  componentWillUnmount() {
    if (this.svgContainer) {
      this.svgContainer.removeEventListener("mousedown", this.handleMouseDown);
      this.svgContainer.removeEventListener("mousemove", this.handleMouseMove);
      this.svgContainer.removeEventListener("mouseup", this.handleMouseUp);
    }
  }

  handleMouseDown = (event) => {
    const x = event.clientX - this.svgContainer.getBoundingClientRect().left;
    console.log(this.state);
    if (this.state.clicksNumber === 0) {
      this.setState({
        clicksNumber: 1,
        isSelecting: true,
        selectionStart: x,
        selectionEnd: x,
      });
    } else {
      this.setState({
        selectionEnd: x,
        clicksNumber: 0,
        isSelecting: false,
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
      // start coords should always be less than end coords
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
    const { selectionStart, selectionEnd, isSelecting } = this.state;
    const rectX = Math.min(selectionStart, selectionEnd);
    const rectWidth = Math.abs(selectionEnd - selectionStart);

    const closeSelectionStyle = {
      "--close-selection-position": `${rectX + rectWidth}px`,
    };

    const selectionStyle = {
      "--rectX": `${rectX}px`,
      "--rectWidth": `${rectWidth}px`,
    };

    const endCoordStyle = {
      "--end-coord-position": `${rectX - 10}px`,
    };

    const startCoordStyle = {
      "--start-coord-position": `${rectX + rectWidth}px`,
    };

    return (
      /*
      TODO:
      1. Start coord should appear on the 1st click
      then the end coord should be draggable as soon as the 2nd click happens

      2. Each secondary roll should have consistent size on every screen

      3. Capture selection data

      4. Better style for selection
      
      */
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
                X
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default MainPianoRoll;
