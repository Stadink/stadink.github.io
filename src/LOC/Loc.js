import React, { Component } from 'react';
import { ConsciousnessRating } from '../Sandbox/ConsciousnessRating';
import { LocerVertical } from './LocerVertical';

export class Loc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Define initial state values here
    };
  }

  componentDidMount() {
    // Add any side effects or initializations here
  }

  componentDidUpdate(prevProps, prevState) {
    // Add any updates to the component here
  }

  componentWillUnmount() {
    // Clean up any side effects or listeners here
  }

  render() {
    return (
      // Define the component's markup and JSX here
      <div>
        Value: 

        {/* <ConsciousnessRating /> */}
        <LocerVertical />

      </div>
    );
  }
}

