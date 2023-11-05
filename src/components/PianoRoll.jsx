import React, { Component } from "react";
import { generateGradientTable } from "../utils/gradient";

class PianoRoll extends Component {
  constructor(props) {
    super(props);
    this.end = null;

    const backgroundStartColor = { r: 93, g: 181, b: 213 };
    const backgroundEndColor = { r: 21, g: 65, b: 81 };
    this.backgroundColormap = generateGradientTable(
      backgroundStartColor,
      backgroundEndColor,
      128
    );

    const noteStartColor = { r: 66, g: 66, b: 61 };
    const noteEndColor = { r: 28, g: 28, b: 26 };
    this.noteColormap = generateGradientTable(
      noteStartColor,
      noteEndColor,
      128
    );

    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("viewBox", "0 0 1 1");
    svgElement.setAttribute("preserveAspectRatio", "none");
    svgElement.classList.add("svg-card");
    this.svgElement = svgElement;
  }

  cutPianoRollData(x1, x2) {
    const noteRectangles = this.svgElement.querySelectorAll(".note-rectangle");
    const filteredSequence = [];

    noteRectangles.forEach((noteRectangle) => {
      let x = parseFloat(noteRectangle.getAttribute("x"));
      let width = parseFloat(noteRectangle.getAttribute("width"));
      let noteStart = x;
      const noteEnd = x + width;

      if (noteStart >= x2 || noteEnd <= x1) {
        // note is entirely outside the specified range, skip it
      } else {
        if (noteStart < x1) {
          // note starts before the selection, cut it
          noteStart = x1;
          width -= x1 - x;
        }
        if (noteEnd > x2) {
          // note ends after the selection, cut it
          width = x2 - noteStart;
        }

        const pitch = noteRectangle.getAttribute("pitch");
        const velocity = noteRectangle.getAttribute("velocity");

        const existingNote = filteredSequence.find(
          (note) =>
            note.pitch === pitch &&
            note.start === noteStart &&
            note.end === noteEnd &&
            note.velocity === velocity
        );
        if (!existingNote) {
          const note = {
            duration: noteEnd - noteStart,
            end: noteEnd,
            pitch: pitch,
            start: noteStart,
            velocity: velocity,
          };

          filteredSequence.push(note);
        }
      }
    });

    return filteredSequence;
  }

  timeToX(time) {
    return time / this.end;
  }

  componentDidMount() {
    try {
      this.drawPianoRoll(this.props.sequence);
    } catch (error) {
      console.error("An error occurred in componentDidMount:", error);
    }
  }

  drawPianoRoll(sequence) {
    this.start = sequence[0].start;
    this.end = sequence[sequence.length - 1].end - this.start;

    const pitches = sequence.map((note) => {
      return note.pitch;
    });

    let pitch_min = Math.min(...pitches);
    let pitch_max = Math.max(...pitches);
    let pitch_span = pitch_max - pitch_min;

    if (pitch_span < 24) {
      const diff = 24 - pitch_span;
      const low = Math.ceil(diff / 2);
      const high = Math.floor(diff / 2);
      pitch_min -= low;
      pitch_max += high;
    }

    pitch_min -= 3;
    pitch_max += 3;
    pitch_span = pitch_max - pitch_min;
    this.note_height = 1 / pitch_span;
    this.drawEmptyPianoRoll(pitch_min, pitch_max);

    sequence.forEach((note) => {
      const note_rectangle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );

      const x = this.timeToX(note.start - this.start);
      const w = this.timeToX(note.end - note.start);

      note_rectangle.setAttribute("x", `${x}`);
      note_rectangle.setAttribute("width", `${w}`);

      const y = 1 - (note.pitch - pitch_min) / pitch_span;

      note_rectangle.setAttribute("y", `${y}`);
      note_rectangle.setAttribute("height", `${this.note_height}`);

      const color = this.noteColormap[note.velocity];
      note_rectangle.setAttribute("velocity", note.velocity);
      note_rectangle.setAttribute("pitch", note.pitch);
      note_rectangle.setAttribute("fill", color);
      note_rectangle.classList.add("note-rectangle");

      this.svgElement.appendChild(note_rectangle);
    });

    this.svgContainer.appendChild(this.svgElement);
  }

  drawEmptyPianoRoll(pitch_min, pitch_max) {
    const pitch_span = pitch_max - pitch_min;
    for (let it = pitch_min; it <= pitch_max + 1; it++) {
      if ([1, 3, 6, 8, 10].includes(it % 12)) {
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        const y = 1 - (it - pitch_min) / pitch_span;
        const x = 0;
        const h = 1 / pitch_span;
        const w = 1;
        rect.setAttribute("fill", this.backgroundColormap[12]);
        rect.setAttribute("fill-opacity", "0.666");
        rect.setAttribute("x", `${x}`);
        rect.setAttribute("y", `${y}`);
        rect.setAttribute("width", `${w}`);
        rect.setAttribute("height", `${h}`);
        this.svgElement.appendChild(rect);
      }

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      const y = 1 - (it - pitch_min) / pitch_span + 1 / pitch_span;
      line.setAttribute("x1", "0");
      line.setAttribute("y1", `${y}`);
      line.setAttribute("x2", "2");
      line.setAttribute("y2", `${y}`);
      let line_width;

      if (it % 12 === 0) {
        line_width = 0.003;
      } else {
        line_width = 0.001;
      }
      line.setAttribute("stroke-width", `${line_width}`);
      line.setAttribute("stroke", "black");
      this.svgElement.appendChild(line);
    }
  }

  render() {
    return (
      <div
        className="svg-parent-div"
        ref={(container) => {
          this.svgContainer = container;
          if (container) {
            container.style.width = "100%";
            container.style.height = "100%";
          }
        }}
      ></div>
    );
  }
}
export default PianoRoll;
