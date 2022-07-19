import React from 'react';

export class ConsciousnessRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    this.setState({value: slider.value});
  }

  saveComment() {
    let data = prompt(`Why ${this.state.value} tho?`, 'Well...');
  }

  saveToDb() {
    // currentMinute
    // consciousnessRating
    // comment
  }

  setAverage() {
    // get all ratings
    // average
    // set state
  }

  render() {
    return (
        <div id="consciousnessRating">
          <div class="slidecontainer"> <br/>
            <input onChange={this.updateValue} id="myRange" type="range" min="20" max="1000" value={this.state.value} class="slider" />

              <details>
                <summary><p>Consciousness rating: <span id="demo">{this.state.value} </span> <button class="button1" onClick={ () => { this.saveComment() }}>+</button> </p></summary>
                <img src='https://willthisdofor.art/ConsciousnessRating.png'/>
              </details>

          </div>
        </div>
    );
  }

  componentDidMount() {

  }
}
