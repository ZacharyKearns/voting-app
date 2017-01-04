import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import LoginFormContainer from '../containers/LoginFormContainer.js';

class PollsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="polls_new"/>
        <LoginFormContainer />
      </div>
    );
  }
}


export default PollsNew;
