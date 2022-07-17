import React from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';


export class SelfEnquiry extends React.Component {

    async saveIdea(e) {
        e.preventDefault();

        const ideaInput = document.querySelector('#WhoIamInput');
        const meIdeaItem = ideaInput.value;

        console.log(meIdeaItem)

        const docRef = doc(db, 'Self-Inquiry', 'ideas')
        let payload = {items: arrayUnion(meIdeaItem)};
        await updateDoc(docRef, payload)

        alert('yeah well, but who is aware of ' + meIdeaItem)

        ideaInput.value = '';
        ideaInput.placeholder = 'Saved! Any more?';

        e.preventDefault();
    }

  render() {
    return (
        <div id="selfEnquiry">
            <form onSubmit={(e) => this.saveIdea(e)}>
                <h1 style={{'margin-bottom': '0px'}}>I am</h1>
                <input type="text" id="WhoIamInput"></input> <br/> <br/>      
            </form>
        </div>
    );
  }
}
