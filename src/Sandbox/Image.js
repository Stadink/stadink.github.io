import React, { useState } from 'react';
import data from './data.json'



export class Image extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          src: require(`../img/2.jpg`).default,
          num: 0,
          company: 'idk'            
      };

      this.setRandomNum = this.setRandomNum.bind(this) 
      this.setRandomImage = this.setRandomImage.bind(this) 
    }

  setRandomNum() { 
      const randomNum = Math.floor(Math.random()*3);
      console.log('random num ' + randomNum)
      this.setState({ 
          // src: require(`../img/${randomNum}.jpg`).default  
        src: 'https://logo.clearbit.com/amazon.com'
      })
    }

    setRandomImage() {
      const randomNum = Math.floor(Math.random()*949);
      const name = data[randomNum]['Company name']

      this.setState({ 
        num: randomNum,
        company: name,
        src: `https://logo.clearbit.com/${name}.com`,
      })
    }

  render() {
    return (
      <div id="image">
          {this.state.num} {this.state.company} <br />
          <img onClick={this.setRandomNum} id="artImg" src={this.state.src} />
      
          <div id="answerButtons">
            <button onClick={this.setRandomImage} id="artButton" class="button button1">Art</button>
            <button id="notArtButton" class="button button2">Not Art</button>
          </div>

      </div>
    );
  }

}
