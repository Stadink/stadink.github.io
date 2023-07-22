import React from "react";
import { Stocks } from "./Stocks";
import { Counter } from "./Counter";
import { Notepad } from "./Notepad";
import { Motivation } from "./Motivation";
import { EjaculationTimer } from "./EjaculationTimer";
import { Remember } from "./ Remember";
import { VisionBoard } from "./Vision Board";
import { Goals } from "./Goals";
import ToDoList from './Todolist';

export class Sandbox extends React.Component {
  render() {
    return (
      <div id="sandbox">
        <div class="container">
          <div class="Main">
            {/* <ColorPicker /> */}
          </div>
          <div class="Stocks">
            <Stocks />
            <br />
          </div>
          <div class="Motivation">
            <h1>Remember</h1>
            <VisionBoard />
            <Remember />
          </div>
          <div class="Clock">
            <h2>Let's create</h2>
            <Counter />
            <Notepad />

            <Motivation />
            <ToDoList />
            <Goals />
            {/* <RandomIdea /> */}
            <h3>🔋 Sexual energy is creative energy 🪫</h3>
            <h4>No JO till ENB</h4>
            <EjaculationTimer />
          </div>
        </div>

        {/* <Buttons /> */}

        <div id="test"></div>
        <hr />

        {/* <Pfive />
        <Squares /> */}
        {/* <Tarot /> */}
      </div>
    );
  }
}
