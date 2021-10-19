import React, { useState } from 'react';


const toDoList = ['Make auto-toggle', 'Eat', 'Shit', 'Die'];

export default function ToDoList() {
  return (
    <div id='toDoList'>
      <p>To-do list:</p>
      {toDoList.map((item)=>(

        <label>
            <input type="checkbox"  />
            {item}
            <br />
        </label>

      ))}
    </div>
  );
}

