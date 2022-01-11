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

    const getURL = () => { 
        const URL = "https://drive.google.com/file/d/0ByAPpaltspWteG1xZi1hU3ljUDg/view?mc_cid=b0ac365ac0&mc_eid=1f0a85948e&resourcekey=0-LNZpCN1MLVqDXwtWEG_5KA";
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
        <h3>Week #{getWeekNumber()}: <a href={getURL()} target="_blank"> {data.map(item => (<text>{item.Lesson12}</text> )) }</a> </h3> 

        {/* <details>
            <summary><b><u>Day {getDayNumber()}:</u></b></summary>
            <h1>{JSON.stringify(data)}</h1>
            <button onClick={ () => getWeekLesson() }>Console log</button>
        </details> */}

        {/* {data.map(item => (<h2>{item[`Day #${getDayNumber()}`]}</h2> ))} */}
        <b>WEEK WORK:</b> <br />
            A. From time to time, challenge the belief that there is such a thing as a mind, and notice what happens when you do.  <br /><br />
            B. Consider the statement: the world is held as your thoughts and feelings about it, and those are held to be correct. Open up to the possibility that what is real and occurring may not be what you think and feel it is.
            <br /><br />
            C. Main work: Notice that the feedback you get (judgements, assessments, interpretations) from your interactions reinforces where you are coming from. Try to work out and become conscious of this reinforcing cycle as it occurs within your daily experience.  <br /><br />

            D. Special Assignment: Once during the week, find some shit (actual excrement) and
notice any repulsion to it. Then concentrate on it until you can create the feeling of
desire in relation to the shit. Notice what you go through to do so, and what happens
when you do. Don't try to fit this into any framework or the rest of your week's work, just
do it and observe what happens. <br /><br />

            Day Seven: Writing exercise on this week's work <br /><br />


            <br /><br />

    </div>
  );
}

