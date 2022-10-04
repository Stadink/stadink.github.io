import { collection, onSnapshot, getDoc, setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import moment from 'moment';


export class DreamsNotepad extends React.Component {
  constructor(props) {
    super(props);
    const dates = this.props.dates === undefined ? [] : this.props.dates;
    this.state = {placeholder: 'Any details?', text: this.props.note, keyword: '', dates: dates};
    this.handleNew = this.handleNew.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getText() {
    console.log('Dates: ' + this.props.dates)
    return this.state.placeholder;
  }

  handleChange(event) {    
    this.setState({text: event.target.value});
  }
  
  async handleNew(keyword) {
    // alert('It saved but I need to learn more react I guess')
    // oh and it also can fuck up the saved notes but idk

    const dbName = 'Dreams';
    const docRef = doc(db, dbName, keyword);
    let payload;

    payload = {note: this.state.text};
    await updateDoc(docRef, payload);

    this.setState({text: ''});
    this.setState({placeholder: 'Saved! Anything else?'});
    // this.setProps({note: 'Saved! Anything else?'});
    
    document.querySelector('#' + keyword.replace(/\s/g, '') + 'Button').innerHTML = "saved ✅";
    document.querySelector('#' + keyword.replace(/\s/g, '') + 'Button').style.background = "green";
    // document.querySelector('#' + keyword).placeholder = "Saved! Anything else?";
    // alert('It saved but I need to learn more react I guess')
  }

  setDatabaseName(event) {
    console.log(event.target.value);
    this.setState({dbName: event.target.value}); 
    this.setState({text: ''}); 
    this.setState({placeholder: `saving to: ${event.target.value}`}); 

    // document.querySelector('#notepad').value = "";
  }

  getTimeRemaining(){
    const total = Date.parse('May 18, 2045') - Date.parse(new Date());
    const days = Math.floor( total/(1000*60*60*24) );
    return days
  }

  async addkeywordNote() {
    const docRef = doc(db, 'Days', `#${this.getTimeRemaining()}`);
    let payload;

    payload = {note: this.state.text, timestamp: serverTimestamp()};
    
    await updateDoc(docRef, payload);
  }

  async getKeywordNote(keyword) {
    const docRef = doc(db, 'Dreams', keyword);
    // console.log('Daily note from Day #' + (this.getTimeRemaining()+day));
    // console.log('Type is' + typeof (this.getTimeRemaining()+day));
    const docSnapshot = await getDoc(docRef)
    const data = docSnapshot.data();
    let keywordNote;
    if(data !== undefined) {
      keywordNote = data.note;
    }

    console.log('Keyword note is: ' + keywordNote);
    keywordNote = keywordNote === undefined ? '🤷‍♂️' : keywordNote;

    this.setState({placeholder: ''});
    this.setState({text: keywordNote});
    // document.querySelector('#notepad').value = keywordNote;
    // document.querySelector("//th[contains(.,'8496')]").innerHtml = 'Nice';
    return keywordNote;
  }

  stripSpaces(keyword) {
    return keyword.toString().replace(/\s/g, '')
  }

  render() {
    return (
      <div id="notepadSection">
        {/* Keyword count number + dates in spoiler */}
        <details>
          <summary><b>count:</b> {this.props.count}</summary>
          dates:
          { 
            this.state.dates.map(date => {
              return <div>{date}</div>
            })
          }
        </details>

        <textarea style={{'height': '400px', 'width': '750px'}} id="notepad" contenteditable="true" autocomplete="off" placeholder={this.getText()} onChange={this.handleChange} >
          {this.props.note}
          {/* {this.props.keyword} */}
        </textarea> <br />

        <button id={this.stripSpaces(this.props.keyword) + 'Button'} className="button" onClick={() => this.handleNew(this.props.keyword)}>💾</button>
      </div>
    );
  }
}
