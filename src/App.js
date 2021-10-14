import logo from './logo.svg';
import './App.css';
import { Contact } from './Contact';
import { Sandbox } from './Sandbox/Sandbox';
import { Clock } from './Sandbox/Clock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {console.log(<Contact />)}
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to FUCKING ROCK OMG you're actually doing it in real time damn.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Contact />
        <Clock />
      </header>
    </div>
  );
}

export default App;
