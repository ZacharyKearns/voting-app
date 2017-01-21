import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import PollsList from '../containers/PollsListContainer.js';

class MyPolls extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="mypolls"/>
        <PollsList type="mypolls"/>
      </div>
    );
  }
}


export default MyPolls;
