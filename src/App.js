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
import Tarot from './Tarot/Tarot';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {


  return (
    <div className="App">
      <Helmet>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        {/* <title>My Title</title> */}
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>


      <BrowserRouter>
        <Switch>
          <Route path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Contact />
              <Clock />
            </header>
            <Tarot />
          </Route>
          <Route path="/tarot">
            <Tarot />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
