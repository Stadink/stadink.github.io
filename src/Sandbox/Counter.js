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
        let itemsDone = this.itemsDone();
            
        checkboxesCrossed = itemsDone.length;

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
            idk = document.getElementById('Read').checked ? itemsDone.push('Read') : null;
        }
        return itemsDone;
    }

    async addDayToFirebase() {
        const day = this.getTimeRemaining();
        const docRef = doc(db, 'Days', `#${day.toString()}`);
        let payload;

        payload = {PM: this.checkboxesCrossed(), done: this.itemsDone(), timestamp: serverTimestamp()};
    
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
            <div> Day #<u>{ this.getTimeRemaining()}</u> | PM: {this.checkboxesCrossed()}/10
            
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
