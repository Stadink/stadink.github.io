import React, { useState } from 'react';
import moment from 'moment'
import DatabaseAxios from './DatabaseAxios';
import axios from "axios";


export class EjaculationTimer extends React.Component {
  constructor(props) {
    super(props);
    let timeBackend = 'aaa'
    axios.get('http://willthisdofor.art/api.php').then((response) => {
      console.log('Response constructor: ' + JSON.stringify(response.data.time))
      this.setState( {lastTime: response.data.time})
      console.log(timeBackend)

    });

    // this.state = { lastTime: "2021-10-23 15:00" };
    this.state = { 
      lastTime: "2021-10-26 10:06",
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

  // getTimeFromWtdfa() {
  //   fetch('http://willthisdofor.art/api.php', {
  //     method: 'GET',
  //     // mode: 'no-cors',
  //     // body: JSON.stringify(object),
  //     // headers: {
  //     //   // 'Content-Type': 'application/json'
  //     // }
  //   })
  // }

  setTime(){
    var timeFromWtdfa;
    // fetch('http://localhost:3001/setTime')
    // fetch('https://jsonplaceholder.typicode.com/todos/1', {
    // fetch('http://willthisdofor.art/api/no-cors.php?url=asdf', {
    fetch('http://willthisdofor.art/api/getTime.php', {
      method: 'GET',
      // mode: 'no-cors',
      // body: JSON.stringify(object),
      // headers: {
      //   // 'Content-Type': 'application/json'
      // }
    })
      // .then(data => console.log('WTF: ' + JSON.stringify(data)));;
      // .then(response => response.json())
      .then(res => res.json())
      .then(data => timeFromWtdfa = data)
      // .then(json => console.log(JSON.stringify(json)))
      .then(() => console.log('time from WTDFA is: ' + JSON.stringify(timeFromWtdfa)))
      // .then(return json)
      // .reject('Idk something fucked up')
      // .then(json => console.log(json))
      // console.log('time from WTDFA @222222222 is: ' + timeFromWtdfa)
  }

  render() {
    return (
        <div id="ejaculationTimer">
            {/* TimeBackend: {this.state.lastTimeBackend} */}
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
