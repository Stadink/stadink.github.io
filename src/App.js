import logo from "./logo.svg";
import "./App.css";
import { Contact } from "./Contact";
import { Helmet } from "react-helmet";
import React from "react";
import Tarot from "./Tarot/Tarot";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "./Sandbox/Footer";
import { Stocks } from "./Sandbox/Stocks";
import ColorPicker from "./Sandbox/ColorPicker";
import { Dreams } from "./Sandbox/Dreams";
import { WhatEats } from "./Sandbox/WhatEats";
import { Art } from './Sandbox/Art';
import { New } from './Sandbox/New';
import { Loc } from './LOC/Loc';
import { ClockMinutes } from "./Sandbox/ClockMinutes";
import { DailyStoic } from "./Sandbox/DailyStoic";

function App() {
  return (
    <Router>
      <main className="App">
        <Helmet>
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <script src="https://unpkg.com/@rdkit/rdkit@2023.3.1-1.0.1/dist/RDKit_minimal.js"></script>
        </Helmet>
        <Switch>
          <Route path="/tarot">
            <Tarot />
          </Route>

          <Route path="/dailyStoic">
            <DailyStoic />
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

          <Route path="/new">
            <New />
          </Route>

          <Route path="/loc">
            <Loc />
          </Route>

          <Route path="/whatEats">
            <WhatEats />
          </Route>

          <Route path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Contact /> 
              <ClockMinutes />
            </header>
          </Route>
        </Switch>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
