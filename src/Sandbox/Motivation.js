import React, { useState } from 'react';
import ToDoList from './Todolist';

export class Motivation extends React.Component {

  render() {
    return (
        <div id="motivation">
            What can I do today to be satisfied with this day ending? <br/>
            <input type="checkbox"  /> <a href='https://www.codecademy.com/learn' target="_blank">Codecademy</a> <br/>
            <input type="checkbox"  /> SDS
            <ToDoList />
            <p>Week #1 Thoughts/emotions/perceptions?</p>
            What can I do today to 📈 my self-esteem?
        </div>
    );
  }
}
