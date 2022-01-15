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
      var meaning = document.getElementById("meaningTarot");
      var saveButton = document.getElementById('saveButton');
      
      if (meaning.contentEditable == 'false') {
        meaning.contentEditable = true;
        meaning.style['text-decoration']='underline';
        meaning.style.fontWeight = 'normal';
        saveButton.innerHTML = '💾'
      } else {
        meaning.contentEditable = false;
        meaning.style['text-decoration']='none';
        meaning.style.fontWeight = 'bold';
        saveButton.innerHTML = '✏️'
      }
    }

    const randomColor = () => {
        var color = '#';
        var letters = '0123456789ABCDEF';
        
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color);
        // document.body.style.backgroundColor = color;
        document.getElementById("Tarot").style.backgroundColor = color;
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
        <button onClick={() => randomColor()}>Random color</button>

    </div> 
  );
}

