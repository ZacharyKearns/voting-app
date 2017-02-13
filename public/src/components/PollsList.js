import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class PollsList extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillReceiveProps() {
    const { type, authenticatedUser } = this.props;
    if (!authenticatedUser && type === 'mypolls') {
      this.context.router.push('/');
    }
  }

  componentWillMount() {
    const { type, user } = this.props;
    this.props.fetchPolls(type, user.user);
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  // renderOptions(options) {
  //    return options.map(o => {
  //       o = o.trim();
  //       return (
  //         <span className="list-group-item-text">{" " + o + " "}</span>
  //       );
  //    });
  // }

  renderPolls(polls) {
    if (!polls.length) {
      return <span>No Polls To Show.</span>
    } else {
      return polls.map((poll) => {
        return (
          <li className="list-group-item" key={poll._id} author={poll.authorUsername}>
            <Link style={{color:'black'}} to={"polls/" + poll._id}>
              <h3 className="list-group-item-heading">{poll.title}</h3>
            </Link>
              {/* {this.renderOptions(poll.options)} */}
          </li>
        );
      });
    }
  }

  render() {
    const { polls, loading, error } = this.props.pollsList;
    const { type } = this.props;
    const totalVoteCount = polls.length ? polls
    .map(poll => poll.options.reduce((pollA, pollB) => {
      return {votes: pollA.votes + pollB.votes};
    }))
    .reduce((pollA, pollB) => {
      return {votes: pollA.votes + pollB.votes};
    }).votes : null;

    if (loading) {
      return <div className="container"><h1>Polls</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h1>Polls</h1>
          {type == 'mypolls' && totalVoteCount >= 0 && <h5>Total Vote Count: {totalVoteCount}</h5>}
          <ul className="list-group">
            {this.renderPolls(polls)}
          </ul>
        </div>
      </div>
    );
  }
}


export default PollsList;
