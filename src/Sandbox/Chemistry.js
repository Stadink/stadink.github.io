import React, { useState } from 'react';
import chemicals from './chemicals.json';


export class Chemistry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: "https://psychonautwiki.org/w/thumb.php?f=DMT.svg&width=960",
            chemical: "DMT"      
        };
  
        this.setChemical = this.setChemical.bind(this) 
        this.getRandomChemical = this.getRandomChemical.bind(this) 
      }

    //   const [input, setInput] = useState(chemical);

    //   const changeHandle = e => {
    //       setInput(e.target.value)
    //   }

      getRandomChemical(){
        const randomNum = Math.floor(Math.random()*650);
        const chemicalName = chemicals[randomNum].Lysergamides;
        console.log(chemicalName)
        this.setState({
            chemical: chemicalName,
            src: `https://psychonautwiki.org/w/thumb.php?f=${chemicalName}.svg&width=960`
        })
      }

      setChemical(e){
        const query = e.target.querySelector(
            'input[type="chemical"]').value;
        this.setState({
            src: `https://psychonautwiki.org/w/thumb.php?f=${query}.svg&width=960`
        })
        e.target.querySelector('input[type="chemical"]').value = query;
        e.preventDefault();
      }

  render() {
    return (
        <div id="chemistry">
            <img id="imgChemical" src={this.state.src}/> <br />

            <a id="chemical"
                href={'https://psychonautwiki.org/wiki/'+this.state.chemical}
                target="_blank" >{this.state.chemical}</a> <br />

            <form action="#" onSubmit={this.setChemical}>
                <input 
                    type="chemical" 
                    defaultValue={this.state.chemical} 
                    onChange={e => this.setState({ text: e.target.value })}
                />
                <input type="submit" />
            </form>

            <button onClick={this.getRandomChemical}>Random</button>

        </div>
    );
  }
  // componentDidMount() {
  //   // Paste your code here.
  //   const delay = 3000;
  //   setInterval(() => {
  //       this.getRandomChemical();
  //   }, delay);
  // }
}