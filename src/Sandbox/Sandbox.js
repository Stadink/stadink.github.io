import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker';
import { Image } from './Image';
import { Buttons } from './Buttons'
import { Chemistry } from './Chemistry';
import { Counter } from './Counter';

export class Sandbox extends React.Component {
  render() {
    return (
      <div id="sandbox">
        <div class="container">
          <div class="Main">
            <ColorPicker />
          </div>
          <div class="Stocks">
            <Image />
          </div>
          <div class="Motivation">
            Motivation
          </div>
          <div class="Clock">
            Let's create
            <Counter />
          </div>
        </div>




        <hr/>

        <br/><br/>

        {/* <Buttons /> */}

        <div id="test"></div>
        <hr />

      </div>
    );
  }
}
