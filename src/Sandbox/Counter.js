import React from 'react';


export class Counter extends React.Component {
    getTimeRemaining(endtime){
        const total = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor( total/(1000*60*60*24) );
        return days
    }

    checkboxesCrossed() {
        let checkboxesCrossed = 0;

        if(document.getElementById('Codecademy') !== null) {
            checkboxesCrossed = document.getElementById('Codecademy').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            checkboxesCrossed = document.getElementById('SDS').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            checkboxesCrossed = document.getElementById('Sport').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            checkboxesCrossed = document.getElementById('Obsidian').checked ? checkboxesCrossed+1 : checkboxesCrossed;
        }
        return checkboxesCrossed
    }

    render() {
        return (
            <div>Day #<u>{ this.getTimeRemaining('May 18, 2045')}</u> | PM: {this.checkboxesCrossed()} </div>
        );
  }
    componentDidMount() {
        // Paste your code here.
        const oneSecond = 1000;
        setInterval(() => {
        this.setState({ date: new Date() });
        }, oneSecond);
    }
}
