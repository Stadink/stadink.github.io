import React from 'react'
import Sketch from 'react-p5'

const Pfive = function() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 400).parent(canvasParentRef)
    // p5.createCanvas(displayWidth, displayHeight);
  }
  
  const draw = p5 => {
    let xPos = p5.random(500); // Generate random number between 0 and width
    let yPos = p5.random(400); // Generate random number between 0 and height
    let size = p5.random(10, 101); // Generate random number between 10 and 100

    p5.fill(p5.random(256), p5.random(256), p5.random(256));
    p5.circle(xPos, yPos, size);
  }
  
  return <Sketch setup={setup} draw={draw} />
}

export default Pfive;
