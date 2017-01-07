import {
	FETCH_POLLS, FETCH_POLLS_SUCCESS, FETCH_POLLS_FAILURE, RESET_POLLS,
	FETCH_POLL, FETCH_POLL_SUCCESS,  FETCH_POLL_FAILURE, RESET_ACTIVE_POLL,
	CREATE_POLL, CREATE_POLL_SUCCESS, CREATE_POLL_FAILURE, RESET_NEW_POLL,
	DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE, RESET_DELETED_POLL,
  VALIDATE_POLL_FIELDS,VALIDATE_POLL_FIELDS_SUCCESS, VALIDATE_POLL_FIELDS_FAILURE, RESET_POLL_FIELDS
} from '../actions/polls';

const INITIAL_STATE = { pollsList: {polls: [], error: null, loading: false},
							newPoll:{poll: null, error: null, loading: false},
							activePoll:{poll: null, error: null, loading: false},
							deletedPoll: {poll: null, error: null, loading: false},
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

	  case FETCH_POLLS:// start fetching polls and set loading = true
	  	return { ...state, pollsList: {polls:[], error: null, loading: true} };
	  case FETCH_POLLS_SUCCESS:// return list of polls and make loading = false
	    return { ...state, pollsList: {polls: action.payload, error: null, loading: false} };
	  case FETCH_POLLS_FAILURE:// return error and make loading = false
	    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
	    return { ...state, pollsList: {polls: [], error: error, loading: false} };
	  case RESET_POLLS:// reset pollList to initial state
	    return { ...state, pollsList: {polls: [], error: null, loading: false} };

		case FETCH_POLL:
	    return { ...state, activePoll: {...state.activePoll, loading: true}};
	  case FETCH_POLL_SUCCESS:
	    return { ...state, activePoll: {poll: action.payload, error: null, loading: false}};
	  case FETCH_POLL_FAILURE:
	    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
	    return { ...state, activePoll: {poll: null, error: error, loading: false}};
	  case RESET_ACTIVE_POLL:
	    return { ...state, activePoll: {poll: null, error: null, loading: false}};

	  case CREATE_POLL:
	  	return {...state, newPoll: {...state.newPoll, loading: true}}
	  case CREATE_POLL_SUCCESS:
	  	return {...state, newPoll: {poll: action.payload, error: null, loading: false}}
	  case CREATE_POLL_FAILURE:
	    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
	  	return {...state, newPoll: {poll: null, error: error, loading: false}}
	  case RESET_NEW_POLL:
	  	return {...state,  newPoll: {poll: null, error: null, loading: false}}

	  case DELETE_POLL:
	   	return {...state, deletedPoll: {...state.deletedPoll, loading: true}}
	  case DELETE_POLL_SUCCESS:
	  	return {...state, deletedPoll: {poll: action.payload, error: null, loading: false}}
	  case DELETE_POLL_FAILURE:
	    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
	  	return {...state, deletedPoll: {poll: null, error: error, loading: false}}
	  case RESET_DELETED_POLL:
	  	return {...state,  deletedPoll: {poll: null, error: null, loading: false}}

	  case VALIDATE_POLL_FIELDS:
	    return {...state, newPoll: {...state.newPoll, error: null, loading: true}}
	  case VALIDATE_POLL_FIELDS_SUCCESS:
	    return {...state, newPoll: {...state.newPoll, error: null, loading: false}}
	  case VALIDATE_POLL_FIELDS_FAILURE:
	    let result = action.payload;
	    if(!result) {
	      error = {message: action.payload.message};
	    } else {
	      error = {title: result.title, options: result.options, description: result.description};
	    }
	    return {...state, newPoll: {...state.newPoll, error: error, loading: false}}
	  case RESET_POLL_FIELDS:
	    return {...state, newPoll: {...state.newPoll, error: null, loading: null}}
	  default:
	    return state;
  }
}
