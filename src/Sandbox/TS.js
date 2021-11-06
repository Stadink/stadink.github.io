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
            <h3>Week #2 Belief or experience?</h3>
            <button onClick={ () => this.printLesson() }>TS</button>
        </div>
    );
  }
}
