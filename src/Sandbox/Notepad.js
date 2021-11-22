import { collection, onSnapshot, setDoc, doc, serverTimestamp } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import moment from 'moment';


export class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Any ideas or To-dos?'};
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
    const docRef = doc(db, "SDSlog", moment().toString());
    const payload = {idea: this.state.value, timestamp: serverTimestamp()}
    await setDoc(docRef, payload);

    // this.setState({value: "Saved! Anything else?"});  
    document.querySelector('#notepad').value = "";
    document.querySelector('#notepad').placeholder = "Saved! Anything else?";
  }

  render() {
    return (
      <div id="notepadSection">
        <textarea id="notepad" contenteditable="true" autocomplete="off" placeholder={this.getText()} onChange={this.handleChange}>
          

        </textarea> <br/>
          <input type="radio" id="idea" name="fav_language" value="HTML"/>
          <label for="idea">💡</label>

          <input type="radio" id="toDo" name="fav_language" value="CSS"/>
          <label for="toDo">✅</label>

          <input type="radio" id="starred" name="fav_language" value="HTML"/>
          <label for="starred">⭐</label><br/>

        <button className="button" onClick={this.handleNew}>Add</button>
      </div>
        
    );
  }
}
