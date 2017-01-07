import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validatePollFields, validatePollFieldsSuccess, validatePollFieldsFailure } from '../actions/polls';
import { createPoll, createPollSuccess, createPollFailure, resetNewPoll } from '../actions/polls';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.options || values.options.trim() === '') {
    errors.options = 'Enter Options';
  }

  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
  return dispatch(validatePollFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (response.payload.status != 200 || data.title || data.options || data.description) {
        //let other components know of error by updating the redux` state
        dispatch(validatePollFieldsFailure(data));
        throw data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validatePollFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePoll = (values, dispatch) => {
  return dispatch(createPoll(values, sessionStorage.getItem('jwtToken')))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createPollFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createPollSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
}



class PollsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPoll.poll && !nextProps.newPoll.error) {
      this.context.router.push('/');
    }
  }

  renderError(newPoll) {
    if (newPoll && newPoll.error && newPoll.error.message) {
      return (
        <div className="alert alert-danger">
          { newPoll ? newPoll.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }
  render() {
    const {handleSubmit, submitting, newPoll} = this.props;
    return (
      <div className='container'>
        { this.renderError(newPoll) }
        <form className="col-md-6 col-md-offset-3" onSubmit={ handleSubmit(validateAndCreatePoll) }>
          <Field
             name="title"
             type="text"
             component={ renderField }
             label="Title"/>
          <Field
             name="options"
             type="text"
             component={ renderField }
             label="Options"/>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={ submitting }>
              Submit
            </button>
            <Link
              to="/"
              className="btn btn-error"> Cancel
            </Link>
          </div>
        </form>
      </div>
    )
  }
}


export default reduxForm({
  form: 'PollsForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  asyncValidate
})(PollsForm)
