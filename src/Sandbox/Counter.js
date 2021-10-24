import React from 'react';


export class Counter extends React.Component {
    getTimeRemaining(endtime){
        const total = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor( total/(1000*60*60*24) );
        return days
    }
    render() {
        return (
            <div>Day #<u>{ this.getTimeRemaining('May 18, 2045')}</u></div>
        );
  }
}
