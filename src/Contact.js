import React from 'react';
import ReactDOM from 'react-dom';
import { Sandbox } from './Sandbox/Sandbox';
import shrek from './Sandbox/shrek.png';

export class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: 'swordfish',
      authorized: false
    };
    this.authorize = this.authorize.bind(this);
  }

  authorize(e) {
    const password = e.target.querySelector(
      'input[type="password"]').value;
    const auth = password == this.state.password;
    if (!auth) {
      console.log('Wrong password, Fuck off ')
      const title = document.querySelector('#title');
      title.innerHTML = "This is my swamp, go away"
      const image = document.querySelector('.App-logo');
      // image.src = 'https://image.emojisky.com/815/203815-middle.png'
      image.src = shrek;
      e.preventDefault();
    }
    this.setState({
      authorized: auth
    });
  }

  removeSpinner() {
    const element = document.querySelector('.App-logo');
    element.style.display = 'none';
    document.title = "Dashboard";
  }

  render() {
  const login = (
    <form action="#" onSubmit={this.authorize}>
      <input 
        type="password" 
        placeholder="Password" />
      <input class="clickable" type="submit" />
    </form>
  )
  
    return (
      <div id="authorization">
        <h1 id="title">{this.state.authorized ? 'Welcome' : 'Enter the Password'}</h1>
        {this.state.authorized ? <Sandbox /> : login}
        {this.state.authorized ? this.removeSpinner() : null }

        

      </div>
    );
  }
}
