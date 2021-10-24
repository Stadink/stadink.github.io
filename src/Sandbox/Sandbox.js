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
        <hr/>
        Let's create
        <Counter />
        <br/>
        <Image />
        {/* <Buttons /> */}

        <div id="test"></div>
        <ColorPicker />
        <hr />

      </div>
    );
  }
}
