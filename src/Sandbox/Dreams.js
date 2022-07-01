import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  setDoc,
  arrayUnion,
  updateDoc,
  getDoc,
  doc,
  query,
} from "@firebase/firestore";
import db from "../Sandbox/firebase";
import moment from "moment";
import { DreamsNotepad } from "./DreamsNotepad";

export const Dreams = () => {
  const [data, setData] = useState([{ Keywords: ["Loading..."], id: ["idk"] }]);

  const collectionRef = collection(db, "Dreams");

  const q = query(collectionRef);

  const [keyword, setKeyword] = useState('-');
  const [note, setNote] = useState('-');

  useEffect(
    () =>
      onSnapshot(q, (snapshot) =>
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const randomKeyword = () => {
    // console.log('data 0 is: ' + JSON.stringify(data))
    // // console.log(data[0].Keywords[1]);
    const randomNum = Math.floor(Math.random() * data.length);
    const word = data[randomNum].id;
    // document.getElementById('randomKeyword').innerHTML = word;
    // setKeyword(word)
    // setNote(data[randomNum].)
    return word;
    // return 'idk';
  };

  const saveKeyword = async (e) => {
    e.preventDefault();

    const keyword = document.querySelector("#keyword").value;

    const docRef = doc(db, "Dreams", "Keywords");
    let payload = { Keywords: arrayUnion(keyword) };
    await updateDoc(docRef, payload);

    const timeNow = moment().toString();
    const keywordExists = JSON.stringify(data).includes(keyword); // THIS WAY TO CHECK IT CAUSES BUGS

    if (!keywordExists) {
      let payload2 = { count: 1, dates: [timeNow] };
      const docRef2 = doc(db, "Dreams", keyword);
      await setDoc(docRef2, payload2);

      document.querySelector("#keyword").value = "";
      document.querySelector("#keyword").placeholder = "Saved! Another one?";
    } else {
      await incrementCount(keyword);

      document.querySelector("#keyword").value = "";
      document.querySelector("#keyword").placeholder =
        "count++, Anything else?";
    }
  };

  const setNewRandomKeyword = () => {
    // const randomNum = Math.floor(Math.random() * data[0].Keywords.length);
    // const word = data[0].Keywords[randomNum]
    document.getElementById("randomKeyword").innerHTML = randomKeyword();
  };

  const incrementCount = async (keyword) => {
    const docRef = doc(db, "Dreams", keyword);

    const docSnapshot = await getDoc(docRef);
    console.log("docSnapshot.data is: " + JSON.stringify(docSnapshot.data()));
    const currentCount = await docSnapshot.data().count;
    await console.log("CurrentCount is: " + currentCount);

    const timeNow = moment().toString();
    let payload = { count: currentCount + 1, dates: arrayUnion(timeNow) };
    await updateDoc(docRef, payload);
  };

  // const getNote = async () => {
  //   const docRef = doc(db, "Dreams", keyword);
  //   const docSnapshot = await getDoc(docRef);
  //   const note = await docSnapshot.data().note;
  //   setNote('aaa wtf')

  //   return 'fuck';
  // }

  const getNote = () => {

    const randomNum = Math.floor(Math.random() * data.length);
    const word = data[randomNum].id

    return JSON.stringify(data);
  }

  const getNotepad = () => {
    return <DreamsNotepad dates={[keyword]} count={keyword} keyword={keyword} note={randomKeyword()}/>
  }

  const stripSpaces = (keyword) => {
    const stripped = keyword.toString().replace(/\s/g, '')
    return stripped
  }

  return (
    <div id="dreams">
      <br />

      <details style={{ display: 'inline-block'}}>
        <summary>    <h1>    Did you dream of <u onClick={() => getNote()} id="randomKeyword">{randomKeyword()}</u> ?{" "}</h1></summary>
        {/* {JSON.stringify(data)} */}
        {getNotepad()}
      </details>

      <br />
      
      <button onClick={() => setNewRandomKeyword()}>Next</button>
      <button
        onClick={() =>
          incrementCount(document.getElementById("randomKeyword").innerHTML)
        }
      >
        +
      </button>
      <br />
      <br />
      <form onSubmit={(e) => saveKeyword(e)}>
        <input id="keyword" type="text" placeholder="Add keyword" />
        <button type="submit" onClick={(e) => saveKeyword(e)}>
          💾
        </button>{" "}
        <br />
        <br />
      </form>
      <b>Keywords:</b>
      <ol>
      {
        // ⬜ Display sorted by id
        data.map((keyword) => (
          <li>
              <details id={stripSpaces(keyword.id)} style={{ display: 'inline-block'}}>
                <summary>{keyword.id} <button onClick={() => incrementCount(keyword.id)}>+</button></summary>
                <DreamsNotepad dates={[keyword.dates]} count={keyword.count} keyword={keyword.id} note={keyword.note}/>
              </details>
          </li>
        ))
      }
      </ol>
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