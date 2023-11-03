import React from "react";
import PianoRoll from "./PianoRoll";
import CloseIcon from "@mui/icons-material/Close";

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

  cutMainRollData = () => {
    if (this.svgContainer) {
      const containerWidth = this.svgContainer.getBoundingClientRect().width;
      const roundedStartDimension =
        Math.floor((this.state.selectionStart / containerWidth) * 1000) / 1000;
      const roundedEndDimension =
        Math.ceil((this.state.selectionEnd / containerWidth) * 1000) / 1000;

      console.log(`cutty = ${roundedStartDimension},${roundedEndDimension}`);
      this.cutPianoRollData(roundedStartDimension, roundedEndDimension);
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
                <CloseIcon />
              </div>
            </>
          )}
        </div>
        {rectWidth > 0 && <button onClick={this.cutMainRollData}>CUT</button>}
      </>
    );
  }
}

export default MainPianoRoll;
