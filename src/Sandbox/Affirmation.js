import React from 'react';
import { Timer } from './Timer';
import db from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export class Affirmation extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          List: ['fuck!'],
          randomAffirmation: 'idk',
          randomAffirmations: 'aaaaaa',
        };

        this.getList = this.getList.bind(this);
        this.setState( {List: this.getList()})

      }

    async getList() {
        const docRef = doc(db, 'Affirmation', 'Affirmations')

        const docSnapshot = await getDoc(docRef)
        const affirmations = docSnapshot.data();
        console.log('Get list is: ' + JSON.stringify(affirmations.List))

        this.setState( {List: affirmations.List})
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

    getAffirmations() {
        const affirmations = this.state.List;
        affirmations.sort( () => .5 - Math.random() );
        return affirmations.join(', ').toString();
    }

    setRandomAffirmation() {
      const affirmations = this.state.List;
      const length = affirmations.length
      const randomNum = Math.floor(Math.random() * length)

      const randomAffirmation = affirmations[randomNum]
      // this.setState( {randomAffirmation: randomAffirmation } ) // WHY THE FUCK DOESN'T THIS WORK??????????
      return randomAffirmation
    }

    getRandomAffirmation() {
      const currentRandomAffirmation = document.getElementById('randomAffirmations').innerHTML;
      const single = currentRandomAffirmation.split(',')[0]

      navigator.clipboard.writeText(single);
      console.log(single)
      return single
    }


    getRandomAffirmations() {
      const affirmations = this.state.List;
      const length = affirmations.length
      const randomNum2 = Math.floor(Math.random() * length / 2) + 1

      const randomAffirmation = this.setRandomAffirmation() + ', '
      // const randomAffirmation = this.state.randomAffirmation + ', '
      console.log(randomAffirmation.repeat(randomNum2))

      return randomAffirmation.repeat(randomNum2)
  }


  render() {
    return (
        <div id="Affirmation">
          <marquee width="60%" direction="left" height="40px" scrollamount="18">
                {this.getAffirmations()}, 
                <span id="randomAffirmations">{this.getRandomAffirmations()}</span>
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
                <input type='text' id='AffirmationInput'></input>
                <button onClick={(e) => this.saveAffirmation(e)}>save</button>
            </form>

            {/* {this.getRandomAffirmation()} */}
            <button class="cursorCopy" onClick={()=> this.getRandomAffirmation() }>current Daily</button> <br/><br/>

            {/* <button onClick={() => this.getRandomAffirmations()}>Get Random</button> */}
        </div>
    );
  }

  componentDidMount() {
      this.getList();
      // this.getRandomAffirmations()
    // this.setState( {List: this.getList()})
  }
}
