import React, { setState, useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, arrayUnion, updateDoc, getDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from '../Sandbox/firebase';
// import tarot from '../Tarot/tarot.json';
import tarot from '../Tarot/tarot.jsx';
import { FormControl } from 'react-bootstrap';
import { Buttons } from '../Sandbox/Buttons';
// import Toggle from 'react-native-toggle-element';
import ToggleTheme from "react-toggle-theme";
import ColorPalette from '../Sandbox/ColorPalette';
import GPT from '../Sandbox/GPT';


export default function Tarot() {

    const [starred, setStarred] = useState([{ starred: []}]);
    const [currentPic, setCurrentPic] = useState([{ pic: ''}]);
    const [currentCardNum, setCurrentCardNum] = useState([{ currentCardNum: ''}]);
    const [mode, setMode] = useState('new');
    const [getOldCard, setOldCard] = useState('back');
    const [getNewCard, setNewCard] = useState('');

    const [toggleValue, setToggleValue] = useState(false);
    const [currentTheme, setCurrentTheme] = useState("light");

    // useEffect(
    //   () => {
    //       newCard();
    //       getStarred();
    //       // document.getElementById('cardImg').click()
    //   }, []
    // )

    // useEffect(()=>{
    //   setCurrentTheme('dark')
    // })

    // Inside the Tarot component
    useEffect(() => {
      // Update the image source when getOldCard changes
      document.getElementById('cardImg').src = `https://stadink.github.io/build/TarotPics/${getOldCard}.jpg`;
    }, [getOldCard]);



    const newCard = async (num) => {
        if (num === undefined) {
          const random = Math.floor(Math.random() * 78 + 1);
          num = random
        }
        console.log('num is: ' + num);

        const docRef = doc(db, "Tarot", num.toString());
        const cardInfo = await getDoc(docRef);

        let card = cardInfo.data().card;
        let cardOld = card;
        setOldCard(card);
        setCurrentPic(card);
        setCurrentCardNum(num);
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

        // card = card.includes('10') ? card : card.replace('0', '');
        // card = card.replace('TheHanged_Man', 'TheHangedMan');
        // // card = card.replace('Hierophant', 'TheHierophant');
        // // card = card.replace('World', 'TheWorld');
        // card = card.replace('TheHigh_Priestess', 'HighPriestess');
        // card = card.replace('TheWheel_of_Fortune', 'WheelOfFortune');
        // card = card.replace('TheJustice', 'Justice');
        // card = card.replace('TheJudgement', 'Judgement');
        // card = card.replace('TheDeath', 'Death');
        // card = card.replace('TheTemperance', 'Temperance');
        // card = card.replace('TheStrength', 'Strength');
        // card = card.replace('CupsQueen', 'queenscups');
        // card = card.replace('WandsKnight', 'KnightWands');
        // card = card.replace('Hermit', 'TheHermit');
        // card = card.replace('Tower', 'TheTower');
        // card = card.replace('Devil', 'TheDevil');
        // card = card.replace('Star', 'TheStar');
        // card = card.replace('Sun', 'TheSun');
        // card = card.replace('Empress', 'TheEmpress');

        // card = card.replace('SwordsKnight', 'KnightOfSwords');

        setNewCard(card);
        console.log('New card state is: ' + getNewCard);

        let oldStyle = currentTheme === "dark"
        // if (oldStyle) {
        //   document.getElementById('cardImg').src = `https://stadink.github.io/build/TarotPics/${getOldCard}.jpg`;
        // } else {
        //   document.getElementById('cardImg').src = `https://stadink.github.io/build/TarotPics/${getOldCard}.jpg`;
        // }

        // let cardSearch = card.replace(/[0-9]/, '');

        // cardSearch = cardSearch.replace('King', '');
        // cardSearch = cardSearch.replace('Knight', '');
        // cardSearch = cardSearch.replace('Queen', '');
        // cardSearch = cardSearch.replace('Page', '');

        // cardSearch = cardSearch.match(/[A-Z][a-z]+|[0-9]+/g).join("&nbsp;")
        // console.log('cardSearch is: ' + cardSearch)
        // console.log('mode is: ' + mode)
      

        // document.getElementById('card').innerHTML = `<a id="cardLink" href="https://crypto.com/nft/collection/900b1c3c2d27e6ccd5bde953c42c4e4d?search=${nameParser(cardOld, cardSearch, true)}" target="_blank">${'💲 Market'}</a>`;
        // document.getElementById('googleSearch').innerHTML = `<a id="cardLink" href="https://www.google.com/search?q=Tarot ${nameParser(cardOld, cardSearch)}" target="_blank">${'Google 🔍'}</a>`;
        document.getElementById('meaningTarot').innerHTML = meaning;
    }



    const nameParser = (card, cardSearch, market) => {
        const split = card.split(/([0-9]+)/)
        console.log('split is: ' + split)

        let type = split[0]
        type = type.replace('Pents', 'Coins');

        let num = split[1]

        num = num.replace('11', 'Page');
        num = num.replace('12', 'Knight');
        num = num.replace('13', 'Queen');
        num = num.replace('14', 'King');
        num = num.replace('01', 'Ace');

        num = num.includes('10') ? num : num.replace('0', '');

        if(type === ''){
          cardSearch = market ? cardSearch.replace('The&nbsp;', ''): cardSearch;
          console.log('cardSearch is: ' + cardSearch)
          return cardSearch
        } else {
          return num + ' of ' + type
        }
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
        saveMeaning();
      }
    }

    const saveMeaning = async () => {
      const docRef = doc(db, "Tarot", currentCardNum.toString());

      const meaning = document.getElementById("meaningTarot").innerHTML;

      const payload = { meaning: meaning}
      await updateDoc(docRef, payload);
    }

    const openSpoiler = () => {
      document.getElementById('spoiler').open = 'true';
    }


    const toggleMode = () => {
      if (currentTheme === 'light') {
        document.getElementById('cardImg').src = `https://stadink.github.io/build/TarotPics/${getOldCard}.jpg`;
      } else {
          // document.getElementById('cardImg').src = `http://the-cosmic-joke.com/tarot/NFT/min/${getNewCard}.jpg`;
        document.getElementById('cardImg').src = `https://stadink.github.io/build/TarotPics/${getOldCard}.jpg`;

      }
    }


    const getStarred = async () => {
      const docRef = doc(db, 'Tarot', 'Starred');
      const docSnapshot = await getDoc(docRef);

      const list = JSON.stringify(docSnapshot.data())
      // const list = docSnapshot.data();

      setStarred(list);
      console.log("docSnapshot.data is: " + list);

      console.log('starred is: ' + JSON.stringify(starred));

      return starred
    }

    const isStarred = (id) => {
      if (starred.includes(id)) {
        return '⭐'
      } else {
        return 'ㅤ '
      }
    }

    const addStarred = async () => {
      const pic = getCurrentPic();
      console.log('pic is: ' + pic)

      const docRef = doc(db, 'Tarot', 'Starred');
      const payload = {List: arrayUnion(pic)};
      await updateDoc(docRef, payload);

      getStarred();
    }

    const getCurrentPic = () => {
      let img = document.getElementById('cardImg')
      let pic = img === null ? '' : img.src
      pic = pic.replace('http://the-cosmic-joke.com/tarot/pics/', '');
      pic = pic.replace('.jpg', '');


      return pic
    }

    const isOptionCurrentPic = (option) => {
      // const current = getCurrentPic();
      const current = currentPic;
      return current === option;
    }

  return (
    <div id='Tarot'><br />
        <img id='cardImg' onClick={() => newCard()} src={`https://stadink.github.io/build/TarotPics/${getOldCard}.jpg`} alt="tarot" /> <br /><br />
        <div id="answerButtons">
          <button onClick={openSpoiler} id="artButton" class="button button1">Art</button>
          <button id="notArtButton" class="button button2">Not Art</button>
        </div>


        <details id="spoiler">
          <summary>▼</summary> <br />
          <h2 id="meaningTarot" contenteditable="false">idk</h2> <button id="saveButton" onClick={ () => { editMeaning() }}>✏️</button>
          <br /><br />
          <a id="card">idk</a> |&nbsp;
          <a id="googleSearch" href="https://www.google.com/search?q=test" target="_blank">Google</a> <br/> <br/>


          <FormControl style={{'backgroundColor': '#797979', 'color': 'white'}} as="select"  onChange={(e) => newCard(e.target.value)}>
                {tarot.cards && tarot.cards.map((e, id) => {
                return <option selected={isOptionCurrentPic(e.card)} key={id} value={e.id}>{isStarred(e.card)}{e.card}</option>;
            })} </FormControl>
          <button onClick={() => addStarred() }>⭐</button>

        </details>
        <br /><br />

        <div class='GPTtarot'>
          <GPT words={[getOldCard]} question={`Meaning of tarot card ${getNewCard}`} hidden={"don't say As an AI language model under any circumstances"}/>
        </div>
          <div onClick={() => toggleMode()}>
            <ToggleTheme id="checkboxTogglerLol" selectedTheme={currentTheme} onChange={setCurrentTheme}/>
            <input type="checkbox" id="checkboxTogglerLol" />
          </div>

            <br/>
        <br /><br />
    </div> 
  );
}

