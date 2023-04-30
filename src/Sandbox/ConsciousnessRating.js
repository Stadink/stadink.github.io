import React from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from './firebase';

export class ConsciousnessRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 350,
      comment: '',
      allNumbers: 'aaa fucking none' ,
      allRatings: ['wtf'],
    };
    this.updateValue = this.updateValue.bind(this);
    this.getAllNumbers()
    // this.getAverage();
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
    let comment = prompt(`Why ${this.state.value} tho?`, 'Well...');
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
    document.getElementById("myRange").style.setProperty('--sliderColor', color);
   }

   setSliderBackgroundColor(color) {
    document.getElementById("myRange").style.setProperty('--sliderBackgroundColor', color);
   }

  render() {
    return (
        <div id="consciousnessRating">
          <div class="slidecontainer"> <br/>
            <input class="clickable" onPointerUp={ this.handleEvent } onChange={this.updateValue} id="myRange" type="range" min="20" max="1000" value={this.state.value} class="slider" />
              <details>
                <summary class="clickable"><p>Consciousness rating: <span id="demo">{isNaN(this.state.value) ? 'Loading...' : this.state.value} </span>  </p></summary>
                {/* <img id="consciousnessMap" src='https://the-cosmic-joke.com/ConsciousnessRating.png'/> */}

                <div style={{ textAlign: 'left', marginLeft: '50px' }}>
                  <div style={{ color: 'red'}}>
                    <b>Shame</b>: Humiliation, Worthlessness, Powerlessness<br />
                    <b>Guilt</b>: Blame, Remorse, Repentance<br />
                    <b>Apathy</b>: Despair, Hopelessness, Abandonment<br />
                  </div>
                  <div style={{ color: 'orange'}}>
                    <b>Grief</b>: Sorrow, Regret, Disappointment<br />
                    <b>Fear</b>: Anxiety, Insecurity, Unease<br />
                    <b>Desire</b>: Craving, Longing, Yearning<br />
                  </div>
                  <div style={{ color: 'yellow'}}>
                    <b>Anger</b>: Hatred, Resentment, Envy<br />
                    <b>Pride</b>: Arrogance, Superiority, Conceit<br />
                    <b>Courage</b>: Confidence, Empowerment, Assertion<br />
                  </div>
                  <div style={{ color: 'green'}}>
                    <b>Neutrality</b>: Objectivity, Openness, Impartiality<br />
                    <b>Willingness</b>: Optimism, Eagerness, Enthusiasm<br />
                    <b>Acceptance</b>: Forgiveness, Understanding, Tolerance<br />
                  </div>
                  <div style={{ color: 'blue'}}>
                    <b>Reason</b>: Logic, Rationality, Intelligence<br />
                    <b>Love</b>: Compassion, Empathy, Kindness<br />
                    <b>Joy</b>: Satisfaction, Gratitude, Euphoria<br />
                  </div>
                  <div style={{ color: 'violet'}}>
                    <b>Peace</b>: Serenity, Tranquility, Harmony<br />
                    <b>Enlightenment</b>: Bliss, Ecstasy, Nirvana<br />
                  </div>
                </div>

                <br/>


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
