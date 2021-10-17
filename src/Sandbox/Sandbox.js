import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker';
import { Image } from './Image';
import { Buttons } from './Buttons'
import { Chemistry } from './Chemistry';

export class Sandbox extends React.Component {
  render() {
    return (
      <div id="sandbox">
        <hr/>
        Let's create
        <br/><br/>
        <Image />
        {/* <Buttons /> */}

        <div id="test"></div>
        <ColorPicker />
        <hr />

      </div>
    );
  }
}
