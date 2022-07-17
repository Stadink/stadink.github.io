import React from 'react';
import { useEffect } from 'react';

export class ClockMinutes extends React.Component {
  getTotalMinutes() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
  }

  constructor(props) {
    super(props);
    this.state = { date: this.getTotalMinutes() };
  }
  render() {
    return <div><br/>{this.state.date}</div>;
  }
  componentDidMount() {
    // Paste your code here.
    const oneSecond = 1000;
    setInterval(() => {
      this.setState({ date: this.getTotalMinutes() });
      if(document.hidden) 
        document.title = 'Get back here mofo'
      else 
        document.title = this.state.date
    }, oneSecond);
  }
}
