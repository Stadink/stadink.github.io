import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, serverTimestamp, getDoc } from '@firebase/firestore';
import React, { useState, useEffect } from 'react';
import db from './firebase';
import { TS } from './TS';
import TranscendingSelf from './TranscendingSelf';
import Ideas from './Ideas';
import { Timer } from './Timer';


export class Remember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: []};
    // this.handleNew = this.handleNew.bind(this);
    // this.handleChange = this.handleChange.bind(this); 
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
    // const idk = await this.getItemsDone().toString.includes(item) ? 'checked' : ''
    // const idk = await this.getItemsDone();
    // console.log(this.state.checked)
    const done = this.state.checked
    console.log('DONE is: ' + done)
    // console.log(lol)
    // console.log(lol.includes('aa'))
    // const checked = await done.includes(item) ? 'true' : 'false';
    // console.log(`wtf why ${item} ` + checked)
    // console.log(done)
    return this.state.checked.includes(item)
  }

  // async wtf(){
  //   // console.log('this.state.checked is ' + this.state.checked)
  //   const items = await this.getItemsDone()
  //   // console.log(items)
  //   this.setState({checked: items}); 
  // }

  async handleCheck(item){
    this.setState(prevState => ({
      checked: [...prevState.checked, item]
    }))
    this.updateDayInFirebase()
  }

  reset(){
    this.setState({checked: []});
    this.updateDayInFirebase(); 
  }

    getTimeRemaining(){
      const total = Date.parse('May 18, 2045') - Date.parse(new Date());
      const days = Math.floor( total/(1000*60*60*24) );
      return days
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
          idk = document.getElementById('MarxCapital').checked ? itemsDone.push('MarxCapital') : null;
          idk = document.getElementById('Contemplation').checked ? itemsDone.push('Contemplation') : null;
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


  // async getItemsDone() {
  //     const docRef = doc(db, 'Days', `#${this.getTimeRemaining()}`);
  //     const docSnapshot = await getDoc(docRef)
  //     const data = docSnapshot.data();
  //     console.log(data.done)
  //     return data.done;
  // }


  render() {
    return (
        <div id="Remember">
          <details open>
            <summary>◭ 💯%</summary>
              ⭐ Switch to thoughts in English <br/><br/>

              What can I do today to be satisfied with this day ending? <br/>

              <input id='Codecademy' checked={this.isDone('Codecademy')} type="checkbox" onChange={()=>{this.handleCheck('Codecademy')}} /> <a href='https://www.codecademy.com/learn' target="_blank">Codecademy</a> <br/>
              <input id='SDS' checked={this.isDone('SDS')} onChange={()=>{this.handleCheck('SDS')}} type="checkbox"  /> SDS <br/>
              <input id='Sport' checked={this.isDone('Sport')} onChange={()=>{this.handleCheck('Sport')}} type="checkbox"  /> Sport <br/>
              <input id='Obsidian' checked={this.isDone('Obsidian')} onChange={()=>{this.handleCheck('Obsidian')}} type="checkbox"  /> 10 mins of random Obsidian <br/>
              <input id='Read' checked={this.isDone('Read')} onChange={()=>{this.handleCheck('Read')}} type="checkbox"  /> Read <br/>
              <input id='Anki' checked={this.isDone('Anki')} onChange={()=>{this.handleCheck('Anki')}} type="checkbox"  /> Anki <br/>

              <details>
                <summary><input id='Affirmation' checked={this.isDone('Affirmation')} onChange={()=>{this.handleCheck('Affirmation')}} type="checkbox"  /> Affirmation ▼ <br/></summary>
                <marquee width="60%" direction="left" height="40px">
                  Я силён, я способен, я достоин, я свободен. Я силён, я способен, я достоин, я свободен. Я силён, я способен, я достоин, я свободен. Я силён, я способен, я достоин, я свободен.
                </marquee>
                <Timer />
              </details>

              <input id='SelfInquiry' checked={this.isDone('Self-Inquiry')} onChange={()=>{this.handleCheck('Self-Inquiry')}} type="checkbox"  /> Self-Inquiry  <br/>
              <input id='MarxCapital' checked={this.isDone('MarxCapital')} onChange={()=>{this.handleCheck('MarxCapital')}} type="checkbox"  /> Marx Capital  <br/>
              <input id='Contemplation' checked={this.isDone('Contemplation')} onChange={()=>{this.handleCheck('Contemplation')}} type="checkbox"  /> Contemplation <br/>
              <button onClick={() => {this.reset()}}>reset</button>
            </details> <br />


            <TranscendingSelf />
            <Ideas />
        </div>
    );
  }

  componentDidMount() {
    this.getItemsDone();
    // this.wtf()
    // setInterval(() => {
    //   this.wtf() // can I leave this like this for sync or should I just // ok I guess this is necesasry lol
    //   // this.setState({ date: new Date() }); 
    // }, 1500);
  }
}
