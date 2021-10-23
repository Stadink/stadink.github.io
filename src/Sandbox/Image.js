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
      let name = data[randomNum]['Company name']
      let company = name.replace(/\s/g, ''); // remove spaces
      company = company.replace('.com',''); // remove .com
      const abbreviation = data[randomNum].Symbol
      const api_key = '373a163fab81660785ca5880ef50be1e63025ffbef46c957f33c40a4619f4829'
      const url = `https://serpapi.com/search.json?q=${abbreviation} logo&tbm=isch&ijn=0&api_key=${api_key}`

      this.setState({ 
        num: randomNum,
        company: name,
        symbol: abbreviation,
        src: `https://logo.clearbit.com/${company}.com`,
      })
    }

  render() {
    return (
      <div id="image">
          {this.state.num}&nbsp; 
          
          <a    
                href={'https://www.google.com/search?q='+this.state.company}
                target="_blank" >{this.state.company}</a> 
          
          &nbsp;[ <a    
                href={'https://www.google.com/search?q='+this.state.symbol}
                target="_blank" >{this.state.symbol}</a> ] 
          <br />
          <img onClick={this.setRandomNum} id="stockImg" src={this.state.src} />
      
          <div id="answerButtons">
            <button onClick={this.setRandomImage} id="artButton" class="button button1">Art</button>
            <button id="notArtButton" class="button button2">Not Art</button>
          </div>
          <br/>[graph here would be really nice]
          
      </div>
    );
  }
  // componentDidMount() {
  //   // Paste your code here.
  //   const delay = 3000;
  //   setInterval(() => {
  //     this.setRandomImage();
  //   }, delay);
  // }
}
