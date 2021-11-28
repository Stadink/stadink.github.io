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
        document.getElementById('meaning').innerHTML = meaning;
    }


  return (
    <div id='Tarot'>
      <h1><u>Tarot</u></h1>
        <img id='cardImg' src='https://willthisdofor.art/tarot/pics/4_Emperor.jpg' alt="tarot" /> <br />
        <button class='button' onClick={() => newCard()}>new</button>
        <p id="card">idk</p>
        <p id="meaning">idk</p>
    </div> 
  );
}

