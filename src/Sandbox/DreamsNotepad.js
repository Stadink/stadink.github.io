import { collection, onSnapshot, getDoc, setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import moment from 'moment';


export class DreamsNotepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {placeholder: 'Any details?', text: ' ', keyword: ''};
    this.handleNew = this.handleNew.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getText() {
    return this.state.placeholder;
  }

  handleChange(event) {    
    this.setState({text: event.target.value});
  }
  
  async handleNew() {
    const dbName = this.state.dbName;
    const docRef = doc(db, dbName, moment().toString());
    let payload;

    switch(dbName) {
      case "ideas":
        payload = {idea: this.state.text, timestamp: serverTimestamp(), hide: 0};
        await setDoc(docRef, payload);
        break;
      case "toDo":
        payload = {toDoItem: this.state.text, done: 0, timestamp: serverTimestamp()};
        await setDoc(docRef, payload);
        break;
      case 'dayNote':
        this.addDayNote();
        break;
    }
    this.setState({text: ''});
    this.setState({placeholder: 'Saved! Anything else?'});
    
    document.querySelector('#notepad').value = "";
    document.querySelector('#notepad').placeholder = "Saved! Anything else?";
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

  async addDayNote() {
    const docRef = doc(db, 'Days', `#${this.getTimeRemaining()}`);
    let payload;

    payload = {note: this.state.text, timestamp: serverTimestamp()};
    
    await updateDoc(docRef, payload);
  }

  async getKeywordNotes(day) {
    document.getElementById('DayNum').innerHTML = this.getTimeRemaining()+day;
    const docRef = doc(db, 'Days', `#${this.getTimeRemaining()+day}`);
    console.log('Daily note from Day #' + (this.getTimeRemaining()+day));
    // console.log('Type is' + typeof (this.getTimeRemaining()+day));
    const docSnapshot = await getDoc(docRef)
    const data = docSnapshot.data();
    let dayNote;
    if(data !== undefined) {
      dayNote = data.note;
    }

    console.log('Day note is: ' + dayNote);
    dayNote = dayNote === undefined ? '🤔' : dayNote;

    this.setState({placeholder: ''});
    this.setState({text: dayNote});
    document.querySelector('#notepad').value = dayNote;
    // document.querySelector("//th[contains(.,'8496')]").innerHtml = 'Nice';
  }

  render() {
    return (
      <div id="notepadSection">
        <textarea id="notepad" contenteditable="true" autocomplete="off" placeholder={this.getText()} onChange={this.handleChange} /> <br />
        {this.state.props}
        <button className="button" onClick={this.handleNew}>💾</button>
      </div>
    );
  }
}
