import React, { useState } from 'react';
import ToDoList from './Todolist';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

export class Motivation extends React.Component {

  render() {
    return (
        <div id="motivation">
                <details>
                  <summary>Important ▼</summary>
                  What can I do today to 📈 my self-esteem?
                  <div style={{'text-align' : 'right'}}>...to be honest</div>

                  <br/>
                  ⭐ Я люблю себя, хочу для себя лучшего, поэтому...
                </details> <br />

                <Link to="/tarot">Tarot</Link>
            <ToDoList />
        </div>
    );
  }
}
