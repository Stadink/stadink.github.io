import React from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';

export class ConsciousnessRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      comment: '',
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    this.setState({value: slider.value});
  }

  getLastTenAverage() {
    // !!!
  }

  setAverage() {
    // get all ratings
    // get last 10
    // average
    // extract last part
    // return
  }

  async saveToDb() {
    let comment = prompt(`Why ${this.state.value} tho?`, 'Well...');
    this.setState({comment: comment});

    const day = document.querySelector('#DayNum').textContent;
    const minute = document.querySelector('#minuteNumber').textContent;
    const rating = this.state.value;

    const consciousnessTimestamp = `${day}-${minute}-${rating}`
    const docRef = doc(db, 'ConsciousnessRating', 'All')

    let obj = {};
    obj[consciousnessTimestamp] = comment;

    let payload = obj;
    await updateDoc(docRef, payload)
  }

  render() {
    return (
        <div id="consciousnessRating">
          <div class="slidecontainer"> <br/>
            <input onChange={this.updateValue} id="myRange" type="range" min="20" max="1000" value={this.state.value} class="slider" />

              <details>
                <summary><p>Consciousness rating: <span id="demo">{this.state.value} </span> <button class="button1" onClick={ () => { this.saveToDb() }}>+</button> </p></summary>
                <img src='https://willthisdofor.art/ConsciousnessRating.png'/>
              </details>

          </div>
        </div>
    );
  }

  componentDidMount() {

  }
}
