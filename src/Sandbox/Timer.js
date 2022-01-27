import React from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  getTimeRemaining(){
    const total = Date.parse('May 18, 2045') - Date.parse(new Date());
    // console.log('NEW DATE IS: ' + new Date());
    // console.log('Time left lol: ' + total/(1000*60*60*24));
    // const days = Math.floor( total/(1000*60*60*24) );
    }

    renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
        return <div className="timer">Too lale...</div>;
        }
    
        return (
        <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
        </div>
        );
    };

    getAffirmation() {
        return <div>Я силён</div>
    }

  render() {
    return <div id="affirmationTimer">
            {/* <button>Start</button> 5:00<br/>{this.state.date.toLocaleTimeString()} */}
            <CountdownCircleTimer
                isPlaying
                duration={300}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[10, 6, 3, 0]}
                onComplete={() => ({ shouldRepeat: false, delay: 1 })}
            >
                {/* {renderTime} */}
            { this.getAffirmation() }
            </CountdownCircleTimer>
        </div>;
  }
  componentDidMount() {
    // Paste your code here.
    const oneSecond = 1000;
    setInterval(() => {
      this.setState({ date: new Date() });
    }, oneSecond);
  }
}
