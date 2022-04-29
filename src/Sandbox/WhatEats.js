import { Link } from "react-router-dom";

export const WhatEats = () => {

    const randomKeyword = () => {
        return 'idk'
    }

  return (
    <div id="whatEats">
      <h1>So, what to eat?</h1>
      <img src="https://i.redd.it/ga8ce2xiljr21.jpg" alt="food" />

      <h1><a style={{color: 'black'}} href="http://the-cosmic-joke.com/" target="_blank">http://the-cosmic-joke.com/</a></h1>
    </div>
  );
};
