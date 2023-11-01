import React from "react";
import PianoRoll from "./PianoRoll";

class MainPianoRoll extends PianoRoll {
  constructor(props) {
    super(props);

    this.state = {
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
    this.setState({
      isSelecting: true,
      selectionStart: x,
      selectionEnd: x,
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
      // start should always be less than end
      let newSelectionStart = Math.min(
        this.state.selectionStart,
        this.state.selectionEnd
      );
      let newSelectionEnd = Math.max(
        this.state.selectionStart,
        this.state.selectionEnd
      );

      if (newSelectionStart < 48 || newSelectionStart > 426) {
        newSelectionStart = 48;
      }

      if (newSelectionEnd > 426 || newSelectionEnd < 48) {
        newSelectionEnd = 426;
      }

      this.setState({
        isSelecting: false,
        selectionStart: newSelectionStart,
        selectionEnd: newSelectionEnd,
      });
    }
  };

  render() {
    const { selectionStart, selectionEnd, isSelecting } = this.state;
    const rectX = Math.min(selectionStart, selectionEnd);
    const rectWidth = Math.abs(selectionEnd - selectionStart);

    const selectionStyle = {
      position: "absolute",
      left: `${rectX}px`,
      width: `${rectWidth}px`,
      height: "100%",
      backgroundColor: "rgba(0, 0, 30, 0.3)",
      display: "block",
      caretColor: "transparent",
    };

    const parent = {
      padding: "0",
      margin: "0",
      border: "0",
      position: "relative",
      backgroundColor: this.backgroundColor,
    };

    return (
      <>
        <div
          id="T"
          style={parent}
          ref={(container) => {
            this.svgContainer = container;
          }}
        >
          {this.svgElement && <div style={selectionStyle}></div>}
        </div>
      </>
    );
  }
}

export default MainPianoRoll;
