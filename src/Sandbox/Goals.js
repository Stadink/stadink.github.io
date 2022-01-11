import React from 'react';

export class Goals extends React.Component {
    // handleIdea() {
    //     const newTime = new Date()

    //     let idea = prompt("What idea did this genius brain generate?", "oh i'm so flattered, the idea is...");
    //     if (idea != null && idea != "") {   
    //       fetch('http://willthisdofor.art/api/saveIdea.php?time=' + newTime +  '&idea=' + idea)
    //     }
    //   }

  render() {
    return (
        <div style={{'border' : '1px solid white', 'margin-left' : '10px'}} id="Goals">
            <h1><u>Goals</u></h1>

            <input type="checkbox"></input> <h2 style={{'display': 'inline'}} >Ralston's CAP</h2><br />
            <input type="checkbox"></input> <h2 style={{'display': 'inline'}} >Own 1 share of Tesla</h2><br />
            <input type="checkbox"></input> <h2 style={{'display': 'inline'}} >Go to USA 🇺🇸</h2><br />
            <input type="checkbox"></input> <h2 style={{'display': 'inline'}} >Buy <a href="http://TheCosmicJoke.com" target="_blank">TheCosmicJoke.com</a></h2><br />

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
  }
}
