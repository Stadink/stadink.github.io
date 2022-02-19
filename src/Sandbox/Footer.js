// Whatever, idk
import { Link } from "react-router-dom";

export const Footer = () => {

    const randomColor = () => {
        var color = '#';
        var letters = '0123456789ABCDEF';
        
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color);
        document.body.style.backgroundColor = color;
        // document.getElementById(selector).style.backgroundColor = color;
    }

  return (
    <div id="footer">
      <br />
      <Link to="/">Dashboard</Link>   | 
      <Link to="/tarot">Tarot</Link>   | 
      <Link to="/chemistry">Chemistry</Link> |
      <Link to="/stocks">Stocks</Link> |
      <Link to="/whatEats">WhatEats</Link>
      <br />
      <br />
      <button onClick={() => randomColor()}>Random color</button>
    </div>
  );
};
