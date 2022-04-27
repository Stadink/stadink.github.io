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
        const docRef = doc(db, 'Transcending Self', `Lesson`);
        const docSnapshot = await getDoc(docRef)
        // const data = docSnapshot.data();
        const data = await docSnapshot.data();
        // console.log('data is: ' + JSON.stringify(data))
        console.log('data is: ' + JSON.stringify(data))
        setData({lesson: 'idk'})
        // return data.id;
        return JSON.stringify(data.Title)
    }

    const getURL = () => { 
        const URL = "https://drive.google.com/file/d/0ByAPpaltspWtVEZxN2JhRzJBNjA/view?mc_cid=97ff99288b&mc_eid=1f0a85948e&resourcekey=0-4cPU3xdjsbluhjrTDiYd3w";
        console.log('TS data is' + JSON.stringify(data))
        return URL
    }

  return (
    <div id='TranscendingSelf' style={{'border' : '1px solid white'}}>
        <h3>Week #{getWeekNumber()}: <a href={data[0].URL} target="_blank">     {data[0].Title}     </a> </h3> 

        {/* <details>
            <summary><b><u>Day {getDayNumber()}:</u></b></summary>
            <h1>{JSON.stringify(data)}</h1>
            <button onClick={ () => getWeekLesson() }>Console log</button>
        </details> */}

        {/* {data.map(item => (<h2>{item[`Day #${getDayNumber()}`]}</h2> ))} */}
        <b>WEEK'S WORK:</b> <br />
        1. {data[0].task1} <br/><br/>
        2. {data[0].task2} <br/><br/>
        3. {data[0].task3} <br/><br/>
        4. {data[0].task4} <br/><br/>

        5. Do your writing assignment.

        {/* 2. See if you can recognize how your self is as defined by what it's not as it is by what it
is.<br /><br />

        3. From time to time, dwell on the fact that you do not seem to be the creator of reality --
or even of your own existence -- and how this influences your experience of yourself,
your capacity, and your relationship to life (other). */}
            <br /><br />

    </div>
  );
}

