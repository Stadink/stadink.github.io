import React from 'react';
import { Timer } from './Timer';
import db from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export class Affirmation extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          List: ['fuck!'],
        };

        this.getList = this.getList.bind(this);
        this.setState( {List: this.getList()})

      }

    async getList() {
        const docRef = doc(db, 'Affirmation', 'Affirmations')

        const docSnapshot = await getDoc(docRef)
        const affirmations = docSnapshot.data();
        console.log('Get list is: ' + JSON.stringify(affirmations.List))

        this.setState( {List: affirmations.List.toString()})
        return affirmations.List;
    }

    async saveAffirmation(e) {
        e.preventDefault();

        const AffirmationInput = document.querySelector('#AffirmationInput').value;
        console.log(AffirmationInput)

        const docRef = doc(db, 'Affirmation', 'Affirmations')
        let payload = {List: arrayUnion(AffirmationInput )};
        await updateDoc(docRef, payload)

        document.querySelector('#AffirmationInput').value = '';
        document.querySelector('#AffirmationInput').placeholder = 'Saved! Any more?';
    }

    getRandomAffirmations() {
        // const list = await this.getList();
        // return JSON.stringify(list)
        return this.state.List;
    }


  render() {
    return (
        <div id="Affirmation">
          <marquee width="60%" direction="left" height="40px" scrollamount="18">
                {this.getRandomAffirmations()}
                I am powerful, I am capable, I am worthy, I am free. I am powerful, I am capable, I am worthy, I am free. I am powerful, I am capable, I am worthy, I am free.
                I am powerful, I am capable, I am worthy, I am free. I am powerful, I am capable, I am worthy, I am free. I am powerful, I am capable, I am worthy, I am free.
                I am powerful, I am capable, I am worthy, I am free. I am powerful, I am capable, I am worthy, I am free. I am powerful, I am capable, I am worthy, I am free.
                I am powerful, I am capable, I am worthy, I am free. I am powerful, I am capable, I am worthy, I am free. I am powerful, I am capable, I am worthy, I am free.
                  
                Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. 
                Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. 
                Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. Я кузнец своих нейронных путей. 

                Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. 
                Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. 
                Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. Я люблю себя и принимаю таким, какой я есть. 

                I choose to empower myself. I choose to empower myself. I choose to empower myself. I choose to empower myself. I choose to empower myself. I choose to empower myself. I choose to empower myself. 
                I choose to empower myself. I choose to empower myself. I choose to empower myself. I choose to empower myself. I choose to empower myself. I choose to empower myself. I choose to empower myself. 


                I am completely independent of the good or the bad opinions of others. I am completely independent of the good or the bad opinions of others. I am completely independent of the good or the bad opinions of others.
                I am completely independent of the good or the bad opinions of others. I am completely independent of the good or the bad opinions of others. I am completely independent of the good or the bad opinions of others.
                I am completely independent of the good or the bad opinions of others. I am completely independent of the good or the bad opinions of others. I am completely independent of the good or the bad opinions of others.

                Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. 
                Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. Всё будет хорошо. 
            </marquee>  
            <Timer />

            <form onSubmit={(e) => this.saveAffirmation(e)}>
                <button onClick={() => this.getList()}>Get List</button>
                <input type='text' id='AffirmationInput'></input>
                <button>save</button>
            </form>
        </div>
    );
  }

  componentDidMount() {
      this.getList();
    // this.setState( {List: this.getList()})
  }
}
