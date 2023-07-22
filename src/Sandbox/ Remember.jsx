import { setDoc, updateDoc, doc, serverTimestamp, getDoc } from '@firebase/firestore';
import React from 'react';
import db from './firebase';
import TranscendingSelf from './TranscendingSelf';
import Ideas from './Ideas';
import { Affirmation } from './Affirmation';
import { SelfEnquiry } from './SelfEnquiry'
import { DailyStoic } from './DailyStoic';
import { Contemplation } from './Contemplation';
import { Success } from './Success';


export class Remember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: []}; 
  }


  getTimeRemaining(){
    const total = Date.parse('May 18, 2045') - Date.parse(new Date());
    const days = Math.floor( total/(1000*60*60*24) );
    return days
  }

  async getItemsDone() {
    const docRef = doc(db, 'Days', `#${this.getTimeRemaining()}`);
    const docSnapshot = await getDoc(docRef)
    const data = docSnapshot.data();
    console.log('DATA IS: ' + JSON.stringify(data))
    if (JSON.stringify(data) === undefined) {
      this.addDayToFirebase();
    } else {
    const items = data.done;
    this.setState({checked: items}); 
    return items;
    }
  }

  isDone(item){
    const done = this.state.checked
    console.log('DONE is: ' + done)
    return this.state.checked.includes(item)
  }

  async handleCheck(item){
    document.getElementById('Affirmation').checked = true;
    this.setState(prevState => ({
      checked: [...prevState.checked, item]
    }))
    this.updateDayInFirebase()
  }

  reset(){
    this.setState({checked: []});
    this.updateDayInFirebase(); 
  }

  checkboxesCrossed() {
      let checkboxesCrossed = 0;
      let itemsDone = this.itemsDone();

      checkboxesCrossed = itemsDone.length;
      
      return checkboxesCrossed;
  }

  itemsDone() {
      let itemsDone = [];

      if(document.getElementById('Obsidian') !== null) {
          let idk;
          idk = document.getElementById('Codecademy').checked ? itemsDone.push('Codecademy') : null;
          idk = document.getElementById('SDS').checked ? itemsDone.push('SDS') : null;
          idk = document.getElementById('Sport').checked ? itemsDone.push('Sport') : null;
          idk = document.getElementById('Obsidian').checked ? itemsDone.push('Obsidian') : null;
          idk = document.getElementById('Read').checked ? itemsDone.push('Read') : null;
          idk = document.getElementById('Anki').checked ? itemsDone.push('Anki') : null;
          idk = document.getElementById('Affirmation').checked ? itemsDone.push('Affirmation') : null;
          idk = document.getElementById('SelfInquiry').checked ? itemsDone.push('Self-Inquiry') : null;
          idk = document.getElementById('Writing').checked ? itemsDone.push('Writing') : null;
          idk = document.getElementById('Contemplation').checked ? itemsDone.push('Contemplation') : null;
          console.log(idk) // to remove the not-used warning, otherwise code is shit
      }
      return itemsDone;
  }

  async addDayToFirebase() {
      const day = this.getTimeRemaining();
      const docRef = doc(db, 'Days', `#${day.toString()}`);
      console.log('docRef is ' + docRef)
      let payload;

      payload = {PM: this.checkboxesCrossed(), done: this.itemsDone(), timestamp: serverTimestamp()};
      
      await setDoc(docRef, payload);
    }

  async updateDayInFirebase() {
      const day = this.getTimeRemaining();
      const docRef = doc(db, 'Days', `#${day.toString()}`);
      console.log('docRef is ' + docRef)
      let payload;

      payload = {PM: this.checkboxesCrossed(), done: this.itemsDone(), timestamp: serverTimestamp()};
      
      await updateDoc(docRef, payload);
    }


  checkbox(item) {
    return <input id={item} checked={this.isDone(item)} onChange={()=>{this.handleCheck(item)}} type="checkbox"> {item}</input>
  }


  render() {
    return (
        <div id="Remember">
          <details open>
            <summary class='clickable'>◭ 💯%</summary>
              <Success />
              <h1>🎯</h1>
              <details>
                <summary class="clickable" onClick={()=>{this.handleCheck('Affirmation')}}><input id='Affirmation' class="cursorAim" checked={this.isDone('Affirmation')} onChange={()=>{this.handleCheck('Affirmation')}} type="checkbox"  /> Affirmation ▼<br/></summary>
                <div >
                  <Affirmation/>
                </div>
              </details>

              <input id='SDS' class="cursorAim" checked={this.isDone('SDS')} onChange={()=>{this.handleCheck('SDS')}} type="checkbox"  /> <span class="cursorProgress">SDS 🧘🏻‍♂️</span><br/>
              <input id='Obsidian' class="cursorAim" checked={this.isDone('Obsidian')} onChange={()=>{this.handleCheck('Obsidian')}} type="checkbox"  /> 10 mins of random Obsidian 🎲<br/>
              <input id='Sport' class="cursorAim" checked={this.isDone('Sport')} onChange={()=>{this.handleCheck('Sport')}} type="checkbox"  /> <a href="https://obsidian.willthisdofor.art/Publish/My+tai+chi+set" target="blank">Sport 💪</a> <br/>
              <input id='Codecademy' class="cursorAim" checked={this.isDone('Codecademy')} type="checkbox" onChange={()=>{this.handleCheck('Codecademy')}} />👉<a href='https://www.codecademy.com/learn' target="_blank" rel='noreferrer'>Codecademy</a>👈 <br/>
              <input id='Anki' class="cursorAim" checked={this.isDone('Anki')} onChange={()=>{this.handleCheck('Anki')}} type="checkbox"  /> Anki <br/>
              <details>
                <summary class="clickable"><input class="cursorAim" id='Contemplation' checked={this.isDone('Contemplation')} onChange={()=>{this.handleCheck('Contemplation')}} type="checkbox"  /> Contemplation ↓<br/></summary>
                <Contemplation/>
              </details>
              <details>
                <summary class="clickable"><input class="cursorAim" id='SelfInquiry' checked={this.isDone('Self-Inquiry')} onChange={()=>{this.handleCheck('Self-Inquiry')}} type="checkbox"  /> Self-Inquiry ▼  <br/></summary>
                <SelfEnquiry/>
              </details>
              <input id='Writing' class="cursorAim" checked={this.isDone('Writing')} onChange={()=>{this.handleCheck('Writing')}} type="checkbox"  /><abbr title="~Honest externalization, so anyway... 🤔">Writing </abbr> <a style={{textDecoration: 'none'}} href="https://10fastfingers.com/typing-test/english" target="_blank" rel='noreferrer'>👨🏻‍💻</a><br/>
              <input id='Read' class="cursorAim" checked={this.isDone('Read')} onChange={()=>{this.handleCheck('Read')}} type="checkbox"  /> Read 📕<br/>

              <button onClick={() => {this.reset()}}>reset</button>
            </details>
            <DailyStoic />
            <br/>
            <TranscendingSelf />

            <Ideas />
        </div>
    );
  }

  componentDidMount() {
    this.getItemsDone();
    // document.addEventListener("keydown", (e) => 
    //     e.code === "Enter" && alert('yeah well, but who is aware of ' + document.getElementById('WhoIamInput').value));
    // this.wtf()
    // setInterval(() => {
    //   this.wtf() // can I leave this like this for sync or should I just // ok I guess this is necesasry lol
    //   // this.setState({ date: new Date() }); 
    // }, 1500);
  }
}
