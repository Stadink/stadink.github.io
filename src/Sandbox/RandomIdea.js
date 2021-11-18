import React from 'react';

export class RandomIdea extends React.Component {
    handleIdea() {
        const newTime = new Date()

        let idea = prompt("What idea did this genius brain generate?", "oh i'm so flattered, the idea is...");
        if (idea != null && idea != "") {   
          fetch('http://willthisdofor.art/api/saveIdea.php?time=' + newTime +  '&idea=' + idea)
        }
      }

  render() {
    return (
        <div id="randomIdea">
            <button id="randomIdeaButton" onClick={() => this.handleIdea()}>Random Idea💡</button>
            <a id="ideasFile" href="https://willthisdofor.art/api/RandomIdeas.txt" target='_blank'>ideas</a>
        </div>
    );
  }
}
