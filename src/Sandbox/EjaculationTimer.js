import React, { useState } from 'react';
import moment from 'moment'
import DatabaseAxios from './DatabaseAxios';
import axios from "axios";


export class EjaculationTimer extends React.Component {
  constructor(props) {
    super(props);
    axios.get('http://willthisdofor.art/api/getTime.php').then((response) => {
      let time = JSON.stringify(response.data)
      time = time.replace("GMT 0200", "GMT+0200")
      this.setState( {lastTime: time})
    });

    this.state = { 
      lastTime: "2021-10-26 10:06",
      reload: 'idkz whatever'
    };

  }

  getTimePassed() {
    var nowMoment = moment(new Date()); //todays date
    var last = this.state.lastTime; // another date
    var d = moment.duration(nowMoment.diff(last));

    var timePassed = d.days() + ' days ' 
                    + d.hours() + ' hours ' 
                    + d.minutes() + ' minutes ' 
                    + d.seconds() + ' seconds'
                    
    return timePassed
  }

  incrementSeconds() {
    this.setState((prevState, props) => ({
      time: prevState.time + 1  
    }))
  }

  reset() {
    const newTime = new Date()
    fetch('http://willthisdofor.art/api/saveTime.php?time=' + newTime)
    this.setState( {lastTime: newTime})

    // I don't think there's a need for that here, right?
    // axios.get('http://willthisdofor.art/api/getTime.php').then((response) => {
    //   let time = JSON.stringify(response.data)
    //   time = time.replace("GMT 0200", "GMT+0200")

    //   this.setState( {lastTime: time})
    // });
  }

  dontRefersh(e) {
      e.preventDefault();
  }

  setTime(){
    const newTime = moment(new Date())
    var timeFromWtdfa;
    fetch('http://willthisdofor.art/api/setTime.php?time=' + newTime, {
    })
      .then(res => res.json())
      .then(data => timeFromWtdfa = data)
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
