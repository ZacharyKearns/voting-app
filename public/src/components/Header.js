import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deletedPoll.error && nextProps.deletedPoll.error.message) {//delete failure
      alert(nextProps.deletedPoll.error.message || 'Could not delete. Please try again.');
    } else if (nextProps.deletedPoll.poll && !nextProps.deletedPoll.error) {//delete success
      this.context.router.push('/');
    } else if (this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
      this.context.router.push('/');
    }
  }

  renderLoginLinks(authenticatedUser) {
    let loginLinks = [];
    if (authenticatedUser) {
      loginLinks = [
        <li>
          <Link to="/polls/new">New Poll</Link>
        </li>,
        <li>
          <Link to="/mypolls">My Polls</Link>
        </li>,
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{authenticatedUser.username}<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a onClick={this.props.logout} href="javascript:void(0)">Log Out</a></li>
          </ul>
        </li>
      ]
    } else {
      loginLinks = [
        <li>
          <Link to="/signup">Sign up</Link>
        </li>,
        <li>
          <Link to="/login">Login</Link>
        </li>
      ]
    }
    return loginLinks;
  }

	renderLinks() {
		const { type, authenticatedUser } = this.props;

    let backToIndex = <ul className="nav navbar-nav navbar-left">
                        <li>
                          <Link to="/">Back To Index</Link>
                        </li>
                      </ul>;
    let deletePoll = <ul className="nav navbar-nav navbar-right">
                       <li>
                         <a onClick={() => {this.props.onDeleteClick()}} href="javascript:void(0)">Delete Poll</a>
                       </li>
                     </ul>;
    let pageLinks = type === 'polls_index' ? [] : backToIndex;

    if (type === 'polls_show' && !this.props.activePoll.error) {
      if (!this.props.activePoll.poll) {
        return;
      } else if (authenticatedUser && this.props.activePoll.poll.authorId === this.props.user.user._id) {
        pageLinks = [
          backToIndex,
          deletePoll
        ];
      }
    }


    return (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          {this.renderLoginLinks(authenticatedUser)}
        </ul>
        {pageLinks}
      </div>
    );
	};

	render() {
		return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">FCC Voting App</Link>
          </div>
          {this.renderLinks()}
        </div>
      </nav>
		);
	}
}

export default Header;
