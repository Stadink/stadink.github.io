import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { ConsciousnessRating } from './ConsciousnessRating';

export class Motivation extends React.Component {

  render() {
    return (
        <div id="motivation">
                <details>
                  <summary>Important ▼</summary>
                  What can I do today to 📈 my self-esteem?
                  <div style={{'text-align' : 'right'}}>...to be honest</div>

                  <br/>
                  ⭐ Я люблю себя, хочу для себя лучшего, поэтому...
                </details> <br />
                <a style={{textDecoration: 'none'}} href="https://calendar.google.com/calendar/u/0/r" target="_blank">🗓️ </a> | 
                <a style={{textDecoration: 'none'}} href="https://jedvaita.com/articles/" target="_blank"> 👁 </a> |
                <a style={{textDecoration: 'none'}} href="https://www.linkedin.com/learning/?u=102813596" target="_blank"> 👨🏻‍💻 </a> |
                <a style={{textDecoration: 'none'}} href="http://obsidian.willthisdofor.art/" target="_blank"> 👾 </a> |
                <a style={{textDecoration: 'none'}} href="https://integralguide.com/" target="_blank"> 🤔 </a> |
                <a style={{textDecoration: 'none'}} href="https://docs.google.com/spreadsheets/d/1Ojd8S1bBl5xzPVybeOSa9Lr5OArqGH86j0JdyuRwrp8/edit#gid=0" target="_blank"> 📋 </a>

                <ConsciousnessRating />
        </div>
    );
  }
}
