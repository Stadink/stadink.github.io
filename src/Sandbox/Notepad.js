import { collection, onSnapshot, getDoc, setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import moment from 'moment';


export class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {placeholder: 'Any ideas or To-dos?', text: ' ', dbName: "ideas", day: 0};
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
    const docRef2 = doc(db, 'toDo2', moment().toString());
    let payload;

    // eslint-disable-next-line default-case
    switch(dbName) {
      case "ideas":
        payload = {idea: this.state.text, timestamp: serverTimestamp(), hide: 0};
        await setDoc(docRef, payload);
        break;
      case "toDo":
        payload = {toDoItem: this.state.text, done: 0, timestamp: serverTimestamp()};
        await setDoc(docRef, payload);
        break;
      case "on":
        payload = {toDoItem: this.state.text, done: 0, timestamp: serverTimestamp()};
        await setDoc(docRef2, payload);
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

  async getDayNote(day) {
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

  getVisibility() {
    const displayOption = this.state.dbName === 'toDo' ? 'visible' : 'hidden';
    return displayOption;
  }

  makeBigger() {
    let width = document.querySelector('#notepad').style.width;
    let height = document.querySelector('#notepad').style.height;
    console.log('width is: ' + document.querySelector('#notepad').style.width );
    console.log('height is: ' + height);
    if (width !== '750px') {
      document.querySelector('#notepad').style.height = '400px';
      document.querySelector('#notepad').style.width = '750px';
    } else {
      document.querySelector('#notepad').style.height = '300px';
      document.querySelector('#notepad').style.width = '350px';
    }
  }

  render() {
    return (
      <div id="notepadSection">
        <button onClick={() => {this.getDayNote(this.state.day + 1);this.setState({ day: this.state.day + 1}) }}>←</button>
        <button onClick={() => {this.getDayNote(this.state.day - 1);this.setState({ day: this.state.day - 1}) }}>→</button><br />
        {/* <button onClick={()=> this.makeBigger()}>&#x26F6;</button> <br /> */}
        {/* {this.getTimeRemaining()+this.state.day} */}

        <textarea id="notepad" contenteditable="true" autocomplete="off" placeholder={this.getText()} onChange={this.handleChange} /> 
        

        
        <br />


          <div class="cursorAim" onChange={this.setDatabaseName.bind(this)}>
            <input class="clickable" type="radio" id="idea" name="fav_language" value="ideas"/>
            <label class="clickable" for="idea">💡</label>

            <input class="clickable" type="radio" id="toDo" name="fav_language" value="toDo"/>
            <label class="clickable" for="toDo">✅</label>

          <input class="clickable" id="toDo2" style={{visibility: this.getVisibility()}} type='radio'></input> 
          <input class="clickable" id="toDo1" style={{visibility: this.getVisibility()}} type='radio'></input> 

          {/* 
            <input type="radio" id="starred" name="fav_language" value="starred"/>
            <label for="starred">⭐</label> */}

            <input class="clickable" onClick={() => this.getDayNote(0)} type="radio" id="starred" name="fav_language" value="dayNote"/>
            <label class="clickable" for="starred">📝</label><br/>
          </div>
        <button className="button" onClick={this.handleNew}>Add</button>
      </div>
    );
  }
}
