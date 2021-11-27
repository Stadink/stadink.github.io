import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from './firebase';

const toDoList = ['Make auto-toggle', 'Scrape ladirna.cz plants & add to Anki'];

export default function ToDoList() {

  const [toDos, setTodo] = useState([{ toDoItem: "Loading...", done: 0, id: "initial" }]);

  const toDosCollectionRef = collection(db, "toDo");

  const qTodo = query(toDosCollectionRef, orderBy("timestamp", "desc"));

  useEffect(() => 
      onSnapshot(qTodo, (snapshotTodo) =>
        // setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // console.log(snapshot.docs.map(doc => doc.data()))
        setTodo(snapshotTodo.docs.map(doc => doc.data()))
      ),
    []
  );

  return (
    <div id='toDoList'>
      <p><b><u>To-do list:</u></b></p>

      {
        toDos.map(item => (
          <div><input type="checkbox"  checked={item.done ? 'yes' : ''}/> { item.toDoItem } </div>
        ))
      } <br />
    </div>
  );
}

