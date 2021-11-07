import React from 'react';
import TSdata from './TS.json';

export class TS extends React.Component {

    printLesson() {
        const d = new Date();

        const weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        let day = weekday[d.getDay()];
        const messageToAlert = TSdata[day]

        alert(messageToAlert)
    }

    printTask() {
        alert(TSdata['Task'])
    }

  render() {
    return (
        <div id="TS">
            <h3>Week #3 Reactions</h3>
            <button onClick={ () => this.printTask() }>Week Task</button>
            <button onClick={ () => this.printLesson() }>Day Lesson</button>
        </div>
    );
  }
}
