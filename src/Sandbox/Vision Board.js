import React from 'react';
import visionBoard from '../img/VisionBoard.png';


export class VisionBoard extends React.Component {
  render() {
    return (
        <div id="VisionBoard">
          <a href={visionBoard}>
            <img id="VisionBoardImg" src={visionBoard} alt="visionBoard" />
          </a>
        </div>
    );
  }
}
