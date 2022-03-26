// Whatever, idk
import { Link } from "react-router-dom";
import React, { setState, useState, useEffect } from 'react';


export const Footer = () => {

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
      <br />
      <Link to="/build">Dashboard</Link>   | 
      <Link to="/tarot">Tarot</Link>   | 
      <Link to="/chemistry">Chemistry</Link> |
      <Link to="/stocks">Stocks</Link> |
      <Link to="/whatEats">WhatEats</Link> |
      <Link to="/dreams">Dreams</Link> |
      <br />
      <br />
      <button onClick={() => randomColor()}>Random color</button>
    </div>
  );
};
