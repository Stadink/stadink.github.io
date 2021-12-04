import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, serverTimestamp, getDoc } from '@firebase/firestore';
import React, { useState, useEffect } from 'react';
import db from './firebase';
import { TS } from './TS';
import TranscendingSelf from './TranscendingSelf';
import Ideas from './Ideas';


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
    return data.done;
  }

  isDone(item){
    // const idk = await this.getItemsDone().toString.includes(item) ? 'checked' : ''
    // const idk = await this.getItemsDone();
    // console.log(this.state.checked)
    const done = this.state.checked
    // console.log(lol)
    // console.log(lol.includes('aa'))
    // const checked = await done.includes(item) ? 'true' : 'false';
    // console.log(`wtf why ${item} ` + checked)
    console.log(done)
    return this.state.checked.includes(item)
  }

  async wtf(){
    // console.log('this.state.checked is ' + this.state.checked)
    const items = await this.getItemsDone()
    // console.log(items)
    this.setState({checked: items}); 
  }

  handleCheck(item){
    this.setState(prevState => ({
      checked: [...prevState.checked, item]
    }))
  }

  reset(){
    this.setState({checked: []}); 
  }


  render() {
    return (
        <div id="Remember">
          <details open>
            <summary>Important</summary>
              💯% <br/>
              ⭐ Switch to thoughts in English

              <br/><br/>
              What can I do today to be satisfied with this day ending? <br/>
              <input id='Codecademy' checked={this.isDone('Codecademy')} type="checkbox" onChange={()=>{this.handleCheck('Codecademy')}} /> <a href='https://www.codecademy.com/learn' target="_blank">Codecademy</a> <br/>
              <input id='SDS' checked={this.isDone('SDS')} onChange={()=>{this.handleCheck('SDS')}} type="checkbox"  /> SDS <br/>
              <input id='Sport' checked={this.isDone('Sport')} onChange={()=>{this.handleCheck('Sport')}} type="checkbox"  /> Sport <br/>
              <input id='Obsidian' checked={this.isDone('Obsidian')} onChange={()=>{this.handleCheck('Obsidian')}} type="checkbox"  /> 10 mins of random Obsidian <br/>
              <button onClick={() => {this.reset()}}>reset</button>
            </details> <br />
            {/* <TS /> */}
            <TranscendingSelf />
            <Ideas />
        </div>
    );
  }

  componentDidMount() {
      this.wtf()
  }
}
