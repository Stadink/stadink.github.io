import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from './firebase';


export default function TranscendingSelf() {

    const [data, setData] = useState([{ lesson: "Loading...", id: "initial"}]);

    const collectionRef = collection(db, "TS exercises");
  
    const q = query(collectionRef);

    useEffect(() => 
        onSnapshot(q, (snapshot) =>
        setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        ),
    []
    );

    const getWeekNumber = () => {
        const total = Date.parse(new Date()) - Date.parse('Oct 19, 2021');
        const days = Math.floor( total/(1000*60*60*24*7) );
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

  return (
    <div id='TranscendingSelf' style={{'border' : '1px solid white'}}>
            <h3>Week #{getWeekNumber()}: {data.map(item => (<b>{item.lesson}</b> ))}</h3> 
            <b><u>Day {getDayNumber()}:</u></b><br/>

            {data.map(item => (<b>{item.day_6}</b> ))}

            {console.log('Data is: ' + JSON.stringify(data))}
            <details>
                <h1>6: {JSON.stringify(data)}</h1>
            </details>
            {/* { parseData()} */}
    </div>
  );
}

