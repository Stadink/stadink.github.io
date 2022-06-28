import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, where, serverTimestamp } from '@firebase/firestore';
import db from './firebase';
// import { Radio, RadioGroup, useRadioState } from "reakit/Radio";

const toDoList = ['Make auto-toggle', 'Scrape ladirna.cz plants & add to Anki'];

export default function ToDoList() {

  const [toDos, setTodo] = useState([{ toDoItem: "Loading...", done: 0, id: "initial" }]);
  const [done, setDoneTodos] = useState([{ toDoItem: "Loading...", done: 1, id: "initial" }]);

  const [table, setTable] = useState('toDo');

  const toDosCollectionRef = collection(db, table);

  const qTodo = query(toDosCollectionRef, orderBy("timestamp", "desc"));
  const qDone = query(toDosCollectionRef, where("done", ">", 0), orderBy("done", "desc"));

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

    const payload = {toDoItem: toDoItem, timestampDone: serverTimestamp(), done: 1, hide: 0};

    setDoc(docRef, payload);
  }

  const hideDoneItem = async (toDoItem) => {
    console.log(toDoItem.id)
    const docRef = doc(db, "toDo", toDoItem.id);
    updateDoc(docRef, { hide: 1 });
  }

  const getToDo2 = async () => {
    setTable('toDo2')
    onSnapshot(qTodo, (snapshotTodo) =>
        setTodo(snapshotTodo.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
    console.log('well todos set I guess well')
  }

  const getToDo1 = async () => {
    setTable('toDo')
    onSnapshot(qTodo, (snapshotTodo) =>
        setTodo(snapshotTodo.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
    console.log('well todos set I guess well')
  }

  return (
    <div id='toDoList'>
      <details open>
      <summary><h2>✅ <b><u>To-do list:</u></b></h2></summary>

      <input checked id="toDo2" onClick={getToDo1} type='radio'></input> 
      {table === 'toDo2' ? 'Backlog' : 'To-do'}
      <input checked id="toDo1" onClick={() => getToDo2()} type='radio'></input> 

      {/* Radio */}

{/* {this.state.table} */}

        {
          toDos.map(item => (
            // <div><input type="checkbox" onChange={setDone.bind(this)} value={ item.toDoItem }/> { item.toDoItem } </div>
            <h3><input type="checkbox" onClick={() => setDone(item.id, item.toDoItem)} /> { item.toDoItem } </h3>
          ))
        } 
        
        </details>
        
        <br />

      <details>
        <summary>Done ▼</summary>
        {
          done.map(item => (
            item.hide == 1 ? null : <div><input type="checkbox" checked/> { item.toDoItem } <button onClick={() => hideDoneItem(item)}>×</button> </div>
          ))
        }
      </details> <br />
    </div>
  );
}

