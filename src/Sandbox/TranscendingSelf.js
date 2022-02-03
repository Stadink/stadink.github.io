import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, getDoc, updateDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from './firebase';


export default function TranscendingSelf() {

    const [data, setData] = useState([{ lesson: "Loading...", id: "initial"}]);

    const collectionRef = collection(db, "Transcending Self");
  
    const q = query(collectionRef);

    useEffect(() => 
        onSnapshot(q, (snapshot) =>
        setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        ),
    []
    );

    const getWeekNumber = () => {
        const total = Date.parse(new Date()) - Date.parse('Oct 19, 2021');
        const days = Math.floor(1 + (total/(1000*60*60*24*7)) );
        // console.log('days is: ' + total/1000/60/60/24/7)
        console.log(days)
        return days
    }
    const getDayNumber = () => {
        const total = Date.parse(new Date()) - Date.parse('Oct 19, 2021');
        let days = Math.floor( total/(1000*60*60*24) % 7 );
        
        days = days === 0 ? 7 : days;
        return days
    }
    // const parseData = () => {
    //     const data = JSON.parse(data);
    //     return data.id
    // }
    const printTask = () =>{
        console.log()
    }

    const getWeekLesson = async () => {
        // const docRef = doc(db, 'Transcending Self', `Week #${getWeekNumber()}`);
        const docRef = doc(db, 'Transcending Self', `Lessons`);
        const docSnapshot = await getDoc(docRef)
        const data = docSnapshot.data();
        // const data = await docSnapshot.data();
        // console.log('data is: ' + JSON.stringify(data))
        console.log('data is: ' + JSON.stringify(data.Lesson))
        // setData({lesson: 'idk'})
        // return data.id;
        return JSON.stringify(data.Lesson)
    }

    const getURL = () => { 
        const URL = "https://drive.google.com/file/d/0ByAPpaltspWtS2ppS1k1c0hkNUE/view?mc_cid=74ec7d4aab&mc_eid=1f0a85948e&resourcekey=0-RXJnpZig3vQ4213TnXqMfA";
        return URL
    }

  return (
    <div id='TranscendingSelf' style={{'border' : '1px solid white'}}>
        <h3>Week #{getWeekNumber()}: <a href={getURL()} target="_blank"> {data.map(item => (<text>{item.lesson16}</text> )) }</a> </h3> 

        {/* <details>
            <summary><b><u>Day {getDayNumber()}:</u></b></summary>
            <h1>{JSON.stringify(data)}</h1>
            <button onClick={ () => getWeekLesson() }>Console log</button>
        </details> */}

        {/* {data.map(item => (<h2>{item[`Day #${getDayNumber()}`]}</h2> ))} */}
        <b>WEEK WORK:</b> <br />
            1. Do all of the exercises above and contemplate the questions.
            <br /><br />
            2. Question daily: What are attraction and repulsion? 
            <br /><br />
            3. Choose a day (or two) and attempt to not act out or suppress anything that comes up
for you. Try to fully feel and experience whatever arises internally for you without
suppressing it, ignoring it, or acting on it (i.e. saying something to someone as a
reaction to what they said or did or what you felt, or making gestures, pouting,
screaming, leaving, slamming the door, mumbling, throwing a tantrum, dramatizing your
"suffering," making a comment, etc. etc. etc.). Remember not to suppress these
impulses either, don't try to "be good" or put on an "act" of not acting out, even subtly.
You may communicate or take action, but these have to be distinct from being motivated
by positive or negative emotional or reactive impulses (acting out).
            <br /><br />

            Day Seven: Writing exercise on this week's work <br /><br />


            <br /><br />

    </div>
  );
}

