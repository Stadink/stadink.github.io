import { collection, onSnapshot, getDoc, setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import moment from 'moment';


export class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {placeholder: 'Any ideas or To-dos?', text: ' ', dbName: "ideas"};
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

  async getDayNote() {
    const docRef = doc(db, 'Days', `#${this.getTimeRemaining()}`);
    const docSnapshot = await getDoc(docRef)
    const data = docSnapshot.data();
    let dayNote = data.note;

    console.log('Day note is: ' + dayNote);
    dayNote = dayNote === undefined ? '🤔' : dayNote;

    this.setState({placeholder: ''});
    this.setState({text: dayNote});
    document.querySelector('#notepad').value = dayNote;
  }

  render() {
    return (
      <div id="notepadSection">
        <textarea id="notepad" contenteditable="true" autocomplete="off" placeholder={this.getText()} onChange={this.handleChange} /> <br />
          <div onChange={this.setDatabaseName.bind(this)}>
            <input type="radio" id="idea" name="fav_language" value="ideas"/>
            <label for="idea">💡</label>

            <input type="radio" id="toDo" name="fav_language" value="toDo"/>
            <label for="toDo">✅</label>
{/* 
            <input type="radio" id="starred" name="fav_language" value="starred"/>
            <label for="starred">⭐</label> */}

            <input onClick={() => this.getDayNote()} type="radio" id="starred" name="fav_language" value="dayNote"/>
            <label for="starred">📝</label><br/>
          </div>
        <button className="button" onClick={this.handleNew}>Add</button>
      </div>
        
    );
  }
}
