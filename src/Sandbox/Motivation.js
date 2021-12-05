import React, { useState } from 'react';
import ToDoList from './Todolist';

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

            <ToDoList />
        </div>
    );
  }
}
