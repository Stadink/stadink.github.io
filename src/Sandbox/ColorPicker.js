import React, { useState } from 'react';
import { Chemistry } from './Chemistry';
// import  Shit from './Playground';


const colorNames = ['Aquamarine', 'BlueViolet', 'Chartreuse', 'CornflowerBlue', 'Thistle', 'SpringGreen', 'SaddleBrown', 'PapayaWhip', 'MistyRose'];

export default function ColorPicker() {
  const [color, setColor] = useState('MistyRose');

 const divStyle = {backgroundColor: color};

  return (
    <div id='colorPicker' style={divStyle}>
      <p>Selected color: {color}</p>
      <Chemistry />
      {colorNames.map((colorName)=>(
        <button 
          style={{'backgroundColor': colorName}}
          onClick={() => setColor(colorName)} 
          key={colorName}>
       	     {colorName}
      	</button>
      ))}
      {/* <Shit /> */}
    </div>
  );
}

