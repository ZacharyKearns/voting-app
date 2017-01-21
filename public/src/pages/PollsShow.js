import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deletePoll } from '../actions/polls';
import Header from '../containers/HeaderContainer.js';
import PollDetailsContainer from '../containers/PollDetailsContainer.js';

class PollsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    this.props.deletePoll(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    return (
      <div className='container'>
        <Header type="polls_show" pollId={this.props.params.id}/>
        <PollDetailsContainer id={this.props.params.id}/>
      </div>
    );
  }
}

export default PollsShow;
