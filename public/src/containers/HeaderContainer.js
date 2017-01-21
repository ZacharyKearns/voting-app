import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls, resetDeletedPoll, deletePoll, deletePollSuccess, deletePollFailure } from '../actions/polls';
import { logoutUser } from '../actions/users';
import Header from '../components/Header.js';

function mapStateToProps(state) {
  return {
    activePoll: state.polls.activePoll,
    deletedPoll: state.polls.deletedPoll,
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onDeleteClick: () => {
      let token = sessionStorage.getItem('jwtToken');
      if (!token || token === '') { //if there is no token, dont bother,
          let data = {data: {message: 'Please Sign In'}};//axios like error
          dispatch(deletePollFailure(data)); // but let other comps know
          return;
      }

    	dispatch(deletePoll(ownProps.pollId, token))
      	.then((response) => {
            !response.error ? dispatch(deletePollSuccess(response.payload)) : dispatch(deletePollFailure(response.payload));
          });
  	 },
     resetMe: () =>{
        dispatch(resetDeletedPoll());
     },

     logout: () => {
         sessionStorage.removeItem('jwtToken');
         dispatch(logoutUser());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
