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

    const getWeekLesson = async () => {
        // const docRef = doc(db, 'Transcending Self', `Week #${getWeekNumber()}`);
        const docRef = doc(db, 'Transcending Self', `Week #8`);
        const docSnapshot = await getDoc(docRef)
        const data = docSnapshot.data();
        // const data = await docSnapshot.data();
        // console.log('data is: ' + JSON.stringify(data))
        console.log('data is: ' + JSON.stringify(data.lesson))
        setData({lesson: 'idk'})
        return data.id;
    }

  return (
    <div id='TranscendingSelf' style={{'border' : '1px solid white'}}>
            <h3>Week #{getWeekNumber()}: {data.map(item => (<b>{item.Lesson}</b> ))}</h3> 
            <button onClick={()=>getWeekNumber()}>getWeekNumber</button>
            {/* {data.map(item => (<b>{item[`day ${getDayNumber}`]}</b> ))} */}
            {data.map(item => (<h2>{item.task}</h2> ))}
            {/* <h2>{getWeekLesson()}()</h2> */}

            {/* {console.log('Data is: ' + JSON.stringify(data))} */}

            <details>
                <summary><b><u>Day {getDayNumber()}:</u></b></summary>
                <h1>{JSON.stringify(data)}</h1>
                <button onClick={ () => getWeekLesson() }>Console log</button>
            </details>
            {/* { parseData()} */}
            <br/>
    </div>
  );
}

