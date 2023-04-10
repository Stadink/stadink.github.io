// Whatever, idk
import { Link } from "react-router-dom";
import React, { setState, useState, useEffect } from 'react';
import ColorPalette from "./ColorPalette";
import db from '../Sandbox/firebase';
import { collection, onSnapshot, arrayUnion, updateDoc, doc, query} from '@firebase/firestore';

export const Footer = () => {
  const [colors, setColors] = useState([{ colors: ["Loading..."]}]);
  const [currentColor, setCurrentColor] = useState('idk');

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
    setCurrentColor(color);
  }


  const randomColor = () => {
      var color = '#';
      var letters = '0123456789ABCDEF';
      
      for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      console.log(color);
      document.body.style.backgroundColor = color;
      setCurrentColor(color)
      // document.getElementById("colorName").innerText = color;
  }

 


  useEffect(
      () => {
          randomColor();
      }, []
  )
    
  function valueToHex(c) {
    var hex = c.toString(16);
    if (hex.length === 1) {
      return '0'+hex
    }
    return hex
  }

  function rgbToHex(rgbString) {
    if (rgbString.includes('#')){
      return rgbString
    }

    let noRgb = rgbString.replace('rgb', '')
    let noBrackets = noRgb.replace('(', '')
    noBrackets = noBrackets.replace(')', '')

    let values = noBrackets.split(',')

    let r = parseInt(values[0])
    let g = parseInt(values[1])
    let b = parseInt(values[2])

    return(valueToHex(r).toUpperCase() + valueToHex(g).toUpperCase() + valueToHex(b).toUpperCase());
  }

  const saveColor = async () => {
    // What's the difference between getDoc() and just doc() by the way?
    const docRef = doc(db, 'Colors', 'Tarot');
    const color = document.body.style.backgroundColor ;
    let payload = {colors: arrayUnion(color)};
    
    await updateDoc(docRef, payload);
  }

  const setColor = (color) => {
    document.body.style.backgroundColor = color;
    setCurrentColor(color)
  }

  return (
    <div id="footer">
      {/* <ColorPalette /> */}
      <div id='colorPalette'>
        {   
            colors['0'].colors.map((color, index) => (
              <button class="clickable" onClick={() => setColor(color)} style={{backgroundColor: color}} key={index}>⠀</button>
            ))
        }

        <button onClick={() => saveColor()}>💾</button>
    </div>
      <br />
      <Link to="/build">Dashboard</Link>   | 
      <Link to="/tarot">Tarot</Link>   | 
      <Link to="/chemistry">Chemistry</Link> |
      <Link to="/stocks">Stocks</Link> |
      <Link to="/whatEats">WhatEats</Link> |
      <Link to="/dreams">Dreams</Link> |
      <Link to="/art">Art</Link> |
      <Link to="/new">New</Link>
      <br />
      <br />
      <button onClick={() => randomSavedColor()}>Random color</button> |
      <a href={'https://www.colorhexa.com/' + rgbToHex(document.body.style.backgroundColor)} target="_blank">{rgbToHex(currentColor)}</a>
    </div>
  );
};
