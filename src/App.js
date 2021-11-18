import logo from './logo.svg';
import './App.css';
import { Contact } from './Contact';
import { Sandbox } from './Sandbox/Sandbox';
import { Clock } from './Sandbox/Clock';
import { Helmet } from 'react-helmet';
import { collection, onSnapshot } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './Sandbox/firebase';

function App() {

  const [data, setData] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "SDSlog"), (snapshot) =>
        // setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // console.log(snapshot.docs.map(doc => doc.data()))
        setData(snapshot.docs.map(doc => doc.data()))
      ),
    []
  );

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
      {data.map(item => (
        <h1>{item.idea}</h1>
      ))}
    </div>
  );
}

export default App;
