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
import visionBoard from '../img/VisionBoard.png';

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
            <EjaculationTimer />
          </div>
          <div class="Motivation">
            <h4>Remember</h4>
            <Remember />
            <Motivation />
            
            <TS />
          </div>
          <div class="Clock">
            <h2>Let's create</h2>
            <Counter />
            <Notepad />
          </div>
        </div>

        {/* <Buttons /> */}

        <div id="test"></div>
        <hr />
        
        <Pfive />
        <Squares />
        <img src={visionBoard} alt="visionBoard" />
        fuck yes bitches
      </div>
    );
  }
}
