import { collection, onSnapshot, setDoc, doc, serverTimestamp } from '@firebase/firestore';
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

    if (dbName === "toDo") {
      payload = {toDoItem: this.state.value, done: 0, timestamp: serverTimestamp()};
    } else {
      payload = {idea: this.state.value, timestamp: serverTimestamp(), hide: 0};
    }

    await setDoc(docRef, payload);

    // this.setState({value: "Saved! Anything else?"});  
    document.querySelector('#notepad').value = "";
    document.querySelector('#notepad').placeholder = "Saved! Anything else?";
  }

  setDatabaseName(event) {
    console.log(event.target.value);
    this.setState({dbName: event.target.value}); 
  }

  render() {
    return (
      <div id="notepadSection">
        <textarea id="notepad" contenteditable="true" autocomplete="off" placeholder={this.getText()} onChange={this.handleChange} /> <br />
        saving to: {this.state.dbName}
          <div onChange={this.setDatabaseName.bind(this)}>
            <input type="radio" id="idea" name="fav_language" value="ideas"/>
            <label for="idea">💡</label>

            <input type="radio" id="toDo" name="fav_language" value="toDo"/>
            <label for="toDo">✅</label>

            <input type="radio" id="starred" name="fav_language" value="starred"/>
            <label for="starred">⭐</label><br/>
          </div>
        <button className="button" onClick={this.handleNew}>Add</button>
      </div>
        
    );
  }
}
