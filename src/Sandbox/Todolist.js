import React, { useState } from 'react';


const toDoList = ['Make auto-toggle', 'Scrape ladirna.cz plants'];

export default function ToDoList() {
  return (
    <div id='toDoList'>
      <p><b><u>To-do list:</u></b></p>
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

