import React, { setState, useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, arrayUnion, updateDoc, getDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from '../Sandbox/firebase';
import tarot from '../Tarot/tarot.json';
import { Buttons } from '../Sandbox/Buttons';


export default function Tarot() {

    const [data, setData] = useState([{ colors: ["Loading..."]}]);
    const [mode, setMode] = useState('old');
    const [getOldCard, setOldCard] = useState('');
    const [getNewCard, setNewCard] = useState('');

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
          // document.getElementById('cardImg').click()
      }, []
    )

    const newCard = async () => {
        const random = Math.floor(Math.random() * tarot.length + 1);
        console.log('random num is: ' + random);

        const docRef = doc(db, "Tarot", random.toString());
        const cardInfo = await getDoc(docRef);

        let card = cardInfo.data().card;
        let cardOld = card;
        setOldCard(card);
        console.log('old card state is: ' + getOldCard)
        const meaning = cardInfo.data().meaning;
        console.log('meaning is: ' + meaning)

        card = card.replace('Pents', 'Coins');

        card = card.replace(/[1-9][0-9]_/, 'The');
        card = card.replace(/[0-9]_/, 'The');

        card = card.replace('11', 'Page');
        card = card.replace('12', 'Knight');
        card = card.replace('13', 'Queen');
        card = card.replace('14', 'King');
        card = card.replace('01', 'Ace');

        card = card.includes('10') ? card : card.replace('0', '');
        card = card.replace('TheHanged_Man', 'TheHangedMan');
        // card = card.replace('Hierophant', 'TheHierophant');
        // card = card.replace('World', 'TheWorld');
        card = card.replace('TheHigh_Priestess', 'HighPriesess');
        card = card.replace('TheWheel_of_Fortune', 'WheelOfFortune');
        card = card.replace('TheJustice', 'Justice');
        card = card.replace('TheJudgement', 'Judgement');
        card = card.replace('TheDeath', 'Death');
        card = card.replace('TheTemperance', 'Temperance');
        card = card.replace('TheStrength', 'Strength');
        card = card.replace('CupsQueen', 'queenscups');
        card = card.replace('WandsKnight', 'KnightWands');
        // card = card.replace('Hermit', 'TheHermit');
        // card = card.replace('Tower', 'TheTower');
        // card = card.replace('Devil', 'TheDevil');
        // card = card.replace('Star', 'TheStar');
        // card = card.replace('Sun', 'TheSun');
        // card = card.replace('Empress', 'TheEmpress');

        card = card.replace('SwordsKnight', 'KnightOfSwords');

        setNewCard(card);
        console.log('New card state is: ' + getNewCard);

        let oldStyle = document.getElementById("old").checked
        if (oldStyle) {
          document.getElementById('cardImg').src = `https://willthisdofor.art/tarot/pics/${cardOld}.jpg`;
        } else {
            document.getElementById('cardImg').src = `https://willthisdofor.art/tarot/NFT/min/${card}.jpg`;
        }

        let cardSearch = card.replace(/[0-9]/, '');

        cardSearch = cardSearch.replace('King', '');
        cardSearch = cardSearch.replace('Knight', '');
        cardSearch = cardSearch.replace('Queen', '');
        cardSearch = cardSearch.replace('Page', '');

        cardSearch = cardSearch.match(/[A-Z][a-z]+|[0-9]+/g).join("&nbsp;")
        console.log('cardSearch is: ' + cardSearch)
        // console.log('this.chkbox is: ' + this.state.chkbox)
        console.log('mode is: ' + mode)
      

        document.getElementById('card').innerHTML = `<a id="cardLink" href=https://crypto.com/nft/marketplace?search=${cardSearch} target="_blank">${'💲 Market 🔍'}</a>`;
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

    const openSpoiler = () => {
      document.getElementById('spoiler').open = 'true';
    }

    const changeMode = (mode) => {
      setMode(mode)

      console.log('old card state is: ' + getOldCard)
      console.log('new card state is: ' + getNewCard)
      
      if (mode === 'old') {
        document.getElementById('cardImg').src = `https://willthisdofor.art/tarot/pics/${getOldCard}.jpg`;
      } else {
          document.getElementById('cardImg').src = `https://willthisdofor.art/tarot/NFT/min/${getNewCard}.jpg`;
      }
    }


  return (
    <div id='Tarot'><br />
        <img id='cardImg' onClick={() => newCard()} src='https://willthisdofor.art/tarot/pics/4_Emperor.jpg' alt="tarot" /> <br /><br />
        {/* <button class='button' onClick={() => newCard()}>new</button> */}
        {/* <Buttons /> */}

        <div id="answerButtons">
          <button onClick={openSpoiler} id="artButton" class="button button1">Art</button>
          <button id="notArtButton" class="button button2">Not Art</button>
        </div>


        <details id="spoiler">
          <summary>▼</summary> <br />
          <h2 id="meaningTarot" contenteditable="false">idk</h2> <button id="saveButton" onClick={ () => { editMeaning() }}>✏️</button>
          <br /><br />
          <h3 id="card">idk</h3>
        </details>
        <br /><br />

          <form>
            <input checked={mode === "new"} onClick={() => changeMode('new')} id="nft" name="contact" value="email" type="radio"></input>
            <input checked={mode === "old"} onClick={() => changeMode('old')} id="old" name="contact" value="phone"type="radio"></input>
          </form>

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

