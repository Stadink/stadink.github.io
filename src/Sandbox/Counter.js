import db from './firebase';
import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, serverTimestamp, getDoc } from '@firebase/firestore';
import React, { useState, useEffect } from 'react';


export class Counter extends React.Component {
    getTimeRemaining(){
        const total = Date.parse('May 18, 2045') - Date.parse(new Date());
        const days = Math.floor( total/(1000*60*60*24) );
        return days
    }

    checkboxesCrossed() {
        let checkboxesCrossed = 0;
        let itemsDone = [];

        if(document.getElementById('Obsidian') !== null) {
            // checkboxesCrossed = document.getElementById('Codecademy').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            // checkboxesCrossed = document.getElementById('SDS').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            // checkboxesCrossed = document.getElementById('Sport').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            // checkboxesCrossed = document.getElementById('Obsidian').checked ? checkboxesCrossed+1 : checkboxesCrossed;

            let idk;
            idk = document.getElementById('Codecademy').checked ? itemsDone.push('Codecademy') : null;
            idk = document.getElementById('SDS').checked ? itemsDone.push('SDS') : null;
            idk = document.getElementById('Sport').checked ? itemsDone.push('Sport') : null;
            idk = document.getElementById('Obsidian').checked ? itemsDone.push('Obsidian') : null;

            // checkboxesCrossed = document.getElementById('SDS').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            // checkboxesCrossed = document.getElementById('Sport').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            // checkboxesCrossed = document.getElementById('Obsidian').checked ? checkboxesCrossed+1 : checkboxesCrossed;
            checkboxesCrossed = itemsDone.length;
        }
        return checkboxesCrossed;
    }

    itemsDone() {
        let itemsDone = [];

        if(document.getElementById('Obsidian') !== null) {
            let idk;
            idk = document.getElementById('Codecademy').checked ? itemsDone.push('Codecademy') : null;
            idk = document.getElementById('SDS').checked ? itemsDone.push('SDS') : null;
            idk = document.getElementById('Sport').checked ? itemsDone.push('Sport') : null;
            idk = document.getElementById('Obsidian').checked ? itemsDone.push('Obsidian') : null;
        }
        return itemsDone;
    }

    async addDayToFirebase() {
        const day = this.getTimeRemaining();
        const docRef = doc(db, 'Days', `#${day.toString()}`);
        let payload;

        payload = {PM: this.checkboxesCrossed(), done: this.itemsDone(), timestamp: serverTimestamp()};
    
        // if (dbName === "toDo") {
        //   payload = {toDoItem: this.state.value, done: 0, timestamp: serverTimestamp()};
        // } else {
        //   payload = {idea: this.state.value, timestamp: serverTimestamp(), hide: 0};
        // }
    
        // await setDoc(docRef, payload);
    
        // // this.setState({value: "Saved! Anything else?"});  
        // document.querySelector('#notepad').value = "";
        // document.querySelector('#notepad').placeholder = "Saved! Anything else?";
        // console.log('docRef is: ' + docRef.data())
        // return docRef
        await setDoc(docRef, payload);
      }


    async getItemsDone() {
        const docRef = doc(db, 'Days', `#${this.getTimeRemaining()}`);
        const docSnapshot = await getDoc(docRef)
        const data = docSnapshot.data();
        console.log(data.done)
        return data.done;
    }

    render() {
        return (
            <div> <button onClick={()=>{this.addDayToFirebase()}}>Add</button> 
                | Day #<u>{ this.getTimeRemaining()}</u> | PM: {this.checkboxesCrossed()} 
                <button onClick={()=>{this.getItemsDone()}}>Get</button>
            
               <br/> 
            
            </div>
        );
    }

    componentDidMount() {
        // Paste your code here.
        const oneSecond = 1000;
        setInterval(() => {
        this.setState({ date: new Date() });
        }, oneSecond);
    }
}
