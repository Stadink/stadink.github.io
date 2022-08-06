// Whatever, idk
import { Link } from "react-router-dom";
import React, { setState, useState, useEffect } from 'react';
import ColorPalette from "./ColorPalette";
import db from '../Sandbox/firebase';
import { collection, onSnapshot, arrayUnion, updateDoc, doc, query} from '@firebase/firestore';

export const Footer = () => {
  const [colors, setColors] = useState([{ colors: ["Loading..."]}]);

  const collectionRef = collection(db, "Colors");
  const q = query(collectionRef);

  useEffect(() => 
      onSnapshot(q, (snapshot) =>
          setColors(snapshot.docs.map(doc => doc.data()))
          ),
      []
  );

  const randomSavedColor = () => {
    const random = Math.floor(Math.random() * colors['0'].colors.length);
    const color = colors['0'].colors[random];
    console.log(color);
    document.body.style.backgroundColor = color;
  }


    const randomColor = () => {
        var color = '#';
        var letters = '0123456789ABCDEF';
        
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color);
        document.body.style.backgroundColor = color;
        // document.getElementById("colorName").innerText = color;
    }

 


    useEffect(
        () => {
            randomColor();
        }
    )
    

  return (
    <div id="footer">
      <ColorPalette />
      <br />
      <Link to="/build">Dashboard</Link>   | 
      <Link to="/tarot">Tarot</Link>   | 
      <Link to="/chemistry">Chemistry</Link> |
      <Link to="/stocks">Stocks</Link> |
      <Link to="/whatEats">WhatEats</Link> |
      <Link to="/dreams">Dreams</Link> |
      <Link to="/art">Art</Link> |
      <br />
      <br />
      <button onClick={() => randomSavedColor()}>Random color</button>
    </div>
  );
};
