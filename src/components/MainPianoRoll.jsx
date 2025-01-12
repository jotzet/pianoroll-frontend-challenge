import React from "react";
import PianoRoll from "./PianoRoll";
import CloseIcon from "../assets/closeicon.png";
import LoadButton from "./LoadButton";

class MainPianoRoll extends PianoRoll {
  constructor(props) {
    super(props);
    this.state = {
      clicksNumber: 0,
      isSelecting: false,
      selectionStart: 0,
      selectionEnd: 0,
      containerWidth: 0,
      isDraggingStartCoord: false,
      isDraggingEndCoord: false,
      isDraggingSelection: false,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  setSelectionStart(x) {
    if (x < 0)
      this.setState({
        selectionStart: 0,
      });
    else if (x >= this.svgElement.width.animVal.value)
      this.setState({
        selectionStart: this.svgElement.width.animVal.value - 1,
      });
    else
      this.setState({
        selectionStart: x,
      });
  }

  setSelectionEnd(x) {
    if (x < 0)
      this.setState({
        selectionEnd: 0,
      });
    else if (x >= this.svgElement.width.animVal.value)
      this.setState({
        selectionEnd: this.svgElement.width.animVal.value,
      });
    else
      this.setState({
        selectionEnd: x,
      });
  }

  // selection start should always be before the selection end
  verifyCoords() {
    if (this.state.selectionStart > this.state.selectionEnd)
      this.setState({
        selectionStart: this.state.selectionEnd,
        selectionEnd: this.state.selectionStart,
      });
  }

  // the selection should properly adjust in case of an resize
  handleResize() {
    if (this.svgContainer) {
      const newSize = this.svgContainer.getBoundingClientRect().width;
      const scaleFactor = newSize / this.state.containerWidth;
      this.setSelectionStart(this.state.selectionStart * scaleFactor);
      this.setSelectionEnd(this.state.selectionEnd * scaleFactor);
      this.setState({
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

  handleStartCoordMouseDown = (event) => {
    this.setState({ isDraggingStartCoord: true });
  };

  handleEndCoordMouseDown = (event) => {
    this.setState({ isDraggingEndCoord: true });
  };

  handleSelectionMouseDown = (event) => {
    this.setState({ isDraggingSelection: true });
  };

  handleMouseDown = (event) => {
    const x = event.clientX - this.svgContainer.getBoundingClientRect().left;

    if (this.state.clicksNumber === 0) {
      this.setSelectionStart(x);
      this.setSelectionEnd(x);
      this.setState({
        clicksNumber: 1,
        isSelecting: true,
      });
    } else if (this.state.clicksNumber === 1) {
      this.setState({
        selectionEnd: x,
        clicksNumber: 2,
        isSelecting: false,
      });
    }
  };

  handleCloseClick = () => {
    this.setSelectionStart(0);
    this.setSelectionEnd(0);
    this.setState({
      isSelecting: false,
      clicksNumber: 0,
    });
  };

  handleMouseUpDrag = () => {
    this.setState({
      isDraggingStartCoord: false,
      isDraggingEndCoord: false,
    });
  };

  handleMouseMove = (event) => {
    const x = event.clientX - this.svgContainer.getBoundingClientRect().left;
    if (this.state.isDraggingStartCoord) this.setSelectionStart(x);
    else if (this.state.isDraggingEndCoord) this.setSelectionEnd(x);
    else if (this.state.isDraggingSelection) {
      const selectionWidth =
        this.state.selectionEnd - this.state.selectionStart;

      let newStart = x - selectionWidth / 2;

      if (newStart < 0) newStart = 0;

      let newEnd = newStart + selectionWidth;

      if (newEnd > this.svgElement.width.animVal.value) {
        newEnd = this.svgElement.width.animVal.value;
        newStart = newEnd - selectionWidth;
      }

      this.setSelectionStart(newStart);
      this.setSelectionEnd(newEnd);
      this.verifyCoords();
    }

    if (this.state.isSelecting) this.setSelectionEnd(x);
  };

  handleMouseUp = () => {
    if (this.state.isDraggingStartCoord)
      this.setState({
        isDraggingStartCoord: false,
        clicksNumber: 2,
      });

    if (this.state.isDraggingEndCoord)
      this.setState({
        isDraggingEndCoord: false,
        clicksNumber: 2,
      });

    if (this.state.isDraggingSelection)
      this.setState({
        isDraggingSelection: false,
        clicksNumber: 2,
      });

    this.verifyCoords();
  };

  render() {
    const { selectionStart, selectionEnd, isSelecting } = this.state;
    const rectX = Math.min(selectionStart, selectionEnd);
    const rectWidth = Math.abs(selectionEnd - selectionStart);

    const selectionStyle = {
      "--rectX": `${rectX}px`,
      "--rectWidth": `${rectWidth + 2}px`,
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
            <div
              onMouseDown={this.handleSelectionMouseDown}
              className="selection"
              style={selectionStyle}
            ></div>
          )}

          {rectWidth > 0 && !isSelecting && (
            <>
              <div
                onMouseDown={this.handleStartCoordMouseDown}
                className="start-coord"
                style={startCoordStyle}
              ></div>
              <div
                onMouseDown={this.handleEndCoordMouseDown}
                className="end-coord"
                style={endCoordStyle}
              ></div>
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
