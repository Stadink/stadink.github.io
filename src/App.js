import logo from './logo.svg';
import './App.css';
import { Contact } from './Contact';
import { Sandbox } from './Sandbox/Sandbox';
import { Clock } from './Sandbox/Clock';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        {/* <title>My Title</title> */}
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Contact />
        stadnego@hotmail.com <br />
        Barbariska1
        <Clock />
      </header>
    </div>
  );
}

export default App;
