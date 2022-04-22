import { Link } from "react-router-dom";
import React, { setState, useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, arrayUnion, updateDoc, getDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from '../Sandbox/firebase';
import moment from 'moment';


export const Dreams = () => {

  const [data, setData] = useState([{ Keywords: ["Loading..."], id: ['idk']}]);

  const collectionRef = collection(db, "Dreams");

  const q = query(collectionRef);

  useEffect(() => 
      onSnapshot(q, (snapshot) =>
          setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
          ),
      []
  );

    const randomKeyword = () => {
        console.log('data 0 is: ' + JSON.stringify(data))
        // // console.log(data[0].Keywords[1]);
        const randomNum = Math.floor(Math.random() * data.length);
        const word = data[randomNum].id
        // document.getElementById('randomKeyword').innerHTML = word;
        return word;
        // return 'idk';
    }

    const saveKeyword = async (keyword) => {
      const docRef = doc(db, 'Dreams', 'Keywords');
      let payload = {Keywords: arrayUnion(keyword )};
      await updateDoc(docRef, payload);


      // const keywordExists = data[0].Keywords.includes(keyword)
      // console.log(`${keyword} is in Keywords: ` + keywordExists)
      const timeNow = moment().toString();

      // I fucking hate 'programming' or whatever is that shit that I'm doing right now is
      // I'm very ineffective at doing that
      // My emotions get in the way big time. 
      // Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

      // if (!keywordExists) {
        let payload2 = {count: 1, dates: [timeNow]};
        const docRef2 = doc(db, 'Dreams', keyword);
        await setDoc(docRef2, payload2);

        document.querySelector('#keyword').value = "";
        document.querySelector('#keyword').placeholder = "Saved! Another one?";    
    }

    const setNewRandomKeyword = () => {
      // const randomNum = Math.floor(Math.random() * data[0].Keywords.length);
      // const word = data[0].Keywords[randomNum]
      document.getElementById('randomKeyword').innerHTML = randomKeyword();
    }

    const incrementCount = async (keyword) => {
      const docRef = doc(db, 'Dreams', keyword);

      const docSnapshot = await getDoc(docRef)
      const currentCount = await docSnapshot.data().count
      await console.log('CurrentCount is: ' + currentCount)

      const timeNow = moment().toString();
      let payload = {count: currentCount + 1, dates: arrayUnion(timeNow)};
      await updateDoc(docRef, payload);
    }

  return (
    <div id="dreams">
        <br />
        <h1>Did you dream of <u id="randomKeyword">{randomKeyword()}</u> ? </h1>

      <button onClick={() => setNewRandomKeyword()}>Next</button>
      <button onClick={() => incrementCount(document.getElementById('randomKeyword').innerHTML)}>+</button>


      <br /><br />
      <input id="keyword" type="text" placeholder="Add keyword" onSubmit={() => saveKeyword()}/> <button type='submit' onClick={() => saveKeyword(document.getElementById('keyword').value)}>💾</button> <br /><br />
      list of keywords: 

        {   
            // Display sorted by id
            data.map(item => (
              <li>{item.id} <button onClick={() => incrementCount(item.id)}>+</button></li>
            ))
        }


            {/* {
              data['0'].Keywords.map((keyword, index) => (
                <div>
                  <li key={index}>{keyword} <button onClick={() => incrementCount(keyword)}>+</button></li>
                  
                </div>
              ))
            } */}
    </div>
  );
};
