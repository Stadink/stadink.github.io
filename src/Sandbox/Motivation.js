import React, { useState } from 'react';
import ToDoList from './Todolist';

export class Motivation extends React.Component {

  render() {
    return (
        <div id="motivation">
            What can I do today to be satisfied with this day ending?
            <ToDoList />
            <p>Week #1 Thoughts/emotions/perceptions?</p>
        </div>
    );
  }
}
