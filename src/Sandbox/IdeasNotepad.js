import { collection, onSnapshot, getDoc, setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import moment from 'moment';


export class IdeasNotepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {placeholder: 'Any details?', text: this.props.note, keyword: ''};
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
  
  stripSpaces(keyword) {
    return keyword.toString().replace(/\s/g, '')
  }

  async handleNew(keyword) {
    // alert('It saved but I need to learn more react I guess')
    // oh and it also can fuck up the saved notes but idk

    const dbName = 'ideas';
    const docRef = doc(db, dbName, keyword); // oh fuck
    let payload;

    payload = {note: this.state.text};
    await updateDoc(docRef, payload);

    this.setState({text: ''});
    this.setState({placeholder: 'Saved! Anything else?'});
    // this.setProps({note: 'Saved! Anything else?'});
    
    document.querySelector('.button').innerHTML = "saved ✅";
    document.querySelector('.button').style.background = "green";
    // document.querySelector('#' + this.stripSpaces(keyword) + 'Button').innerHTML = "saved ✅";
    // document.querySelector('#' + this.stripSpaces(keyword) + 'Button').style.background = "green";
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


  render() {
    return (
      <div id="notepadSection">
        <textarea id="notepadIdea" class="notepad" contenteditable="true" autocomplete="off" placeholder={this.getText()} onChange={this.handleChange} >
          {this.props.note}
        </textarea> <br />

        <button id={this.stripSpaces(this.props.keyword) + 'Button'} className="button" onClick={() => this.handleNew(this.props.keyword)}>💾</button>
      </div>
    );
  }
}
