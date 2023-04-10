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

        this.getRandom = this.getRandom.bind(this);
    }


    // function to randomly set one of the following: 'whoOrWhatAmI' or 'whatIsBeing' as the state.question and return it
    getRandom() {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
            const question1 = 'Who am I? What am I?';
            this.setState({question: 'Who am I? What am I?'}) ;
        } else {
            const question2 = 'What is Being?';
            this.setState({question: 'What is Being?'}) ;
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

        alert(`yeah well, but who is aware of ${meIdeaItem} ❓`);

        ideaInput.value = '';
        ideaInput.placeholder = `Saved! But why ${meIdeaItem}?`;

        e.preventDefault();
    }

  render() {
    return (
        <div id="selfEnquiry">
            <form onSubmit={(e) => this.saveIdea(e)}>
                <h1 style={{'margin-bottom': '10px'}} onClick={() => { this.getRandom() }}>{this.state.question}</h1>
                <input type="text" id="ContemplationInsight"></input> <br/> <br/> <br/>             
            </form>
        </div>
    );
  }

  componentDidMount() {
    this.getRandom()
  }
}
