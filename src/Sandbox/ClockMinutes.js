import React from 'react';
import { useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';

export class ClockMinutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: this.getTotalMinutes(), affirmations: ['wtf'] };

    this.getAffirmations = this.getAffirmations.bind(this);
    this.setState( {List: this.getAffirmations()})
  }

  getTotalMinutes() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
  }

  getRandomAffirmation() {
    const affirmations = this.state.affirmations;
    const random = Math.floor(Math.random() * affirmations.length);

    return affirmations[random];
  }

  async getAffirmations() {
    const docRef = doc(db, 'Affirmation', 'Affirmations')

    const docSnapshot = await getDoc(docRef)
    const affirmations = docSnapshot.data();
    console.log('Get list is: ' + JSON.stringify(affirmations.List))

    this.setState( {affirmations: affirmations.List})
    return affirmations.List;
  }

  render() {
    return <div><br/>{this.state.date}</div>;
  }

  componentDidMount() {    
    if(document.hidden) {
      document.title = this.getRandomAffirmation();
      // console.log('affirmations: ' + this.state.affirmations)
    } else {
      document.title = this.state.date
    }
    
    const oneSecond = 1000;
    setInterval(() => {
      this.setState({ date: this.getTotalMinutes() });
    }, oneSecond);
  }
}
