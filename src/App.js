import logo from './logo.svg';
import './App.css';
import { Contact } from './Contact';
import { Sandbox } from './Sandbox/Sandbox';
import { Clock } from './Sandbox/Clock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        actually this is very cool
        so how fast can I do this actually hm?

        <Contact />
        <Clock />
      </header>
    </div>
  );
}

export default App;
