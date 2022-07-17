import logo from "./logo.svg";
import "./App.css";
import { Contact } from "./Contact";
import { Sandbox } from "./Sandbox/Sandbox";
import { Clock } from "./Sandbox/Clock";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import db from "./Sandbox/firebase";
import moment from "moment";
import Tarot from "./Tarot/Tarot";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Chemistry } from "./Sandbox/Chemistry";
import { Footer } from "./Sandbox/Footer";
import { Stocks } from "./Sandbox/Stocks";
import ColorPicker from "./Sandbox/ColorPicker";
import { Dreams } from "./Sandbox/Dreams";
import { WhatEats } from "./Sandbox/WhatEats";
import { Art } from './Sandbox/Art'
import { ClockMinutes } from "./Sandbox/ClockMinutes";

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          {/* <title>My Title</title> */}
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <Switch>
          <Route path="/tarot">
            <Tarot />
          </Route>

          <Route path="/chemistry">
            <ColorPicker />
          </Route>

          <Route path="/stocks">
            <Stocks />
          </Route>

          <Route path="/dreams">
            <Dreams />
          </Route>

          <Route path="/art">
            <Art />
          </Route>

          <Route path="/whatEats">
            <WhatEats />
          </Route>

          <Route path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Contact /> 
              <details>
                <summary><ClockMinutes /></summary>
                <Clock />
              </details>
            </header>
            <Tarot />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
