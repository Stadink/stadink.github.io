import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker';
import { Stocks } from './Stocks';
import { Buttons } from './Buttons'
import { Chemistry } from './Chemistry';
import { Counter } from './Counter';
import { Notepad } from './Notepad';
import { Motivation } from './Motivation';
import Pfive from './Pfive';
import Squares from './Squares';
import { EjaculationTimer } from './EjaculationTimer';
import { TS } from './TS';
import { Remember } from './ Remember';
import { VisionBoard } from './Vision Board';
import { RandomIdea } from './RandomIdea';
import  Playground from './Playground';
import Ideas from './Ideas';
import Tarot from '../Tarot/Tarot';
import { Goals } from './Goals';

export class Sandbox extends React.Component {
  render() {
    return (
      <div id="sandbox">
        <div class="container">
          <div class="Main">
            <ColorPicker />
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
            <Goals />
            {/* <RandomIdea /> */}
            <h3>Sexual energy is creative energy.</h3>
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
