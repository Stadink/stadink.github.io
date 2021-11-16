import React from 'react';
import { TS } from './TS';


export class Remember extends React.Component {
  render() {
    return (
        <div id="Remember">
            ⭐ Switch to thoughts in English

            <br/><br/>
            What can I do today to be satisfied with this day ending? <br/>
            <input type="checkbox"  /> <a href='https://www.codecademy.com/learn' target="_blank">Codecademy</a> <br/>
            <input type="checkbox"  /> SDS

            <TS />
        </div>
    );
  }
}
