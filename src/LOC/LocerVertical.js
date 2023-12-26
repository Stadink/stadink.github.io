import React from 'react';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot, collection, getDocs } from 'firebase/firestore';
import db from '../Sandbox/firebase';
import { db2 } from '../Sandbox/firebase2';
import GPT from '../Sandbox/GPT';

export class LocerVertical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 350,
      word: [],
      comment: '',
      allNumbers: 'aaa fucking none',
      allRatings: ['wtf'],
      selectedOption: 'what is',
      emotions: {
        Enlightenment: ['Bliss', 'Ecstasy', 'Nirvana'],
        Peace: ['Serenity', 'Tranquility', 'Harmony'],
        Joy: ['Satisfaction', 'Gratitude', 'Euphoria'],
        Love: ['Compassion', 'Empathy', 'Kindness'],
        Reason: ['Logic', 'Rationality', 'Intelligence'],
        Acceptance: ['Forgiveness', 'Understanding', 'Tolerance'],
        Willingness: ['Optimism', 'Eagerness', 'Enthusiasm'],
        Neutrality: ['Objectivity', 'Openness', 'Impartiality'],
        Courage: ['Confidence', 'Empowerment', 'Assertion'],
        Pride: ['Arrogance', 'Superiority', 'Conceit'],
        Anger: ['Hatred', 'Resentment', 'Envy'],
        Desire: ['Craving', 'Longing', 'Yearning'],
        Fear: ['Anxiety', 'Insecurity', 'Unease'],
        Grief: ['Sorrow', 'Regret', 'Disappointment'],
        Apathy: ['Despair', 'Hopelessness', 'Abandonment'],
        Guilt: ['Blame', 'Remorse', 'Repentance'],
        Shame: ['Humiliation', 'Worthlessness', 'Powerlessness'],
      },
      questions: [
        'What is', 
        'What are the chemicals of', 
        'How do I reframe', 
        'Write a joke about',
        'How do I transcend',
        'What are the synonyms of',
      'How do I shift my experience towards',
      'How do I shift my experience from',
    ]
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.setupRealtimeUpdates = this.setupRealtimeUpdates.bind(this);
    this.getSliderColor = this.getSliderColor.bind(this);
    this.getSliderBackgroundColor = this.getSliderBackgroundColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  handleOptionChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  handleEvent = async (event) => {
    if (event.type === "pointerup") {
        this.saveToDb();
    }
};

  getTimeRemaining(){
    const total = Date.parse('May 18, 2045') - Date.parse(new Date());
    // console.log('NEW DATE IS: ' + new Date());
    // console.log('Time left lol: ' + total/(1000*60*60*24));
    const days = Math.floor( total/(1000*60*60*24) );
    return days
  }

  getTotalMinutes() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
  }

  async saveToDb() {
    let comment = prompt(`Why ${this.state.value} | ${this.state.word}   tho?`, `Well... ${this.state.word} because `);
    if (comment != null) {
      this.setState({comment: comment});

      const day = this.getTimeRemaining()
      const minute = this.getTotalMinutes()
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

  updateValue(event) {
    const sliderValue = event.target.value;
    this.setState({ value: sliderValue });

    const emotion = this.getEmotionForValue(sliderValue);
    if (emotion) {
      const newWord = `${emotion}: ${emotion}`;
      this.setState({ word: [newWord] }); // Update to ensure correct format
    }

    const color = this.getSliderColor();
    this.setSliderColor(color);

    const backgroundColor = this.getSliderBackgroundColor();
    this.setSliderBackgroundColor(backgroundColor);
  }

  getEmotionForValue(value) {
    // Define the ranges of values associated with each emotion
    const emotionRanges = {
      'Shame': { min: 0, max: 29 },
      'Guilt': { min: 30, max: 49 },
      'Apathy': { min: 50, max: 74 },
      'Grief': { min: 75, max: 99 },
      'Fear': { min: 100, max: 124 },
      'Desire': { min: 125, max: 149 },
      'Anger': { min: 150, max: 174 },
      'Pride': { min: 175, max: 199 },
      'Courage': { min: 200, max: 249 },
      'Neutrality': { min: 250, max: 309 },
      'Willingness': { min: 310, max: 349 },
      'Acceptance': { min: 350, max: 399 },
      'Reason': { min: 400, max: 499 },
      'Love': { min: 500, max: 539 },
      'Joy': { min: 540, max: 599 },
      'Peace': { min: 600, max: 699 },
      'Enlightenment': { min: 700, max: 1000 }
    };
    
    for (const [emotion, range] of Object.entries(emotionRanges)) {
      if (value >= range.min && value <= range.max) {
        return emotion;
      }
    }
  
    return null; // In case the value does not correspond to any emotion
  }

  setSliderValue(num) {
    this.setState({ value: num }, () => {
      const color = this.getSliderColor();
      this.setSliderColor(color);
    });
  }

  setSliderColor(color) {
    const element = document.getElementById("myRange") ?? undefined;
    element?.style.setProperty('--sliderColor', color);
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

  setSliderBackgroundColor(color) {
    const element = document.getElementById("myRange") ?? undefined;
    element?.style.setProperty('--sliderBackgroundColor', color);
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

  async setupRealtimeUpdates() {
    console.log('db is: ', db);
    console.log('db2 is: ', db2);
    
    const locCollectionRef = collection(db2, 'LOC');
    try {
      const querySnapshot = await getDocs(locCollectionRef);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (error) {
      console.error('Error reading LOC collection:', error);
    }
  
    const docRef = doc(db2, 'LOC', '1234');
  
    this.unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const value = data.number; // Assume 'number' is the field with the slider value
        const emotion = this.getEmotionForValue(value); // Get the emotion for the value
        const emotionEmotion = `${emotion}: ${emotion}`;
        this.setState({ value: value, word: [emotionEmotion] }, () => {
          const color = this.getSliderColor();
          this.setSliderColor(color);
        });
      } else {
        console.log('No such document!');
      }
    }, (error) => {
      console.error('Error getting document:', error);
    });
  }

  componentDidMount() {
    this.setupRealtimeUpdates();
    // Add any other initialization code here if needed
  }

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
    const { emotions, value, word, selectedOption, allRatings } = this.state;

    return (
      <div id="consciousnessRating">
        <div className="slidecontainer">
          <input
            className="clickable slider vertical-slider"
            onPointerUp={this.handleEvent}
            onChange={this.updateValue}
            id="myRange"
            type="range"
            min="20"
            max="1000"
            value={value}
            orient="vertical"
          />
              <details>
                <summary class="clickable"><p>Consciousness rating: <span id="demo">{isNaN(this.state.value) ? 'Loading...' : this.state.value} </span>  </p></summary>
                {/* <img id="consciousnessMap" src='https://the-cosmic-joke.com/ConsciousnessRating.png'/> */}
                {/* MAKE ONCLICK SET SLIDER VALUE */}
                {/* MAKE SLIDER UNDERLINE LEVEL-LINE */}
                <div style={{ textAlign: 'left', marginLeft: '50px' }}>
                  {Object.entries(emotions).map(([emotion, words]) => (
                    <div key={emotion}>
                      <span className='clickable'
                            style={{color: this.getColor(emotion), 
                                    textDecoration: this.state.word.includes(`${emotion}: ${emotion}`) ? 'underline' : 'none' }}
                            onClick={() => this.handleClick(emotion, emotion)}> 
                        <b>{emotion}</b>:
                      </span>
                      <div style={{ display: 'inline' }}>
                        {words.map((word) => (
                          <span className='clickable'
                                style={{color: this.getColor(emotion), 
                                        textDecoration: this.state.word.includes(`${emotion}: ${word}`) ? 'underline' : 'none'}}
                                key={word}
                                onClick={() => this.handleClick(emotion, word)}>
                            {word},&nbsp;
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>


                <GPT words={this.state.word} question={this.state.selectedOption}/>
                <select value={this.state.selectedOption} onChange={this.handleOptionChange}>
                  {this.state.questions.map((question) => (
                    <option key={question} value={question}>
                      {question}
                    </option>
                  ))}
                </select>

                <br/><br/><br/>

                <img id="consciousnessMap" alt='hawkins map' src='https://external-preview.redd.it/Z_WEBW8ro1FUtN64ksfzeNM-jR4mp4OdebucYgk8eSA.jpg?auto=webp&s=0e1a0909adf703e4bb4fc6b51bb170c490a6a062'/>

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
}
