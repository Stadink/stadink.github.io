import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from './firebase';

const toDoList = ['Make auto-toggle', 'Scrape ladirna.cz plants & add to Anki'];

export default function Ideas() {

    const [data, setData] = useState([{ idea: "Loading...", id: "initial" }]);

    const collectionRef = collection(db, "ideas");
    // const collectionRef = collection(db, "SDSlog");
  
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    useEffect(() => 
    onSnapshot(q, (snapshot) =>
      setData(snapshot.docs.map(doc => doc.data()))
    ),
  []
);

  return (
    <div id='Ideas'>
      <h1>💡<u> Firebase ideas:</u></h1>

    {
        data.map(item => (
            <h3>{item.idea}</h3>
        ))
    }
    </div>
  );
}

