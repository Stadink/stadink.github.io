import React from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';

export class ConsciousnessRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      comment: '',
      allNumbers: this.getAllNumbers(),
    };
    this.updateValue = this.updateValue.bind(this);
    this.getAverage();
  }

  updateValue() {
    var slider = document.getElementById("myRange");
    this.setState({value: slider.value});
  }

  async getAllNumbers() {
    const docRef = doc(db, 'ConsciousnessRating', 'Log')
    const docSnapshot = await getDoc(docRef)
    const all = docSnapshot.data();

    console.log('GetAllNumbers is: ' + JSON.stringify(all['History']))

    this.setState({ allNumbers: all['History'] })

    this.getAverage()
  }

  getAverage() {
    const all = this.state.allNumbers;
    let sum = 0;

    for(let i = 1; i <+ 10; i++) {
      sum += parseInt(all[all.length - i])
    }

    const average = Math.round(sum / 10);
    this.setState({value: average})
  }

  async saveToDb() {
    let comment = prompt(`Why ${this.state.value} tho?`, 'Well...');
    if (comment != null) {
      this.setState({comment: comment});

      const day = document.querySelector('#DayNum').textContent;
      const minute = document.querySelector('#minuteNumber').textContent;
      const rating = this.state.value;

      const consciousnessTimestamp = `${day}-${minute}-${rating}`
      const docRef = doc(db, 'ConsciousnessRating', 'All')
      const docRefLog = doc(db, 'ConsciousnessRating', 'Log')

      let payloadHistory = {History: arrayUnion(rating)};

      let obj = {};
      obj[consciousnessTimestamp] = comment;

      let payload = obj;
      await updateDoc(docRef, payload)
      await updateDoc(docRefLog, payloadHistory)
    }
  }

  handleEvent = async (event) => {
    console.log('handleEvent is: ' + event)
    if (event.type === "onpointerdown") {
           this.setState({ message: "Mouse Down"});
       } else {
           this.setState({ message: "Mouse Up"});
           await this.saveToDb();
       }
   };

  render() {
    return (
        <div id="consciousnessRating">
          <div class="slidecontainer"> <br/>
            <input onPointerUp={ this.handleEvent } onChange={this.updateValue} id="myRange" type="range" min="20" max="1000" value={this.state.value} class="slider" />
              <details>
                <summary><p>Consciousness rating: <span id="demo">{this.state.value} </span>  </p></summary>
                <img src='https://willthisdofor.art/ConsciousnessRating.png'/>
              </details>
          </div>
        </div>
    );
  }
}
