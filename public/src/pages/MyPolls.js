import React, { Component, PropTypes } from 'react';
import Header from '../containers/HeaderContainer.js';
import PollsList from '../containers/PollsListContainer.js';

class MyPolls extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div>
        <Header type="mypolls"/>
        <PollsList type="mypolls"/>
      </div>
    );
  }
}


export default MyPolls;
