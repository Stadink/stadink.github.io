import { collection, onSnapshot, setDoc, doc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import moment from 'moment';


export class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Use me'};
    this.handleNew = this.handleNew.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }
  
  async handleNew() {
    // const notepadText = await document.querySelector('#notepad').innerHTML;

    const docRef = doc(db, "SDSlog", moment().toString());
    const payload = {idea: this.state.value}
    await setDoc(docRef, payload);

  }

  render() {
    return (
      <div id="notepadSection">
        <textarea id="notepad" contenteditable="true" autocomplete="off" onChange={this.handleChange}>
          {this.state.value}
        </textarea> <br/>
        <button className="button" onClick={this.handleNew}>New</button>
      </div>
        
    );
  }
}
