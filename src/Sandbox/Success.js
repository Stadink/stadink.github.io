import React from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';
import SuccessPrinciples from './SuccessPrinciples.json'


export class Success extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          List: ['infos'],
          randomInfo: 'Do your thing',
          randomChapter: 42
        };

        this.getList = this.getList.bind(this);
        this.randomInfo = this.randomInfo.bind(this);
        this.setState( {List: this.getList()})

      }

      randomChapterNumber() {
        const randomNumber = Math.floor(Math.random() * SuccessPrinciples.length);
        this.setState( {randomChapter: randomNumber})
      }

      randomSuccessPrinciple() {
        const chapterNum = this.state.randomChapter - 1
        return SuccessPrinciples[chapterNum].Title
      }

      getBookUrl() {
        const chapterNum = this.state.randomChapter - 1
        const pageNum = SuccessPrinciples[chapterNum].page
        const pageShifted = parseInt(pageNum) + 23;
        return `https://the-cosmic-joke.com/SuccessPrinciples.pdf#page=${pageShifted}`
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
                <h2 style={{'margin-bottom': '0px'}}><a href={this.getBookUrl()} target="_blank">{this.state.randomChapter}.&nbsp;{this.randomSuccessPrinciple()}</a></h2>
                <br/>
                
                <input type="text" id="SuccessInfo"></input> <br/> <br/>      
            </form>
                {/* {this.getRandomInfo()}  */}
                <span class='clickable' onClick={ () => this.randomInfo()}>{this.state.randomInfo}</span>
                {/* <br /><br /><br /> */}
                {/* <button onClick={()=>{this.randomInfo()}}>random info</button> */}
        </div>
    );
  }

  componentDidMount() {
        this.getList();
        this.randomInfo();
        this.randomChapterNumber();
    }
}
