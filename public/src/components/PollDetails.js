import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';

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

    const options = poll.options.map(option => <option>{option.option}</option>);

    return (
      <div className="col-md-6 col-md-offset-3">
        <h3>{poll.title}</h3>
        <select class="form-control">
          {options}
        </select>
      </div>
    );
  }
}

export default PollDetails;
