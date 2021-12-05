import { collection, onSnapshot, setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import moment from 'moment';


export class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Any ideas or To-dos?', dbName: "ideas"};
    this.handleNew = this.handleNew.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getText() {
    return this.state.value;
  }

  handleChange(event) {    
    this.setState({value: event.target.value});
  }
  
  async handleNew() {
    const dbName = this.state.dbName;
    const docRef = doc(db, dbName, moment().toString());
    let payload;

    switch(dbName) {
      case "ideas":
        payload = {idea: this.state.value, timestamp: serverTimestamp(), hide: 0};
        await setDoc(docRef, payload);
        break;
      case "toDo":
        payload = {toDoItem: this.state.value, done: 0, timestamp: serverTimestamp()};
        await setDoc(docRef, payload);
        break;
      case 'dayNote':
        payload = {note: this.state.value};
        await updateDoc(docRef, payload);
        break;
    }
    this.setState({value: ''});
    
    // this.setState({value: "Saved! Anything else?"});  
    document.querySelector('#notepad').value = "";
    document.querySelector('#notepad').placeholder = "Saved! Anything else?";
  }

  setDatabaseName(event) {
    console.log(event.target.value);
    this.setState({dbName: event.target.value}); 
    this.setState({value: `saving to: ${event.target.value}`}); 
  }

  getTimeRemaining(){
    const total = Date.parse('May 18, 2045') - Date.parse(new Date());
    const days = Math.floor( total/(1000*60*60*24) );
    return days
  }

  async addDayNote() {
    const day = this.getTimeRemaining();
    const docRef = doc(db, 'Days', `#${day.toString()}`);
    let payload;

    payload = {note: this.state.value, timestamp: serverTimestamp()};
    
    await updateDoc(docRef, payload);
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

            <input type="radio" id="starred" name="fav_language" value="dayNote"/>
            <label for="starred">📝</label><br/>
          </div>
        <button className="button" onClick={this.handleNew}>Add</button>
      </div>
        
    );
  }
}
