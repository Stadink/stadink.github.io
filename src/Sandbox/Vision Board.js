import React from 'react';
import visionBoard from '../img/VisionBoard.png';


export class VisionBoard extends React.Component {
  render() {
    return (
        <div id="VisionBoard">
          <img id="VisionBoardImg" src={visionBoard} alt="visionBoard" />
        </div>
    );
  }
}
