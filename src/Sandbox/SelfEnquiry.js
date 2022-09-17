import React from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';


export class SelfEnquiry extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          option: 'I am',
        };

        this.switchOption = this.switchOption.bind(this);
      }

    async saveIdea(e) {
        e.preventDefault();

        const ideaInput = document.querySelector('#WhoIamInput');
        const meIdeaItem = ideaInput.value;

        console.log(meIdeaItem)

        const docRef = doc(db, 'Self-Inquiry', 'ideas')
        const option = this.state.option;
        let payload = {};
        if(option === 'I am') {
            payload = {Iam: arrayUnion(meIdeaItem)};
        } else if (option === 'I'){
            payload = {I: arrayUnion(meIdeaItem)};
        } else if (option === 'Я'){
            payload = {Я: arrayUnion(meIdeaItem)};
        }
        await updateDoc(docRef, payload)

        alert('yeah well, but who is aware of ' + meIdeaItem)

        ideaInput.value = '';
        ideaInput.placeholder = 'Saved! Any more?';

        e.preventDefault();
    }

    switchOption() {
        if (this.state.option === 'I am') {
            this.setState( {option: 'I'})
        } else if (this.state.option === 'I') {
            this.setState( {option: 'Я'})
        } else if (this.state.option === 'Я') {
            this.setState( {option: 'I am'})
        }
    }

  render() {
    return (
        <div id="selfEnquiry">
            <form onSubmit={(e) => this.saveIdea(e)}>
                <h1 class='clickable' style={{'margin-bottom': '0px'}} onClick={() => this.switchOption()}>{this.state.option}</h1>
                <input type="text" id="WhoIamInput"></input> <br/> <br/>      
            </form>
        </div>
    );
  }
}
