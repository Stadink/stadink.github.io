import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, getDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from '../Sandbox/firebase';
import tarot from '../Tarot/tarot.json';


export default function Tarot() {

    const [data, setData] = useState([{ card: "Loading...", id: "initial" }]);

    const collectionRef = collection(db, "Tarot");
  
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    useEffect(() => 
        onSnapshot(q, (snapshot) =>
            setData(snapshot.docs.map(doc => doc.data()))
            ),
        []
    );

    const newCard = async () => {
        const random = Math.floor(Math.random() * tarot.length + 1);
        console.log('random num is: ' + random);

        const docRef = doc(db, "Tarot", random.toString());
        const cardInfo = await getDoc(docRef);

        const card = cardInfo.data().card;
        console.log('card is: ' + card)
        const meaning = cardInfo.data().meaning;
        console.log('meaning is: ' + meaning)

        document.getElementById('cardImg').src = `https://willthisdofor.art/tarot/pics/${card}.jpg`;
        document.getElementById('card').innerHTML = card;
        document.getElementById('meaningTarot').innerHTML = meaning;
    }

    const editMeaning = () => {
        let editing = document.getElementById('meaningTarot').contentEditable;

        if (editing == 'false') {
          document.getElementById('meaningTarot').contentEditable = true;
          console.log('2. editing is: ' + editing);
          document.getElementById('meaningTarot').style['text-decoration']='underline';
          document.getElementById('saveButton').innerHTML = '💾'
        } else {
          document.getElementById('meaningTarot').contentEditable = false;
          console.log('3. editing is: ' + editing);
          document.getElementById('meaningTarot').style['text-decoration']='none';
          document.getElementById('saveButton').innerHTML = '✏️'
        }

    }


  return (
    <div id='Tarot'>
      <h1><u>Tarot</u></h1>
        <img id='cardImg' onClick={() => newCard()} src='https://willthisdofor.art/tarot/pics/4_Emperor.jpg' alt="tarot" /> <br />
        {/* <button class='button' onClick={() => newCard()}>new</button> */}
        <h1 id="card">idk</h1>
        <details open>
          <summary>▼</summary> <br />
          <h2 id="meaningTarot" contenteditable="false">idk</h2> <button id="saveButton" onClick={ () => { editMeaning() }}>✏️</button>
        </details>
        <br /><br /><br /><br />

    </div> 
  );
}

