import logo from './logo.svg';
import './App.css';
import { Contact } from './Contact';
import { Sandbox } from './Sandbox/Sandbox';
import { Clock } from './Sandbox/Clock';
import { Helmet } from 'react-helmet';
import { collection, onSnapshot, setDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './Sandbox/firebase';
import moment from 'moment';

function App() {

  const [data, setData] = useState([{ idea: "Loading...", id: "initial" }]);

  const collectionRef = collection(db, "SDSlog");

  const q = query(collectionRef, orderBy("timestamp", "desc"));

  useEffect(() => 
      onSnapshot(q, (snapshot) =>
        // setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // console.log(snapshot.docs.map(doc => doc.data()))
        setData(snapshot.docs.map(doc => doc.data()))
      ),
    []
  );

  // async setDone setDone() => {
    
  // }
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
{/* 
      <h1>💡<u> Firebase ideas:</u></h1>

      {
        data.map(item => (
          <h1>{item.idea}</h1>
        ))
      } */}
    </div>
  );
}

export default App;
