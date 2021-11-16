import React from 'react';


export class Notepad extends React.Component {
  render() {
    return (
        <div id="notepad" contenteditable="true" autocomplete="off">
            I want this text to get saved to the database.
            <br/><br/>
            (what would I type here though? Practice with obsidian)
        </div>
    );
  }
}
