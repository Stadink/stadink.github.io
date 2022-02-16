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
        const URL = "https://drive.google.com/file/d/0ByAPpaltspWtdTlUQ1RUYVVSbHc/view?mc_cid=c752de74b1&mc_eid=1f0a85948e&resourcekey=0-uTMMG1j4dsLEDhJgUV3y7Q";
        return URL
    }

  return (
    <div id='TranscendingSelf' style={{'border' : '1px solid white'}}>
        <h3>Week #{getWeekNumber()}: <a href={getURL()} target="_blank">     MIND AND PERCEPTION     </a> </h3> 

        {/* <details>
            <summary><b><u>Day {getDayNumber()}:</u></b></summary>
            <h1>{JSON.stringify(data)}</h1>
            <button onClick={ () => getWeekLesson() }>Console log</button>
        </details> */}

        {/* {data.map(item => (<h2>{item[`Day #${getDayNumber()}`]}</h2> ))} */}
        <b>WEEK WORK:</b> <br />
            1. Observe:<br />
            How much does your thinking influence or create what you perceive as reality?<br /><br />
            2. As much as you can, observe the application of interpretation and meaning being
added to what you perceive.
            <br /><br />

            Since these happen so fast and you are not used to recognizing them, this may take
some work and you may have to isolate one experience at a time and try to break it
down until you can discern what about it was your interpretation and what was the
meaning you gave it. After doing several of these, you should be able to see the activity
of interpretation and meaning more quickly. Try to reach the point were you can do it
"live," as the perception is happening.<br /><br />

            Day Seven: Writing exercise on this week's work <br /><br />


            <br /><br />

    </div>
  );
}

