import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import PollsList from '../containers/PollsListContainer.js';

class PollsIndex extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="polls_index"/>
        <PollsList />
      </div>
    );
  }
}


export default PollsIndex;
