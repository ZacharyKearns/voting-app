import {
  ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN,
	SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_USER,
	LOGIN_USER, LOGIN_USER_SUCCESS,  LOGIN_USER_FAILURE, LOGOUT_USER
} from '../actions/users';

const INITIAL_STATE = {user: null, status: null, error: null, loading: false};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
      return { ...state, user: null, status:'storage', error: null, loading: true};
    case ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
      return { ...state, user: action.payload.data.user, status: 'authenticated', error: null, loading: false}; //<-- authenticated
    case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
      error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, user: null, status: 'storage', error: error, loading: false};
    case RESET_TOKEN:// remove token from storage make loading = false
      return { ...state, user: null, status: 'storage', error: null, loading: false};

    case SIGNUP_USER:// sign up user, set loading = true and status = signup
      return { ...state, user: null, status: 'signup', error: null, loading: true};
    case SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
      return { ...state, user: action.payload.user, status: 'authenticated', error: null, loading: false}; //<-- authenticated
    case SIGNUP_USER_FAILURE:// return error and make loading = false
      error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, user: null, status: 'signup', error: error, loading: false};

    case LOGIN_USER:// sign in user,  set loading = true and status = login
      return { ...state, user: null, status: 'login', error: null, loading: true};
    case LOGIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
      return { ...state, user: action.payload.user, status: 'authenticated', error: null, loading: false}; //<-- authenticated
    case LOGIN_USER_FAILURE:// return error and make loading = false
      error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, user: null, status: 'login', error: error, loading: false};

    case LOGOUT_USER:
      return {...state, user: null, status:'logout', error: null, loading: false};

    case RESET_USER:// reset authenticated user to initial state
      return { ...state, user: null, status: null, error: null, loading: false};

    default:
      return state;
  }
}
