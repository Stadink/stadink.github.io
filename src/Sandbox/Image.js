import React, { useState } from 'react';



export class Image extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          src: require(`../img/1.jpg`).default            
      };

      this.setRandomNum = this.setRandomNum.bind(this) 
    }

  setRandomNum() { 
      const randomNum = Math.floor(Math.random()*3);
      console.log('random num ' + randomNum)
      this.setState({ 
          src: require(`../img/${randomNum}.jpg`).default  
        })
  }

  render() {
    return (
      <div id="image">
          <img onClick={this.setRandomNum} id="artImg" src={this.state.src} />
      
          <div id="answerButtons">
            <button onClick={this.setRandomNum} id="artButton" class="button button1">Art</button>
            <button id="notArtButton" class="button button2">Not Art</button>
          </div>

      </div>
    );
  }

}
