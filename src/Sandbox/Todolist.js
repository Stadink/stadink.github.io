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
    const docRef = doc(db, table, id);

    const payload = {toDoItem: toDoItem, timestampDone: serverTimestamp(), done: 1, hide: 0};

    setDoc(docRef, payload);
  }

  const hideDoneItem = async (toDoItem) => {
    console.log(toDoItem.id)
    const docRef = doc(db, table, toDoItem.id);
    updateDoc(docRef, { hide: 1 });
  }

  const getToDo2 = async () => {
    await setTable('toDo2')
    const toDosCollectionRef = collection(db, 'toDo2');
    const qTodo = query(toDosCollectionRef, orderBy("timestamp", "desc"));

   await onSnapshot(qTodo, (snapshotTodo) =>
         setTodo(snapshotTodo.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )

    console.log('well todos set I guess well')
    await console.log('ToDos are: ' + JSON.stringify(toDos))

    const qDone = query(toDosCollectionRef, where("done", ">", 0), orderBy("done", "desc"));
    await onSnapshot(qDone, (snapshotDone) =>
      setDoneTodos(snapshotDone.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )
  }

  const getToDo1 = async () => {
    setTable('toDo')

    const toDosCollectionRef = collection(db, 'toDo');
    const qTodo = query(toDosCollectionRef, orderBy("timestamp", "desc"));

    await onSnapshot(qTodo, (snapshotTodo) =>
        setTodo(snapshotTodo.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
    console.log('well todos set I guess well')
    console.log('ToDos are: ' + JSON.stringify(toDos))

    const qDone = query(toDosCollectionRef, where("done", ">", 0), orderBy("done", "desc"));
    await onSnapshot(qDone, (snapshotDone) =>
      setDoneTodos(snapshotDone.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )
  }

  return (
    <div id='toDoList'>
      <details open>
      <summary class="clickable"><h2>✅ <b><u>To-do list:</u></b></h2></summary>
      <span class='toDoSection' onClick={getToDo1} style={ table === 'toDo' ? {'text-decoration': 'underline', 'font-weight': 'bold'} : {'text-decoration': 'none', 'font-weight': 'normal'}}>To-do</span> | ‎ 
      <span class='toDoSection' onClick={getToDo2} style={ table === 'toDo2' ? {'text-decoration': 'underline', 'font-weight': 'bold'} : {'text-decoration': 'none', 'font-weight': 'normal'}}>Backlog  ‎ </span> <br />

      {/* <input checked={ table === 'toDo'} id="toDo2" onClick={getToDo1} type='radio'></input> 
      {table === 'toDo2' ? 'Backlog' : 'To-do'}
      <input checked={ table === 'toDo2'} id="toDo1" onClick={getToDo2} type='radio'></input>  */}

      {/* Radio */}

{/* {this.state.table} */}

        {
          toDos.map(item => (
            // <div><input type="checkbox" onChange={setDone.bind(this)} value={ item.toDoItem }/> { item.toDoItem } </div>
            <h3 class="clickable"><input class="cursorAim"type="checkbox" onClick={() => setDone(item.id, item.toDoItem)} /> <span class="cursorDefault">{item.toDoItem}</span></h3>
          ))
        } 
        
        </details>
        
        <br />

      <details>
        <summary class="clickable">Done ▼</summary>
        {
          done.map(item => (
            item.hide == 1 ? null : <div><input type="checkbox" checked/>  <span class="clickable">{item.toDoItem }</span> <button onClick={() => hideDoneItem(item)}>×</button> </div>
          ))
        }
      </details> <br />
    </div>
  );
}

