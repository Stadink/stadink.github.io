import React from 'react';
import { useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';
import { Clock } from './Clock';

export class ClockMinutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: this.getTotalMinutes(), affirmations: ['wtf'], affirmation: 'wtffff' };

    this.getAffirmations = this.getAffirmations.bind(this);
    // this.getRandomAffirmation = this.getRandomAffirmation.bind(this);

    this.getAffirmations();
    this.setState( {affirmations: this.getAffirmations() } )
  }

  getTotalMinutes() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
  }

  async getAffirmations() {
    const docRef = doc(db, 'Affirmation', 'Affirmations')

    const docSnapshot = await getDoc(docRef)
    const affirmations = docSnapshot.data();
    console.log('Get list is: ' + JSON.stringify(affirmations.List))

    this.setState({ affirmations: affirmations.List })
    return affirmations.List;
  }

  async getRandomAffirmation() {
    await this.getAffirmations();

    const affirmations = this.state.affirmations;
    const random = Math.floor(Math.random() * affirmations.length);
    console.log('aafirmations.length is ' + affirmations.length)
    const randomAffirmation = affirmations[random]
    // this.setState( {affirmation: affirmations[random]} )
    console.log('randomAffirmation aaaa is ' + randomAffirmation)
    this.setState( {affirmation: randomAffirmation} )
  }


  copyToClipboard() {
    navigator.clipboard.writeText(this.state.date);
  }

  render() {
     return <div><br/>
              <details onClick={()=>this.copyToClipboard()}>
                <summary id='minuteNumber'>{this.state.date}</summary>
                <Clock />
              </details>
          </div> 
  }
  componentDidMount() {    
    this.getRandomAffirmation();

    const oneSecond = 1000;
    setInterval(() => {
      this.setState({ date: this.getTotalMinutes() });

      if(document.hidden) {
        document.title = this.state.affirmation;
        // console.log('affirmations: ' + this.state.affirmations)
      } else {
        document.title = this.state.date
      }
    }, oneSecond);
  }
}
