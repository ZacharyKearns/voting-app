import { combineReducers } from 'redux';
import PollsReducer from './reducer_polls';
import UserReducer from './reducer_user';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: UserReducer,
  validateFields: ValidateUserFieldsReducer,
  polls: PollsReducer, //<-- Polls
  form: formReducer // <-- redux-form
});

export default rootReducer;
