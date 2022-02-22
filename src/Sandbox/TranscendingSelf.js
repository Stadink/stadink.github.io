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
        const URL = "https://drive.google.com/file/d/0ByAPpaltspWtSmdadlBqVjFpc2c/view?mc_cid=2c00e82ffb&mc_eid=1f0a85948e&resourcekey=0-15KMKsZdTjV1SxvHG_uRgQ";
        return URL
    }

  return (
    <div id='TranscendingSelf' style={{'border' : '1px solid white'}}>
        <h3>Week #{getWeekNumber()}: <a href={getURL()} target="_blank">     WHAT IS AN EMOTION?     </a> </h3> 

        {/* <details>
            <summary><b><u>Day {getDayNumber()}:</u></b></summary>
            <h1>{JSON.stringify(data)}</h1>
            <button onClick={ () => getWeekLesson() }>Console log</button>
        </details> */}

        {/* {data.map(item => (<h2>{item[`Day #${getDayNumber()}`]}</h2> ))} */}
        <b>WEEK'S WORK:</b> <br />
            1. Watch how much you are controlled by circumstances and by your own reactions.<br />
            2. Watch how much you manipulate circumstances and your reactions.<br />
            3. Watch how much you are controlled by your efforts to control circumstances and your reactions.
            <br /><br />

            Day Seven: Writing exercise on this week's work <br /><br />


            <br /><br />

    </div>
  );
}

