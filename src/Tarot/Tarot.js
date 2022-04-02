import React, { setState, useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, arrayUnion, updateDoc, getDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from '../Sandbox/firebase';
import tarot from '../Tarot/tarot.json';


export default function Tarot() {

    const [data, setData] = useState([{ colors: ["Loading..."]}]);

    const collectionRef = collection(db, "Colors");
  
    const q = query(collectionRef);

    useEffect(() => 
        onSnapshot(q, (snapshot) =>
            setData(snapshot.docs.map(doc => doc.data()))
            ),
        []
    );

    useEffect(
      () => {
          newCard();
      }
  )

    const newCard = async () => {
        const random = Math.floor(Math.random() * tarot.length + 1);
        console.log('random num is: ' + random);

        const docRef = doc(db, "Tarot", random.toString());
        const cardInfo = await getDoc(docRef);

        let card = cardInfo.data().card;
        console.log('card is: ' + card)
        const meaning = cardInfo.data().meaning;
        console.log('meaning is: ' + meaning)

        card = card.replace('Pents', 'Coins');
        card = card.replace(/[1-9][0-9]_/, '');
        card = card.replace(/[0-9]_/, '');
        card = card.replace('0', '');
        card = card.replace('Hanged_Man', 'TheHangedMan');
        card = card.replace('Hierophant', 'TheHierophant');
        card = card.replace('World', 'TheWorld');
        card = card.replace('High_Priestess', 'HighPriesess');
        card = card.replace('Emperor', 'TheEmperor');
        card = card.replace('Chariot', 'TheChariot');
        card = card.replace('11', 'Page');
        card = card.replace('12', 'Knight');
        card = card.replace('13', 'Queen');
        card = card.replace('14', 'King');
        card = card.replace('SwordsKnight', 'KnightOfSwords');

        document.getElementById('cardImg').src = `https://willthisdofor.art/tarot/NFT/imgs/${card}.png`;

        let cardSearch = card.replace(/[0-9]/, '');

        cardSearch = cardSearch.replace('King', '');
        cardSearch = cardSearch.replace('Knight', '');
        cardSearch = cardSearch.replace('Queen', '');
        cardSearch = cardSearch.replace('Page', '');

        document.getElementById('card').innerHTML = `<a id="cardLink" href=https://crypto.com/nft/marketplace?search=${cardSearch} target="_blank">${card}</a>`;
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


    const setColor = (color) => {
      document.body.style.backgroundColor = color;
    }

    const saveColor = async () => {
      const docRef = doc(db, 'Colors', 'Tarot');
      // const color = document.getElementById('colorName').innerText;
      const color = document.body.style.backgroundColor ;
      let payload = {colors: arrayUnion(color)};
      
      // console.log(data[0].colors);
      // setState({colors: data[0].colors});
      // console.log(this.state.colors)
      // console.log(data.colors)
      await updateDoc(docRef, payload);
    }


  return (
    <div id='Tarot'><br />
        <img id='cardImg' onClick={() => newCard()} src='https://willthisdofor.art/tarot/pics/4_Emperor.jpg' alt="tarot" /> <br />
        {/* <button class='button' onClick={() => newCard()}>new</button> */}
        <h1 id="card">idk</h1>
        <details open>
          <summary>▼</summary> <br />
          <h2 id="meaningTarot" contenteditable="false">idk</h2> <button id="saveButton" onClick={ () => { editMeaning() }}>✏️</button>
        </details>
        <br /><br /><br /><br />
        <br />
        <br />
        {   
            data['0'].colors.map((color, index) => (
              <button onClick={() => setColor(color)} style={{backgroundColor: color}} key={index}>⠀</button>
            ))
        }
          {/* <button><u id="colorName">#9A9CA7 </u></button> */}
        <button onClick={() => saveColor()}>💾</button>
    </div> 
  );
}

