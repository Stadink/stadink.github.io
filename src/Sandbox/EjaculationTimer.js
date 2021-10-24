import React, { useState } from 'react';
import moment from 'moment'
import DatabaseAxios from './DatabaseAxios';
import axios from "axios";


export class EjaculationTimer extends React.Component {
  constructor(props) {
    super(props);
    let timeBackend = 'aaa'
    axios.get('http://localhost:3001/timeSaved').then((response) => {
      console.log(response.data)
      this.setState( {lastTimeBackend: response.data})
      console.log(timeBackend)

    });

    // this.state = { lastTime: "2021-10-23 15:00" };
    this.state = { 
      lastTime: "2021-10-23 15:00",
    };

  }

  getTimePassed(lastTime) {
    var now = moment(new Date()); //todays date
    var last = moment(lastTime); // another date
    var d = moment.duration(now.diff(last));

    var timePassed = d.days() + ' days ' 
                    + d.hours() + ' hours ' 
                    + d.minutes() + ' minutes ' 
                    + d.seconds() + ' seconds'

    // let goodTime; ????????
    // d.days() > 0 ? goodTime = d.days() + ' days ' : '' ;
    // d.hours() > 0 ? goodTime = d.hours() + ' hours ' : '' ;

    return timePassed
  }

  incrementSeconds() {
    this.setState((prevState, props) => ({
      time: prevState.time + 1  
    }))
  }

  reset() {
    this.setState({
      lastTime: new Date()
    })
  }

  dontRefersh(e) {
      e.preventDefault();
  }

  setTime(){
    fetch('http://localhost:3001/setTime')
      .then(data => console.log(JSON.stringify(data)));;
  }

  render() {
    return (
        <div id="ejaculationTimer">
            TimeBackend: {this.state.lastTimeBackend}
            Time since last 💦: <br/>  
            {this.getTimePassed(this.state.lastTime)} <br />
            <button onClick={() => this.reset()}>Reset</button>
            {/* <DatabaseAxios /> */}
            <button onClick={ () => this.setTime()}>FETCH</button>
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
