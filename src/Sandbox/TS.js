import React from 'react';
import TSdata from './TS.json';

export class TS extends React.Component {

    printLesson() {
        const day = Math.round(Math.random() * 7)

        const messageToAlert = TSdata[day]

        alert(messageToAlert)
    }

  render() {
    return (
        <div id="TS">
          <button onClick={ () => this.printLesson() }>TS</button>
        </div>
    );
  }
}
