import db from './firebase';
import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, serverTimestamp, getDoc } from '@firebase/firestore';
import React, { useState, useEffect } from 'react';


export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stuffDone: [], daysWrote: [] };
      }
      
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
            idk = document.getElementById('Writing').checked ? itemsDone.push('Writing') : null;
            idk = document.getElementById('Contemplation').checked ? itemsDone.push('Contemplation') : null;
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

    async get10DayDone() {
        let stuffDone = [];
        let daysWrote = [];
        for(let i = 0; i < 10; i++) {
            const docRef = doc(db, 'Days', `#${this.getTimeRemaining() + i }`);
            const docSnapshot = await getDoc(docRef)
            const data = docSnapshot.data();

            console.log(`Data ${i}: ` + JSON.stringify(data))
            if(JSON.stringify(data) !== undefined) {
                stuffDone.push(data.done);
            } else {
                stuffDone.push([]);
            }

            if(JSON.stringify(data) !== undefined) {
                let wroteToday = data.note === undefined ? 'no' : 'yes'
                // console.log('Data.note is: ' + data.note)
                daysWrote.push(wroteToday);
            } else {
                daysWrote.push([]);
            }
        }
        console.log(`StuffDone: ${JSON.stringify(stuffDone)}`)
        this.setState({stuffDone: stuffDone})
        this.setState({daysWrote: daysWrote})
        return '4';
    }



    copyToClipboard() {
        // navigator.clipboard.writeText('\n**Day #' + this.getTimeRemaining() + '**\n\n\n---\n\n');
        // const currentMinute = document.getElementById('minuteNumber').innerHTML();
        let currentMinute;
        if(document.getElementById('minuteNumber') !== null){
            currentMinute = document.getElementById('minuteNumber').innerHTML;
        }
        navigator.clipboard.writeText(currentMinute);
    }

    fillValues() {
        for(let i = 0; i < 10; i++) {
            return <td>❌</td>
        }
    }

    getStatus(task, day) {
        // console.log('Stuff done is: ' + this.state.stuffDone)
        if(this.state.stuffDone[day] === undefined) {
            return '⬜'
        }
        if(this.state.stuffDone[day].toString().includes(task)) {
            return <span class="cursorProgress">✅</span>;
        } else {
            if(day == 0){
                return '⬜';
            } else {
                return <span class="cursorAim">❌</span>;
            }
        }
    }

    getDayNoteStatus(offset) {
        if (this.state.daysWrote[offset] === 'yes') {
            return 'wroteToday'
        }
    }

    getDayNumber(offset) {
        const day = this.getTimeRemaining() + offset;
        let daySelected;;
        if(document.getElementById('DayNum') !== null){
            daySelected = document.getElementById('DayNum').innerHTML;
        }

        if (daySelected === day.toString()) {
            return <span class={this.getDayNoteStatus(offset)}><u><b><i>{day}</i></b></u></span>;
        } else {
            return <span class={this.getDayNoteStatus(offset)}>{day}</span>;
        }
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

          document.querySelector('#notepad').value = dayNote;
        }

        makeNotepadBigger() {
            let width = document.querySelector('#notepad').style.width;
            let height = document.querySelector('#notepad').style.height;
            console.log('w`idth is: ' + document.querySelector('#notepad').style.width );
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
            <div> 
                <details id="TableDiv" onClick={() => { this.get10DayAvg(); this.copyToClipboard(); this.get10DayDone() }}>
                    <summary class="clickable" onClick={()=>this.makeNotepadBigger()}>⏳Day #<u id="DayNum">{ this.getTimeRemaining()}</u> | PM: {this.checkboxesCrossed()}/10 ▼</summary>
                    10 day avg: <b id='lol'>calculating...</b> <br/><br/>

                    <table  id="table">
                        <tr>
                            <th></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(9)}>{ this.getDayNumber(9) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(8)}>{ this.getDayNumber(8) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(7)}>{ this.getDayNumber(7) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(6)}>{ this.getDayNumber(6) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(5)}>{ this.getDayNumber(5) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(4)}>{ this.getDayNumber(4) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(3)}>{ this.getDayNumber(3) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(2)}>{ this.getDayNumber(2) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(1)}>{ this.getDayNumber(1) }</span></th>
                            <th><span class="clickable" onClick={() => this.getDayNote(0)}>{ this.getDayNumber(0) }</span></th>
                        </tr>
                        <tr>
                            <td>Codecademy</td>
                            <td>{this.getStatus('Codecademy', 9)}</td>
                            <td>{this.getStatus('Codecademy', 8)}</td>
                            <td>{this.getStatus('Codecademy', 7)}</td>
                            <td>{this.getStatus('Codecademy', 6)}</td>
                            <td>{this.getStatus('Codecademy', 5)}</td>
                            <td>{this.getStatus('Codecademy', 4)}</td>
                            <td>{this.getStatus('Codecademy', 3)}</td>
                            <td>{this.getStatus('Codecademy', 2)}</td>
                            <td>{this.getStatus('Codecademy', 1)}</td>
                            <td>{this.getStatus('Codecademy', 0)}</td>

                        </tr>
                            <tr>
                            <td>SDS</td>
                            <td>{this.getStatus('SDS', 9)}</td>
                            <td>{this.getStatus('SDS', 8)}</td>
                            <td>{this.getStatus('SDS', 7)}</td>
                            <td>{this.getStatus('SDS', 6)}</td>
                            <td>{this.getStatus('SDS', 5)}</td>
                            <td>{this.getStatus('SDS', 4)}</td>
                            <td>{this.getStatus('SDS', 3)}</td>
                            <td>{this.getStatus('SDS', 2)}</td>
                            <td>{this.getStatus('SDS', 1)}</td>
                            <td>{this.getStatus('SDS', 0)}</td>
                        </tr>
                        <tr>
                            <td>Sport</td>
                            <td>{this.getStatus('Sport', 9)}</td>
                            <td>{this.getStatus('Sport', 8)}</td>
                            <td>{this.getStatus('Sport', 7)}</td>
                            <td>{this.getStatus('Sport', 6)}</td>
                            <td>{this.getStatus('Sport', 5)}</td>
                            <td>{this.getStatus('Sport', 4)}</td>
                            <td>{this.getStatus('Sport', 3)}</td>
                            <td>{this.getStatus('Sport', 2)}</td>
                            <td>{this.getStatus('Sport', 1)}</td>
                            <td>{this.getStatus('Sport', 0)}</td>
                        </tr>
                        <tr>
                            <td>Obsidian</td>
                            <td>{this.getStatus('Obsidian', 9)}</td>
                            <td>{this.getStatus('Obsidian', 8)}</td>
                            <td>{this.getStatus('Obsidian', 7)}</td>
                            <td>{this.getStatus('Obsidian', 6)}</td>
                            <td>{this.getStatus('Obsidian', 5)}</td>
                            <td>{this.getStatus('Obsidian', 4)}</td>
                            <td>{this.getStatus('Obsidian', 3)}</td>
                            <td>{this.getStatus('Obsidian', 2)}</td>
                            <td>{this.getStatus('Obsidian', 1)}</td>
                            <td>{this.getStatus('Obsidian', 0)}</td>
                        </tr>
                        <tr>
                            <td>Read</td>
                            <td>{this.getStatus('Read', 9)}</td>
                            <td>{this.getStatus('Read', 8)}</td>
                            <td>{this.getStatus('Read', 7)}</td>
                            <td>{this.getStatus('Read', 6)}</td>
                            <td>{this.getStatus('Read', 5)}</td>
                            <td>{this.getStatus('Read', 4)}</td>
                            <td>{this.getStatus('Read', 3)}</td>
                            <td>{this.getStatus('Read', 2)}</td>
                            <td>{this.getStatus('Read', 1)}</td>
                            <td>{this.getStatus('Read', 0)}</td>
                        </tr>
                        <tr>
                            <td>Anki</td>
                            <td>{this.getStatus('Anki', 9)}</td>
                            <td>{this.getStatus('Anki', 8)}</td>
                            <td>{this.getStatus('Anki', 7)}</td>
                            <td>{this.getStatus('Anki', 6)}</td>
                            <td>{this.getStatus('Anki', 5)}</td>
                            <td>{this.getStatus('Anki', 4)}</td>
                            <td>{this.getStatus('Anki', 3)}</td>
                            <td>{this.getStatus('Anki', 2)}</td>
                            <td>{this.getStatus('Anki', 1)}</td>
                            <td>{this.getStatus('Anki', 0)}</td>
                        </tr>
                        <tr>
                            <td>Affirmation</td>
                            <td>{this.getStatus('Affirmation', 9)}</td>
                            <td>{this.getStatus('Affirmation', 8)}</td>
                            <td>{this.getStatus('Affirmation', 7)}</td>
                            <td>{this.getStatus('Affirmation', 6)}</td>
                            <td>{this.getStatus('Affirmation', 5)}</td>
                            <td>{this.getStatus('Affirmation', 4)}</td>
                            <td>{this.getStatus('Affirmation', 3)}</td>
                            <td>{this.getStatus('Affirmation', 2)}</td>
                            <td>{this.getStatus('Affirmation', 1)}</td>
                            <td>{this.getStatus('Affirmation', 0)}</td>
                        </tr>
                        <tr>
                            <td>Self-enquiry</td>
                            <td>{this.getStatus('Self-Inquiry', 9)}</td>
                            <td>{this.getStatus('Self-Inquiry', 8)}</td>
                            <td>{this.getStatus('Self-Inquiry', 7)}</td>
                            <td>{this.getStatus('Self-Inquiry', 6)}</td>
                            <td>{this.getStatus('Self-Inquiry', 5)}</td>
                            <td>{this.getStatus('Self-Inquiry', 4)}</td>
                            <td>{this.getStatus('Self-Inquiry', 3)}</td>
                            <td>{this.getStatus('Self-Inquiry', 2)}</td>
                            <td>{this.getStatus('Self-Inquiry', 1)}</td>
                            <td>{this.getStatus('Self-Inquiry', 0)}</td>
                        </tr>
                        <tr>
                            <td><abbr title="One truthful sentence?">Writing</abbr></td>
                            <td>{this.getStatus('Writing', 9)}</td>
                            <td>{this.getStatus('Writing', 8)}</td>
                            <td>{this.getStatus('Writing', 7)}</td>
                            <td>{this.getStatus('Writing', 6)}</td>
                            <td>{this.getStatus('Writing', 5)}</td>
                            <td>{this.getStatus('Writing', 4)}</td>
                            <td>{this.getStatus('Writing', 3)}</td>
                            <td>{this.getStatus('Writing', 2)}</td>
                            <td>{this.getStatus('Writing', 1)}</td>
                            <td>{this.getStatus('Writing', 0)}</td>
                        </tr>
                            <tr>
                                <td>Contemplation</td>
                                <td>{this.getStatus('Contemplation', 9)}</td>
                                <td>{this.getStatus('Contemplation', 8)}</td>
                                <td>{this.getStatus('Contemplation', 7)}</td>
                                <td>{this.getStatus('Contemplation', 6)}</td>
                                <td>{this.getStatus('Contemplation', 5)}</td>
                                <td>{this.getStatus('Contemplation', 4)}</td>
                                <td>{this.getStatus('Contemplation', 3)}</td>
                                <td>{this.getStatus('Contemplation', 2)}</td>
                                <td>{this.getStatus('Contemplation', 1)}</td>
                                <td>{this.getStatus('Contemplation', 0)}</td>
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
