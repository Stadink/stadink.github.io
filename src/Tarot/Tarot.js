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

    const [showResponse, setShowResponse] = useState(true);
    const [question, setQuestion] = useState('Reply like a tarot meaning encyclopedia. What is the meaning of tarot card');
    const [displayQuestionField, setDisplayQuestionField] = useState(false);
    const [prequestion, setPrequestion] = useState('');
    const [postquestion, setPostquestion] = useState('');
    const [hidden, setHidden] = useState('');
    // const [hidden, setHidden] = useState('DO NOT use words «AI language model» UNDER ANY CIRCUMSTANCES');
    const [language, setLanguage] = useState('English');


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
      document.getElementById('cardImg').src = `https://stadink.github.io/build/TarotPics/${
        currentTheme === "dark" ? "Thoth/" : ""
      }${getOldCard}.${currentTheme === "dark" ? "png" : "jpg"}`;
    }, [getOldCard, currentTheme]);

    const toggleLanguage = () => {
      if (language === 'English') {
        setLanguage('Russian')
        setHidden(prev => prev + ', REPLY IN RUSSIAN LANGUAGE');
      } else {
        setLanguage('English');
        setHidden(prev => prev.replace(', REPLY IN RUSSIAN LANGUAGE', ''));
      }
    };

    const newCard = async (num) => {
      setShowResponse(true); 

        if (num === undefined) {
          const random = Math.floor(Math.random() * 78 + 1);
          num = random
        }
        console.log('num is: ' + num);

        const docRef = doc(db, "Tarot", num.toString());
        const cardInfo = await getDoc(docRef);

        let card = cardInfo.data().card;

        setOldCard(card);
        setCurrentPic(card);
        setCurrentCardNum(num);
        const meaning = cardInfo.data().meaning;

        setNewCard(card);

        // let oldStyle = currentTheme === "dark"

        // if (currentTheme === "dark") {
        //   document.getElementById('cardImg').src = `https://stadink.github.io/build/TarotPics/Thoth/${getOldCard}.png`;
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

      setShowResponse(false); 
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

    const toggleQuestionField = () => {
      if (displayQuestionField) {
        newCard();
        setDisplayQuestionField(false);
      } else {
        setDisplayQuestionField(!displayQuestionField);
        setQuestion('')
        setPrequestion('I asked tarot cards «')
        setPostquestion('?» and the card appeared: ')
        setHidden(". What does it mean? Reply like a professional Tarot card reader would")
      }
    };

    const toggleMode = () => {
      if (currentTheme === 'dark') {
        setHidden(prev => prev + "in Alister Crowley's Thoth tarot");
      } else {
        setHidden(prev => prev.replace("in Alister Crowley's Thoth tarot", ''));
      }
    }

    useEffect(() => {
      toggleMode();
    }, [currentTheme]);


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
      <img
        id="cardImg"
        onClick={() => {
          newCard();
        }}
        src={`https://stadink.github.io/build/TarotPics/${
          currentTheme === "dark" ? "Thoth/" : ""
        }${getOldCard}.${currentTheme === "dark" ? "png" : "jpg"}`}
        alt="tarot"
      />
        <details id="spoiler">
          <summary>▼</summary> <br />
          <h2 id="meaningTarot" contenteditable="false">idk</h2> <button id="saveButton" onClick={ () => { editMeaning() }}>✏️</button>
          <br /><br />
          <a id="card">idk</a> |&nbsp;
          <a id="googleSearch" href={`https://www.google.com/search?q=${"Tarot card "+getNewCard+" meaning"}`} target="_blank">Google</a> <br/> <br/>

          <FormControl style={{'backgroundColor': '#797979', 'color': 'white'}} as="select"  onChange={(e) => newCard(e.target.value)}>
                {tarot.cards && tarot.cards.map((e, id) => {
                return <option selected={isOptionCurrentPic(e.card)} key={id} value={e.id}>{isStarred(e.card)}{e.card}</option>;
            })} </FormControl>
          <button onClick={() => addStarred() }>⭐</button>

        </details>
        <br /><br />

        <div class='GPTtarot'>
          <GPT words={[getOldCard]} question={`${prequestion}${question}${postquestion} ${getNewCard} ${hidden}`} showResponse={showResponse} />
        </div>
          
          <br/>
          {displayQuestionField && (<input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />)}
          <button onClick={toggleQuestionField}>❓</button>
          
            <br/>
        <br /><br />

        <button onClick={toggleLanguage} >
          {language === 'Russian' ? '🇷🇺' : '🌍'}
        </button>
        <br /><br />


        <div>
          <ToggleTheme id="checkboxTogglerLol" selectedTheme={currentTheme} onChange={setCurrentTheme}/>
          <input type="checkbox" id="checkboxTogglerLol" />
        </div>

    </div> 
  );
}

