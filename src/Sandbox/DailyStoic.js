import React from 'react';
import DS from './DailyStoic.json'

export class DailyStoic extends React.Component {
  getDayOfYear(date = new Date()) {
    const timestamp1 = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);
  
    const differenceInMilliseconds = timestamp1 - timestamp2;
  
    const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;
  
    return differenceInDays - 1;
  }
  render() {
    return (
        <div id="dailyStoic" style={{'border' : '1px solid white'}}>
          <h3><a href='https://drive.google.com/file/d/1bSVYqgLkd8sqTTOELpLv4nE9XMvQ1TKz/view' target="_blank">{DS[this.getDayOfYear()].lesson}</a></h3>          
          
          <details>
            <summary>{DS[this.getDayOfYear()].quote}</summary>
            <br/>
            {DS[this.getDayOfYear()].chapter}
          </details>

          <br/><br/>
        </div>
    );
  }
}
