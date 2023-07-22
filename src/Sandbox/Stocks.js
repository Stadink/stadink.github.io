import React from 'react';
import data from './data.json'

export class Stocks extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          src: `https://logo.clearbit.com/aaa.com`,
          num: '123',
          company: '123',
          symbol: '123',
          price: '123',
          marketCap: '123',
          sector: '123',
          industry: '123'            
      };

      this.setRandomNum = this.setRandomNum.bind(this) 
    }

  setRandomNum() { 
      const randomNum = Math.floor(Math.random()*949);
      let name = data[randomNum]['Company name']
      let company = name.replace(/\s/g, ''); // remove spaces
      company = company.replace('.com',''); // remove .com
      const abbreviation = data[randomNum].Symbol
      const price = data[randomNum]['Price (USD)']
      const marketCap = data[randomNum]['Market cap (In millions)'].split(',')[0]
      const sector = data[randomNum].Sector
      const industry = data[randomNum].Industry

      this.setState({ 
        src: `https://logo.clearbit.com/${company}.com`,
        num: randomNum,
        company: company,
        symbol: abbreviation,
        price: price,
        marketCap: marketCap,
        sector: sector,
        industry: industry   
      })
    }

  render() {
    return (
      <div id="image">
          {this.state.num}&nbsp; 
          
          <a    
                href={'https://www.google.com/search?q='+this.state.company}
                target="_blank" rel="noreferrer">{this.state.company}</a> 
          
          &nbsp;[ <a    
                href={'https://www.google.com/search?q='+this.state.symbol}
                target="_blank" rel="noreferrer">{this.state.symbol}</a> ] 
          <br />
          <img onClick={this.setRandomNum} id="stockImg" src={this.state.src} alt='stock logo'/>
      
          <div id="answerButtons">
            <button onClick={this.setRandomNum} id="artButton" class="button button1">Art</button>
            <button id="notArtButton" class="button button2">Not Art</button>
          </div>
          <br/>Market Cap: {this.state.marketCap} billions
          <hr />{this.state.sector} | {this.state.industry}

          {/* <br/><br/>[graph here would be really nice] */}
          <br/><br/> Price: {this.state.price}

          
      </div>
    );
  }
  componentDidMount() {
    this.setRandomNum()
  }
}
