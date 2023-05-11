import React from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';
import GPT from './GPT';

export class ConsciousnessRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 350,
      word: [],
      comment: '',
      allNumbers: 'aaa fucking none' ,
      allRatings: ['wtf'],
      selectedOption: 'what is'
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.getAllNumbers()
    // this.getAverage();
  }

  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  }


  async getAllRatings() {
      const docRef = doc(db, 'ConsciousnessRating', 'All')
      const docSnapshot = await getDoc(docRef)
      const allRatings = docSnapshot.data();
      
      console.log('Get ratings is: ' + JSON.stringify(allRatings))

      this.setState( {allRatings: allRatings})
  }

  updateValue() {
    var slider = document.getElementById("myRange");
    this.setState({value: slider.value});

    const color = this.getSliderColor();
    this.setSliderColor(color);

    const backgroundColor = this.getSliderBackgroundColor();
    this.setSliderBackgroundColor(backgroundColor)
  }

  setSliderValue(num) {
    this.setState({value: num}, () => {
      const color = this.getSliderColor()
      this.setSliderColor(color)
    });
  }

  getSliderColor() {
    let color;
    const value = this.state.value;
    if (value <= 1000) {
      color = 'violet';
    } 
     if (value < 600) {
      color = 'blue';
    } 
     if (value < 400) {
      color = 'green';
    } 
     if (value < 250) {
      color = 'yellow';
    } 
     if (value < 150) {
      color = 'orange';
    } 
     if (value < 75) {
      color = 'red';
    }
    return color;
  }

  getSliderBackgroundColor() {
    let color;
    const value = this.state.value;
    if (value <= 1000) {
      color = '#dcc1fe';
    } 
     if (value < 600) {
      color = '#b4cffd';
    } 
     if (value < 400) {
      color = '#affeb3';
    } 
     if (value < 250) {
      color = '#fafeb2';
    } 
     if (value < 150) {
      color = '#fac798';
    } 
     if (value < 75) {
      color = '#fda19c';
    }
    return color;
  }

  async getAllNumbers() {
    const docRef = doc(db, 'ConsciousnessRating', 'Log')
    const docSnapshot = await getDoc(docRef)
    const all = docSnapshot.data();

    console.log('GetAllNumbers is: ' + JSON.stringify(all['History']))

    this.setState({ allNumbers: all['History'] })
    this.getAverage();

  }

  getAverage() {
    const all = this.state.allNumbers;
    let sum = 0;

    for(let i = 1; i <= 10; i++) {
      sum += parseInt(all[all.length - i])
    }

    const average = Math.round(sum / 10);
    this.setState({value: average})

    const color = this.getSliderColor();
    this.setSliderColor(color);
    const backgroundColor = this.getSliderBackgroundColor();
    this.setSliderBackgroundColor(backgroundColor);
  }

  async saveToDb() {
    let comment = prompt(`Why ${this.state.value} | ${this.state.word}   tho?`, `Well... ${this.state.word} because `);
    if (comment != null) {
      this.setState({comment: comment});

      const day = document.querySelector('#DayNum').textContent;
      const minute = document.querySelector('#minuteNumber').textContent;
      const rating = this.state.value;

      const consciousnessTimestamp = `${day}-${minute}-${rating}`
      const docRef = doc(db, 'ConsciousnessRating', 'All')
      const docRefLog = doc(db, 'ConsciousnessRating', 'Log')

      let payloadHistory = {History: arrayUnion(rating)};

      let obj = {};
      obj[consciousnessTimestamp] = comment;

      let payload = obj;
      await updateDoc(docRef, payload)
      await updateDoc(docRefLog, payloadHistory)
    }
  }

  handleEvent = async (event) => {
    console.log('handleEvent is: ' + event)
    if (event.type === "onpointerdown") {
           this.setState({ message: "Mouse Down"});
       } else {
           this.setState({ message: "Mouse Up"});
           await this.saveToDb();
       }
   };

   getRatings() {
    // { 
    //   this.state.dates.map(date => {
    //     return <div>{date}</div>
    //   })
    // }
    console.log(this.state.allRatings)
    return this.state.allRatings;
   }

   setSliderColor(color) {
    const element = document.getElementById("myRange") ?? undefined;
    element?.style.setProperty('--sliderColor', color);
  }
  
  setSliderBackgroundColor(color) {
    const element = document.getElementById("myRange") ?? undefined;
    element?.style.setProperty('--sliderBackgroundColor', color);
  }

   handleWordClick(word) {
    this.setState({ word });
  }

  // getColor(value) {
  //   // Define color ranges for different values
  //   const colors = [
  //     'red', 'red', 'red',
  //     'orange', 'orange', 'orange',
  //     'yellow', 'yellow', 'yellow',
  //     'green', 'green', 'green',
  //     'blue', 'blue', 'blue',
  //     'violet', 'violet'
  //   ];
  //   // Calculate index based on value
  //   const index = Math.min(Math.floor(value / 50), colors.length - 1);
  //   return colors[index];
  // }

  handleClick(emotion, clickedWord) {
    const newWord = emotion + ': ' + clickedWord;
    let word = this.state.word.slice();
  
    if (word.includes(newWord)) {
      word = word.filter((w) => w !== newWord);
    } else {
      word.push(newWord);
    }
  
    this.setState({ word });
    const vibeNum = this.getVibe(emotion);
    this.setSliderValue(vibeNum);
  }

  getVibe(word) {
    switch(word) {
      case 'Shame':
        return 20
      case 'Guilt':
        return 30
      case 'Apathy':
        return 50
      case 'Grief':
        return 75
      case 'Fear':
        return 100
      case 'Desire':
        return 125
      case 'Anger':
        return 150;
      case 'Pride':
        return 175;
      case 'Courage':
        return 200;
      case 'Neutrality':
        return 250;
      case 'Willingness':
        return 310;
      case 'Acceptance':
        return 350;
      case 'Reason':
        return 400;
      case 'Love':
        return 500;
      case 'Joy':
        return 540;
      case 'Peace':
        return 600;
      case 'Enlightenment':
        return 700;
    default:
      return 500;
    }
  }

  getColor(emotion) {
    switch (emotion) {
      case 'Shame':
      case 'Guilt':
      case 'Apathy':
        return 'red';
      case 'Grief':
      case 'Fear':
      case 'Desire':
        return 'orange';
      case 'Anger':
      case 'Pride':
      case 'Courage':
        return 'yellow';
      case 'Neutrality':
      case 'Willingness':
      case 'Acceptance':
        return 'green';
      case 'Reason':
      case 'Love':
      case 'Joy':
        return 'blue';
      case 'Peace':
      case 'Enlightenment':
        return 'violet';
    
     default:
      console.log('whatever')
    }
  }

  render() {
    const emotions = {
      Shame: ['Humiliation', 'Worthlessness', 'Powerlessness'],
      Guilt: ['Blame', 'Remorse', 'Repentance'],
      Apathy: ['Despair', 'Hopelessness', 'Abandonment'],
      Grief: ['Sorrow', 'Regret', 'Disappointment'],
      Fear: ['Anxiety', 'Insecurity', 'Unease'],
      Desire: ['Craving', 'Longing', 'Yearning'],
      Anger: ['Hatred', 'Resentment', 'Envy'],
      Pride: ['Arrogance', 'Superiority', 'Conceit'],
      Courage: ['Confidence', 'Empowerment', 'Assertion'],
      Neutrality: ['Objectivity', 'Openness', 'Impartiality'],
      Willingness: ['Optimism', 'Eagerness', 'Enthusiasm'],
      Acceptance: ['Forgiveness', 'Understanding', 'Tolerance'],
      Reason: ['Logic', 'Rationality', 'Intelligence'],
      Love: ['Compassion', 'Empathy', 'Kindness'],
      Joy: ['Satisfaction', 'Gratitude', 'Euphoria'],
      Peace: ['Serenity', 'Tranquility', 'Harmony'],
      Enlightenment: ['Bliss', 'Ecstasy', 'Nirvana'],
    };

    let options = ['What is', 'What are the chemicals of', 'idk'];

    return (
        <div id="consciousnessRating">
          <div class="slidecontainer"> <br/>
            <input class="clickable" class="slider" onPointerUp={ this.handleEvent } onChange={this.updateValue} id="myRange" type="range" min="20" max="1000" value={this.state.value} />
              <details>
                <summary class="clickable"><p>Consciousness rating: <span id="demo">{isNaN(this.state.value) ? 'Loading...' : this.state.value} </span>  </p></summary>
                {/* <img id="consciousnessMap" src='https://the-cosmic-joke.com/ConsciousnessRating.png'/> */}


                {/* MAKE ONCLICK SET SLIDER VALUE */}
                {/* MAKE SLIDER UNDERLINE LEVEL-LINE */}
                <div style={{ textAlign: 'left', marginLeft: '50px' }}>
                  {Object.entries(emotions).map(([emotion, words]) => (
                    <div key={emotion}>
                      <span class='clickable' style={{color: this.getColor(emotion), textDecoration: JSON.stringify(this.state.word).includes(`${emotion}: ${emotion}`) ? 'underline' : 'none' }} onClick={() => this.handleClick(emotion, emotion)}> <b>{emotion}</b>: </span>
                      <div style={{ display: 'inline' }}>
                        {words.map((word) => (
                          <span class='clickable' style={{color: this.getColor(emotion), textDecoration: JSON.stringify(this.state.word).includes(word) ? 'underline' : 'none'}} key={word} onClick={() => this.handleClick(emotion, word)}>
                            {word},&nbsp;
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <GPT words={this.state.word} question={this.state.selectedOption}/>
                <select value={this.state.selectedOption} onChange={this.handleOptionChange}>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <br/><br/><br/>


                <img id="consciousnessMap" src='https://external-preview.redd.it/Z_WEBW8ro1FUtN64ksfzeNM-jR4mp4OdebucYgk8eSA.jpg?auto=webp&s=0e1a0909adf703e4bb4fc6b51bb170c490a6a062'/>
                <br/><br/>
                <details>
                  <summary class="clickable">History</summary>
                  <br/>
                  {/* {this.getRatings()} // Can I do it with function like that? Maybe change to jsx? */}

                  Ratings:
                  {/* { 
                    this.state.allRatings.map(rating => {
                      return <div>{rating}</div>
                    })
                  } */}

                  <button onClick={()=>this.getRatings()}>console log</button>
                  {/* { 
                    this.state.allRatings.map(entry => {
                      return <div>{entry}</div>
                    })
                  } */}
                </details>
              </details>
          </div>
        </div>
    );
  }

  componentDidMount() {
    this.getAllRatings();
    // this.getAverage()
    this.getAverage();

    // const color = this.getSliderColor();
    // this.setSliderColor(color);
    // const backgroundColor = this.getSliderBackgroundColor();
    // this.setSliderBackgroundColor(backgroundColor);
  }
}
