import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import PollFormContainer from '../containers/PollFormContainer.js';

class PollsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="polls_new"/>
        <PollFormContainer/>
      </div>
    );
  }
}


export default PollsNew;
