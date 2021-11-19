import logo from './logo.svg';
import './App.css';
import { Contact } from './Contact';
import { Sandbox } from './Sandbox/Sandbox';
import { Clock } from './Sandbox/Clock';
import { Helmet } from 'react-helmet';
import { collection, onSnapshot, setDoc, doc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './Sandbox/firebase';
import moment from 'moment';

function App() {

  const [data, setData] = useState([{ idea: "Loading...", id: "initial" }]);

  useEffect(
    () =>
      onSnapshot(collection(db, "SDSlog"), (snapshot) =>
        // setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // console.log(snapshot.docs.map(doc => doc.data()))
        setData(snapshot.docs.map(doc => doc.data()))
      ),
    []
  );

  const handleNew = async () => {
    const notepadText = document.querySelector('#notepad').innerHTML;

    const docRef = doc(db, "SDSlog", moment().toString());
    const payload = {idea: notepadText}
    await setDoc(docRef, payload);

  }

  return (
    <div className="App">
      <Helmet>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        {/* <title>My Title</title> */}
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Contact />
        <Clock />
      </header>
      {/* <button onClick={() => db.collection("SDSlog").add({ idea: "New Idea" })}>Add</button>  // good try copilot, but it didn't work*/}

      <button className="button" onClick={handleNew}>New</button>
      {data.map(item => (
        <h1>{item.idea}</h1>
      ))}
    </div>
  );
}

export default App;
