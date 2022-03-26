import { Link } from "react-router-dom";
import React, { setState, useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, arrayUnion, updateDoc, getDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from '../Sandbox/firebase';

export const Dreams = () => {

  const [data, setData] = useState([{ Keywords: ["Loading..."]}]);

  const collectionRef = collection(db, "Dreams");

  const q = query(collectionRef);

  useEffect(() => 
      onSnapshot(q, (snapshot) =>
          setData(snapshot.docs.map(doc => doc.data()))
          ),
      []
  );

    const randomKeyword = () => {
        console.log(data[0].Keywords[1]);
        const randomNum = Math.floor(Math.random() * data[0].Keywords.length);
        const word = data[0].Keywords[randomNum]
        // document.getElementById('randomKeyword').innerHTML = word;
        return word;
    }

    const saveKeyword = async (keyword) => {
      const docRef = doc(db, 'Dreams', 'Keywords');
      // const color = document.getElementById('colorName').innerText;
      const color = document.body.style.backgroundColor ;
      let payload = {Keywords: arrayUnion(keyword )};
      
      // console.log(data[0].colors);
      // setState({colors: data[0].colors});
      // console.log(this.state.colors)
      // console.log(data.colors)
      await updateDoc(docRef, payload);
    }

    const setNewRandomKeyword = () => {
      const randomNum = Math.floor(Math.random() * data[0].Keywords.length);
      const word = data[0].Keywords[randomNum]
      document.getElementById('randomKeyword').innerHTML = word;
    }

  return (
    <div id="dreams">
        <br />
        <h1>Did you dream of <u id="randomKeyword">{randomKeyword()}</u> ? </h1>

      <button onClick={() => setNewRandomKeyword()}>Next</button>


      <br /><br />
      <input id="keyword" type="text" placeholder="Add keyword" onSubmit={() => saveKeyword()}/> <button onClick={() => saveKeyword(document.getElementById('keyword').value)}>💾</button> <br /><br />
      list of keywords: 

      {   
            data['0'].Keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))
        }
    </div>
  );
};
