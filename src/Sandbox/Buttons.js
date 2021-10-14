import React from 'react';


export class Buttons extends React.Component {
  render() {
    return (
        <div id="answerButtons">
          <button onClick={this.setRandomNum} id="artButton" class="button button1">Art</button>
          <button id="notArtButton" class="button button2">Not Art</button>
        </div>
    );
  }
}
