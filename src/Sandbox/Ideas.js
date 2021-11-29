import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from './firebase';

const toDoList = ['Make auto-toggle', 'Scrape ladirna.cz plants & add to Anki'];

export default function Ideas() {

    const [data, setData] = useState([{ idea: "Loading...", id: "initial", hide: 0 }]);

    const collectionRef = collection(db, "ideas");
    // const collectionRef = collection(db, "SDSlog");
  
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    useEffect(() => 
    onSnapshot(q, (snapshot) =>
      setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    ),
  []
);

  const hideIdea = async (idea) => {
    console.log(idea)
    const docRef = doc(db, "ideas", idea.id);
    updateDoc(docRef, { hide: 1 });
  }

  return (
    <div id='Ideas'>
      <h1>💡<u> Firebase ideas:</u></h1>

    {
        data.map(item => (
            item.hide == 0 ? <h3>{item.idea} <button onClick={() => hideIdea(item)}>×</button></h3> : null
        ))
    }
    </div>
  );
}

