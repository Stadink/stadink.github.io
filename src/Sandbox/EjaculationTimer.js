import React, { useState } from 'react';
import moment from 'moment'
import DatabaseAxios from './DatabaseAxios';
import axios from "axios";


export class EjaculationTimer extends React.Component {
  constructor(props) {
    super(props);
    axios.get('http://willthisdofor.art/api/getTime.php').then((response) => {
      let time = JSON.stringify(response.data)
      time = time.replace("GMT 0100", "GMT+0100")
      this.setState( {lastTime: time})
    });

    this.state = { 
      lastTime: "2021-10-26 10:06",
      reload: 'idkz whatever'
    };
    this.reset = this.reset.bind(this);
  }

  getTimePassed() {
    var nowMoment = moment(new Date()); //todays date
    var last = this.state.lastTime; // another date
    var d = moment.duration(nowMoment.diff(last));

    let days = d.days();
    let hours = d.hours();
    let minutes = d.minutes();
    let seconds = d.seconds();

    var daysPassed = days > 0 ?  days + ' days ' : '';
    var hoursPassed = hours > 0 ?  hours + ' hours ' : '';
    var minutesPassed = minutes > 0 ?  minutes + ' minutes ' : '';
    var secondsPassed = days + hours + minutes === 0 ?  seconds + ' seconds ' : '';

    const timePassed = daysPassed + hoursPassed + minutesPassed + secondsPassed;

    return timePassed
  }

  incrementSeconds() {
    this.setState((prevState, props) => ({
      time: prevState.time + 1  
    }))
  }

  reset() {
    const newTime = new Date()
    let feedback;
    let data = prompt("Jerked off or had sex? How was it? Satisfied or Disappointed? Good use of energy?", '|10');
    if (data != null) {
      feedback = data == "" ? "no comment" : data;

      fetch('http://willthisdofor.art/api/saveTime.php?time=' + newTime +  '&feedback=' + feedback)
      this.setState( {lastTime: newTime})
    }
  }

  render() {
    return (
        <div id="ejaculationTimer">
            Time since last 💦: <br/>
            <div id="timePassed">{this.getTimePassed()}</div>
            <button onClick={() => this.reset()}>Reset</button>
        </div>
    );
  }
  componentDidMount() {
    const oneSecond = 1000;
    setInterval(() => {
      this.incrementSeconds()

    }, oneSecond);
  }
}
