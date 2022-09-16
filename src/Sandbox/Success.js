import React from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';


export class Success extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          List: ['fuck!'],
          randomInfo: 'idk',
          randomAffirmations: 'aaaaaa',
        };

        this.getList = this.getList.bind(this);
        this.randomInfo = this.randomInfo.bind(this);
        this.setState( {List: this.getList()})

      }

    async getList() {
        const docRef = doc(db, 'Success', 'SuccessPrinciples')

        const docSnapshot = await getDoc(docRef)
        const affirmations = docSnapshot.data();
        console.log('Get list is: ' + JSON.stringify(affirmations.Quotes))

        this.setState( {List: affirmations.Quotes})
        return affirmations.Quotes;
    }

    async randomInfo() {
        const list = await this.getList();
        const randomNumber = Math.floor(Math.random() * list.length);
        this.setState( {randomInfo: list[randomNumber]})

        return list[randomNumber]
    }

    async saveIdea(e) {
        e.preventDefault();

        const ideaInput = document.querySelector('#SuccessInfo');
        const SuccessIdea = ideaInput.value;

        console.log(SuccessIdea)

        const docRef = doc(db, 'Success', 'SuccessPrinciples')
        let payload = {Quotes: arrayUnion(SuccessIdea)};
        await updateDoc(docRef, payload)

        ideaInput.value = '';
        ideaInput.placeholder = 'Saved! Any more?';

        e.preventDefault();
    }

  render() {
    return (
        <div id="Success">
            <form onSubmit={(e) => this.saveIdea(e)}>
                <h1 style={{'margin-bottom': '0px'}}>Success info:</h1>
                <input type="text" id="SuccessInfo"></input> <br/> <br/>      
            </form>
                {/* {this.getRandomInfo()}  */}
                {this.state.randomInfo}
                <br /><br /><br />
                {/* <button onClick={()=>{this.randomInfo()}}>random info</button> */}
        </div>
    );
  }

  componentDidMount() {
        this.getList();
        this.randomInfo();
    }
}
