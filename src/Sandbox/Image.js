import React, { useState } from 'react';
import data from './data.json'



export class Image extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          src: require(`../img/2.jpg`).default,
          num: 0,
          company: 'Xenonlord Corporation',
          symbol: 'idk'            
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
      const abbreviation = data[randomNum].Symbol
      const api_key = '373a163fab81660785ca5880ef50be1e63025ffbef46c957f33c40a4619f4829'
      const url = `https://serpapi.com/search.json?q=${abbreviation} logo&tbm=isch&ijn=0&api_key=${api_key}`

      this.setState({ 
        num: randomNum,
        company: name,
        symbol: abbreviation,
        src: `https://logo.clearbit.com/${name}.com`,
      })
    }

  render() {
    return (
      <div id="image">
          {this.state.num}. {this.state.company} [{this.state.symbol}] <br />
          <img onClick={this.setRandomNum} id="artImg" src={this.state.src} />
      
          <div id="answerButtons">
            <button onClick={this.setRandomImage} id="artButton" class="button button1">Art</button>
            <button id="notArtButton" class="button button2">Not Art</button>
          </div>

      </div>
    );
  }

}
