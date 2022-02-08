import db from './firebase';
import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, serverTimestamp, getDoc } from '@firebase/firestore';
import React, { useState, useEffect } from 'react';


export class Counter extends React.Component {
    getTimeRemaining(){
        const total = Date.parse('May 18, 2045') - Date.parse(new Date());
        // console.log('NEW DATE IS: ' + new Date());
        // console.log('Time left lol: ' + total/(1000*60*60*24));
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
            idk = document.getElementById('Anki').checked ? itemsDone.push('Anki') : null;
            idk = document.getElementById('Affirmation').checked ? itemsDone.push('Affirmation') : null;
            idk = document.getElementById('SelfInquiry').checked ? itemsDone.push('SelfInquiry') : null;
            idk = document.getElementById('MarxCapital').checked ? itemsDone.push('MarxCapital') : null;
            idk = document.getElementById('Contemplation').checked ? itemsDone.push('MarxCapital') : null;
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

    async get10DayAvg() {
        let total = 0;
        for(let i = 0; i < 10; i++) {
            const docRef = doc(db, 'Days', `#${this.getTimeRemaining() + i }`);
            const docSnapshot = await getDoc(docRef)
            const data = docSnapshot.data();

            console.log(`Data ${i}: ` + JSON.stringify(data))
            if(JSON.stringify(data) !== undefined) {
                total += data.PM;
            }
        }
        console.log(`Total: ${total}`)
        document.getElementById('lol').innerHTML = total/10;
        return '4';
    }

    copyToClipboard() {
        navigator.clipboard.writeText('\n**Day #' + this.getTimeRemaining() + '**\n\n\n---\n\n');
    }

    fillValues() {
        for(let i = 0; i < 10; i++) {
            return <td>❌</td>
        }
    }

    render() {
        return (
            <div> 
                <details onClick={() => { this.get10DayAvg(); this.copyToClipboard() }}>
                    <summary>Day #<u>{ this.getTimeRemaining()}</u> | PM: {this.checkboxesCrossed()}/10 ▼</summary>
                    10 day avg: <b id='lol'>calculating...</b>

                    <table  id="table">
                        <tr>
                            <th></th>
                            <th>8510</th>
                            <th>8509</th>
                            <th>8508</th>
                            <th>8507</th>
                            <th>8506</th>
                            <th>8505</th>
                            <th>8504</th>
                            <th>8503</th>
                            <th>8502</th>
                            <th>8501</th>
                        </tr>
                        <tr>
                            <td>Codecademy</td>
                            <td>✅</td>
                            <td>❌</td>
                        </tr>
                            <tr>
                            <td>SDS</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Sport</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Obsidian</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Read</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Anki</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Affirmation</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Self-enquiry</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Marx Capital</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                            <tr>
                                <td>Contemplation</td>
                                {this.fillValues()}
                            </tr>
                    </table>
                </details>
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
