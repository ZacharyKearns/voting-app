import axios from 'axios';

//Poll list
export const FETCH_POLLS = 'FETCH_POLLS';
export const FETCH_POLLS_SUCCESS = 'FETCH_POLLS_SUCCESS';
export const FETCH_POLLS_FAILURE = 'FETCH_POLLS_FAILURE';
export const RESET_POLLS = 'RESET_POLLS';

//Create new poll
export const CREATE_POLL = 'CREATE_POLL';
export const CREATE_POLL_SUCCESS = 'CREATE_POLL_SUCCESS';
export const CREATE_POLL_FAILURE = 'CREATE_POLL_FAILURE';
export const RESET_NEW_POLL = 'RESET_NEW_POLL';

//Update vote count
export const UPDATE_POLL = 'UPDATE_POLL';
export const UPDATE_POLL_SUCCESS = 'UPDATE_POLL_SUCCESS';
export const UPDATE_POLL_FAILURE = 'UPDATE_POLL_FAILURE';
export const RESET_UPDATED_POLL = 'RESET_UPDATED_POLL';


//Validate poll fields like Title, Categries on the server
export const VALIDATE_POLL_FIELDS = 'VALIDATE_POLL_FIELDS';
export const VALIDATE_POLL_FIELDS_SUCCESS = 'VALIDATE_POLL_FIELDS_SUCCESS';
export const VALIDATE_POLL_FIELDS_FAILURE = 'VALIDATE_POLL_FIELDS_FAILURE';
export const RESET_POLL_FIELDS = 'RESET_POLL_FIELDS';

//Fetch poll
export const FETCH_POLL = 'FETCH_POLL';
export const FETCH_POLL_SUCCESS = 'FETCH_POLL_SUCCESS';
export const FETCH_POLL_FAILURE = 'FETCH_POLL_FAILURE';
export const RESET_ACTIVE_POLL = 'RESET_ACTIVE_POLL';

//Delete poll
export const DELETE_POLL = 'DELETE_POLL';
export const DELETE_POLL_SUCCESS = 'DELETE_POLL_SUCCESS';
export const DELETE_POLL_FAILURE = 'DELETE_POLL_FAILURE';
export const RESET_DELETED_POLL = 'RESET_DELETED_POLL';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export function fetchPolls(type, user) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/polls`,
    headers: [],
    params: {
      type,
      user
    }
  });

  return {
    type: FETCH_POLLS,
    payload: request
  };
}

export function fetchPollsSuccess(polls) {
  return {
    type: FETCH_POLLS_SUCCESS,
    payload: polls
  };
}

export function fetchPollsFailure(error) {
  return {
    type: FETCH_POLLS_FAILURE,
    payload: error
  };
}

export function resetPolls() {
  return {
    type: RESET_POLLS
  }
}

export function validatePollFields(props) {
  //note: we cant have /polls/validateFields because it'll match /polls/:id path!
  const request = axios.post(`${ROOT_URL}/polls/validate/fields`, props);

  return {
    type: VALIDATE_POLL_FIELDS,
    payload: request
  };
}

export function validatePollFieldsSuccess() {
  return {
    type: VALIDATE_POLL_FIELDS_SUCCESS
  };
}

export function validatePollFieldsFailure(error) {
  return {
    type: VALIDATE_POLL_FIELDS_FAILURE,
    payload: error
  };
}

export function resetPollFields() {
  return {
    type: RESET_POLL_FIELDS
  }
};

export function createPoll(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/polls`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_POLL,
    payload: request
  };
}

export function createPollSuccess(newPoll) {
  return {
    type: CREATE_POLL_SUCCESS,
    payload: newPoll
  };
}

export function createPollFailure(error) {
  return {
    type: CREATE_POLL_FAILURE,
    payload: error
  };
}

export function resetNewPoll() {
  return {
    type: RESET_NEW_POLL
  }
}

export function resetDeletedPoll() {
  return {
    type: RESET_DELETED_POLL
  }
}

export function updatePoll(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/polls/${props.id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_POLL,
    payload: request
  };
}

export function updatePollSuccess(updatedPoll) {
  return {
    type: UPDATE_POLL_SUCCESS,
    payload: updatedPoll
  }
}

export function updatePollFailure(error) {
  return {
    type: UPDATE_POLL_FAILURE,
    payload: error
  }
}

export function resetUpdatedPoll() {
  return {
    type: RESET_UPDATED_POLL
  }
}

export function fetchPoll(id) {
  const request = axios.get(`${ROOT_URL}/polls/${id}`);

  return {
    type: FETCH_POLL,
    payload: request
  };
}

export function fetchPollSuccess(activePoll) {
  return {
    type: FETCH_POLL_SUCCESS,
    payload: activePoll
  };
}

export function fetchPollFailure(error) {
  return {
    type: FETCH_POLL_FAILURE,
    payload: error
  };
}

export function resetActivePoll() {
  return {
    type: RESET_ACTIVE_POLL
  }
}

export function deletePoll(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/polls/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_POLL,
    payload: request
  };
}

export function deletePollSuccess(deletedPoll) {
  return {
    type: DELETE_POLL_SUCCESS,
    payload: deletedPoll
  };
}

export function deletePollFailure(response) {
  return {
    type: DELETE_POLL_FAILURE,
    payload: response
  };
}
