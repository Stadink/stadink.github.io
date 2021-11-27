import React, { useState } from 'react';
import ToDoList from './Todolist';

export class Motivation extends React.Component {

  render() {
    return (
        <div id="motivation">
            What can I do today to 📈 my self-esteem?
            <div style={{'text-align' : 'right'}}>...to be honest</div>

            <br/>
            ⭐ Я люблю себя, хочу для себя лучшего, поэтому...
            <ToDoList />
        </div>
    );
  }
}
