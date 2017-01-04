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
    } else if (nextProps.deletedPoll.post && !nextProps.deletedPoll.error) {//delete success
      this.context.router.push('/');
    } else if (this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
      this.context.router.push('/');
    }
  }

  renderLoginLinks(authenticatedUser) {
    if (authenticatedUser) {
      return (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/profile">{authenticatedUser.username}</Link>
          </li>
          <li>
            <a onClick={this.props.logout} href="javascript:void(0)">Log out</a>
          </li>
        </ul>
      );
    }

    return (
      <ul class="nav navbar-nav navbar-right">
  	    <li>
  	      <Link to="/signup">Sign up</Link>
  	    </li>
  	    <li>
  	      <Link to="/login">Login</Link>
  	    </li>
      </ul>
   );
  }

	renderLinks() {
		const { type, authenticatedUser } = this.props;
		if (type === 'polls_index') {
       return (
         <ul class="nav navbar-nav navbar-right">
  	  		 <li>
  	  			 <Link to="/polls/new">New Poll</Link>
  	       </li>
           {this.renderLoginLinks(authenticatedUser)}
         </ul>
  		 );
  	} else if (type === 'polls_new') {
       return (
         <ul class="nav navbar-nav navbar-right">
	         {this.renderLoginLinks(authenticatedUser)}
	  			 <li>
	  				 <Link to="/">Back To Index</Link>
	  			 </li>
         </ul>
  		 );
  	} else if (type === 'polls_show') {
  			return (
          <ul class="nav navbar-nav navbar-right">
        		<li>
  						<Link to="/">Back To Index</Link>
  					</li>
      			<li>
        			<button onClick={()=> {this.props.onDeleteClick()}}>Delete Poll</button>
        		</li>
            {this.renderLoginLinks(authenticatedUser)}
          </ul>
  		);
  	}
	};

	render() {
		return (
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <Link to="/" class="navbar-brand">FCC Voting App</Link>
          </div>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {this.renderLinks()}
          </div>
        </div>
      </nav>
		);
	}
}

export default Header;
