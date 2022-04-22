import React from 'react';

export class SelfEnquiry extends React.Component {
    doSomething(e) {
        alert('yeah well, but who is aware of ' + document.getElementById('WhoIamInput').value)
        e.preventDefault();
    }

  render() {
    return (
        <div id="selfEnquiry">
            <form onSubmit={(e) => this.doSomething(e)}>
                Who am I? What am I? <br/>
                <input type="text" id="WhoIamInput"></input> <br/>            
            </form>
        </div>
    );
  }
}
