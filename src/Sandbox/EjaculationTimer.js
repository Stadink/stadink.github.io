import React, { useState } from 'react';
import moment from 'moment'


export class EjaculationTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0 };
  }

 sukaBlyat() {
  var now = moment(new Date()); //todays date
  var end = moment("2021-10-23 15:01"); // another date
  var duration = moment.duration(now.diff(end));
  var seconds = duration.asSeconds();

  var minutes = Math.trunc(seconds/(60))
  var hours = Math.trunc(seconds/(60*60))
  var days = Math.trunc(seconds/(60*60*24))

  var timePassed = 'Days: ' + days + ' hours: ' + hours + ' minutes: ' + minutes 

  return timePassed
 }

  getTimePassed(lastTime){
    const total = Date.parse(new Date()) - Date.parse(lastTime);
    const days = Math.floor( total/(1000*60*60*24) );
    return days
}

  incrementSeconds() {
    this.setState((prevState, props) => ({
      time: prevState.time + 1  
    }))
  }

  reset() {
    this.setState({
      time: 0
    })
  }

  render() {
    return (
        <div id="ejaculationTimer">
            Time since last 💦: {this.state.time} <br/>
            <button onClick={() => this.reset()}>Reset</button>
            {/* Days passed #{ this.getTimePassed('October 18, 2021 15:19:40 GMT+01:00') } */}
            {this.sukaBlyat()}
        </div>
    );
  }
  componentDidMount() {
    // Paste your code here.
    const oneSecond = 1000;
    setInterval(() => {
      this.incrementSeconds()
    }, oneSecond);
  }
}
