import React, { useState, useEffect } from 'react';
import db from '../Sandbox/firebase';
import { collection, onSnapshot, arrayUnion, updateDoc, doc, query} from '@firebase/firestore';


export default function ColorPalette() {
const [colors, setColors] = useState([{ colors: ["Loading..."]}]);
 
const collectionRef = collection(db, "Colors");
  const q = query(collectionRef);

 useEffect(() => 
     onSnapshot(q, (snapshot) =>
         setColors(snapshot.docs.map(doc => doc.data()))
         ),
     []
 );

 const saveColor = async () => {
    // What's the difference between getDoc() and just doc() by the way?
    const docRef = doc(db, 'Colors', 'Tarot');
    const color = document.body.style.backgroundColor ;
    let payload = {colors: arrayUnion(color)};
    
    await updateDoc(docRef, payload);
  }

  const setColor = (color) => {
    document.body.style.backgroundColor = color;
  }

  return (
    <div id='colorPalette'>
        {   
            colors['0'].colors.map((color, index) => (
              <button onClick={() => setColor(color)} style={{backgroundColor: color}} key={index}>⠀</button>
            ))
        }

        <button onClick={() => saveColor()}>💾</button>
    </div>
  );
}

