import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from './firebase';

const toDoList = ['Make auto-toggle', 'Scrape ladirna.cz plants & add to Anki'];

export default function ToDoList() {

  const [toDos, setTodo] = useState([{ toDoItem: "Loading...", done: 0, id: "initial" }]);
  const [done, setDoneTodos] = useState([{ toDoItem: "Loading...", done: 1, id: "initial" }]);

  const toDosCollectionRef = collection(db, "toDo");

  const qTodo = query(toDosCollectionRef, orderBy("timestamp", "desc"));
  const qDone = query(toDosCollectionRef, orderBy("done", "desc"));

  useEffect(() => 
      onSnapshot(qTodo, (snapshotTodo) =>
        // setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // console.log(snapshot.docs.map(doc => doc.data()))
        setTodo(snapshotTodo.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  useEffect(() => 
      onSnapshot(qDone, (snapshotDone) =>
        // setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // console.log(snapshot.docs.map(doc => doc.data()))
        setDoneTodos(snapshotDone.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const setDone = async (id, toDoItem) => {
    // console.log(id)
    const docRef = doc(db, "toDo", id);

    const payload = {toDoItem: toDoItem, timestampDone: serverTimestamp(), done: 1}

    setDoc(docRef, payload);
  }

  return (
    <div id='toDoList'>
      <p><b><u>To-do list:</u></b></p>

      {
        toDos.map(item => (
          // <div><input type="checkbox" onChange={setDone.bind(this)} value={ item.toDoItem }/> { item.toDoItem } </div>
          <div><input type="checkbox" onClick={() => setDone(item.id, item.toDoItem)} /> { item.toDoItem } </div>
        ))
      } <br />

      <details>
        <summary>Done</summary>
        {
          done.map(item => (
            // <div><input type="checkbox" onChange={setDone.bind(this)} value={ item.toDoItem }/> { item.toDoItem } </div>
            <div><input type="checkbox" checked/> { item.toDoItem } </div>
          ))
        }
      </details> <br />
    </div>
  );
}

