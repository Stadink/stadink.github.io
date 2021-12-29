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
        const days = Math.floor( total/(1000*60*60*24) % 7 );
        return days
    }
    // const parseData = () => {
    //     const data = JSON.parse(data);
    //     return data.id
    // }
    const printTask = () =>{
        console.log()
    }

    const getURL = () => { 
        const URL = "https://drive.google.com/file/d/0ByAPpaltspWtZ09LVkcxT1lpdkU/view?mc_cid=d452140545&mc_eid=1f0a85948e&resourcekey=0-Uv9Zx996pCMAW67aizGM2A";
        return URL
    }

    const getWeekLesson = async () => {
        // const docRef = doc(db, 'Transcending Self', `Week #${getWeekNumber()}`);
        const docRef = doc(db, 'Transcending Self', `Week #11`);
        const docSnapshot = await getDoc(docRef)
        const data = docSnapshot.data();
        // const data = await docSnapshot.data();
        // console.log('data is: ' + JSON.stringify(data))
        console.log('data is: ' + JSON.stringify(data.Lesson))
        // setData({lesson: 'idk'})
        // return data.id;
        return JSON.stringify(data.Lesson)
    }

  return (
    <div id='TranscendingSelf' style={{'border' : '1px solid white'}}>
        <h3>Week #{getWeekNumber()}: <a href={getURL()} target="_blank"> {data.map(item => (<text>{item.Lesson11}</text> )) }</a> </h3> 

        <details>
            <summary><b><u>Day {getDayNumber()}:</u></b></summary>
            <h1>{JSON.stringify(data)}</h1>
            <button onClick={ () => getWeekLesson() }>Console log</button>
        </details>

        {data.map(item => (<h2>{item[`Day #${getDayNumber()}`]}</h2> ))}
    </div>
  );
}

