import React from 'react';
import { useEffect } from 'react';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  render() {
    return <div><br/>{this.state.date.toLocaleTimeString()}</div>;
  }
  componentDidMount() {
    // Paste your code here.
    const oneSecond = 1000;
    setInterval(() => {
      this.setState({ date: new Date() });
      if(document.hidden) 
        document.title = 'Get back here mofo'
      else 
        document.title = this.state.date
    }, oneSecond);
  }
}
