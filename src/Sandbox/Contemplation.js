import React from 'react';
import { useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';


export class Contemplation extends React.Component {
    // set a state
    constructor(props) {
        super(props);
    
        this.state = { 
          question: this.getRandom(),
        };
    }


    // function to randomly return one of the following: 'whoOrWhatAmI' or 'whatIsBeing'
    getRandom() {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
            return 'Who am I? What am I?';
        } else {
            return 'What is Being?';
        }
    }


    async saveIdea(e) {
        e.preventDefault();

        const ideaInput = document.querySelector('#ContemplationInsight');
        const meIdeaItem = ideaInput.value;

        console.log(meIdeaItem)

        const docRef = doc(db, 'Contemplation', 'insights')
        let payload = {};
        if(this.state.question === 'Who am I? What am I?') {
            payload = {whoOrWhatAmI: arrayUnion(meIdeaItem)};
        } else {
            payload = {whatIsBeing: arrayUnion(meIdeaItem)};
        }
        await updateDoc(docRef, payload)

        alert('yeah well, but what is ' + meIdeaItem)

        ideaInput.value = '';
        ideaInput.placeholder = `Saved! But why ${meIdeaItem}?`;

        e.preventDefault();
    }

  render() {
    return (
        <div id="selfEnquiry">
            <form onSubmit={(e) => this.saveIdea(e)}>
                <h1 style={{'margin-bottom': '10px'}}>{this.state.question}</h1>
                <input type="text" id="ContemplationInsight"></input> <br/> <br/> <br/>             
            </form>
        </div>
    );
  }
}
