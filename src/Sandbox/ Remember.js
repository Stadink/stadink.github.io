import React from 'react';
import { TS } from './TS';
import TranscendingSelf from './TranscendingSelf';
import Ideas from './Ideas';


export class Remember extends React.Component {
  render() {
    return (
        <div id="Remember">
          <details open>
            <summary>Important</summary>
              💯% <br/>
              ⭐ Switch to thoughts in English

              <br/><br/>
              What can I do today to be satisfied with this day ending? <br/>
              <input id='Codecademy' type="checkbox"  /> <a href='https://www.codecademy.com/learn' target="_blank">Codecademy</a> <br/>
              <input id='SDS' type="checkbox"  /> SDS <br/>
              <input id='Sport' type="checkbox"  /> Sport <br/>
              <input id='Obsidian' type="checkbox"  /> 10 mins of random Obsidian <br/>
            </details> <br />
            {/* <TS /> */}
            <TranscendingSelf />
            <Ideas />
        </div>
    );
  }
}
