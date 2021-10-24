import React from 'react'
import Sketch from 'react-p5'

const Squares = function() {
  const width = 500;
  const height = 400;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
    // p5.createCanvas(displayWidth, displayHeight);
  }
  
  const draw = p5 => {
    p5.background(0);

    // Moves rectangle to center of canvas
    p5.translate(width / 2, height / 2);

    // Creates multiple rotating rectangles
    for (let x = 500; x > 0; x -= 5) {
        // Makes height the same as width so it's a square
        let y = x;
        p5.strokeWeight(0.5);
        p5.rotate(p5.radians(p5.frameCount / 50));
        p5.fill(255, x, 255);
        p5.rect(0, 0, x, y);
    }
  }
  
  return <Sketch setup={setup} draw={draw} />
}

export default Squares;
