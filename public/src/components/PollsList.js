import React, { Component } from 'react';
import { Link } from 'react-router';

class PollsList extends Component {
  componentWillMount() {
    this.props.fetchPolls();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type === 'mypolls' && !nextProps.user.user) {//user logout
      this.context.router.push('/');
    }
  }

  renderOptions(options) {
     return options.map(o => {
        o = o.trim();
        return (
          <span className="list-group-item-text">{" " + o + " "}</span>
        );
     });
  }

  renderPolls(polls) {
    const { type, user } = this.props;
    if (type === 'mypolls') {
      if (user.user && user.status === "authenticated") {
        return polls.filter(poll => user.user._id === poll.authorId)
                    .map((poll) => {
                      console.log(poll.options)
                      return (
                        <li className="list-group-item" key={poll._id}>
                          <Link style={{color:'black'}} to={"polls/" + poll._id}>
                            <h3 className="list-group-item-heading">{poll.title}</h3>
                          </Link>
                            {this.renderOptions(poll.options)}
                        </li>
                      );
                    });
      }
    }

    return polls.map((poll) => {
      return (
        <li className="list-group-item" key={poll._id}>
          <Link style={{color:'black'}} to={"polls/" + poll._id}>
            <h3 className="list-group-item-heading">{poll.title}</h3>
          </Link>
            {this.renderOptions(poll.options)}
        </li>
      );
    });
  }

  render() {
    const { polls, loading, error } = this.props.pollsList;

    if (loading) {
      return <div className="container"><h1>Polls</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h1>Polls</h1>
          <ul className="list-group">
            {this.renderPolls(polls)}
          </ul>
        </div>
      </div>
    );
  }
}


export default PollsList;
