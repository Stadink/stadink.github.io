import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from './firebase';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
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

    this.setState( {affirmations: affirmations.List})
    return affirmations.List;
  }
  
  render() {
    return <div><br/>{this.state.date.toLocaleTimeString()}</div>;
  }
  
  componentDidMount() {
    // Paste your code here.
    const oneSecond = 1000;
    setInterval(() => {
      this.setState({ date: new Date() });
      // if(document.hidden) 
      //   document.title = 'Get back here mofo'
      // else 
      //   document.title = this.state.date
    }, oneSecond);
  }
}
