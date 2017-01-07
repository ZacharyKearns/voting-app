import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class PollDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchPoll(this.props.pollId);
  }

  render() {
    const { poll, loading, error } = this.props.activePoll;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if (error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if (!poll) {
      return <span/>
    }

    return (
      <div className="container">
        <h3>{poll.title}</h3>
        <h6>Options: {poll.options}</h6>
      </div>
    );
  }
}

export default PollDetails;
