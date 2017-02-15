import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { updatePoll, updatePollSuccess, updatePollFailure } from '../actions/polls';
import renderCustomOption from './renderCustomOption';
import PieChart from './PieChart';

function validate(values, props) {
  var errors = {};

  if (props.activePoll.poll) {
    const options = props.activePoll.poll.options.map(option => option.option);
    if (options.indexOf(values.customOption) > -1) {
      errors.customOption = ' Must be a unique option!';
    }
  }
  return errors;
}

//For any field errors upon submission (i.e. not instant check)
const updateActivePoll = (values, dispatch, props) => {
  const option = values.customOption ? values : values.pollOption;
  const data = {option, id: props.id};
  return dispatch(updatePoll(data, sessionStorage.getItem('jwtToken')))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(updatePollFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(updatePollSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      props.fetchPoll(props.id);
    });
}

class PollDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchPoll(this.props.pollId);
  }

  renderError(updatedPoll) {
    if (updatedPoll && updatedPoll.error && updatedPoll.error.message) {
      return (
        <div className="alert alert-danger">
          { updatedPoll ? updatedPoll.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }

  render() {
    const { poll, loading, error } = this.props.activePoll;
    const { handleSubmit,
      submitting,
      updatedPoll,
      pristine,
      submitSucceeded,
      authenticatedUser,
      pollForm,
      dirty,
      syncErrors } = this.props;

      console.log(this.props)

    if (loading) {
      return <div className="container">Loading...</div>;
    } else if (error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if (!poll) {
      return <span/>
    }

    const options = poll.options.map(option => <option>{option.option}</option>);
    const votes = poll.options.map(option => <li className="list-group-item">{option.option}: {option.votes}</li>);
    const voteCount = poll.options.filter(option => option.votes > 0);
    const url = `https://twitter.com/home?status=Vote%20on%20this%20awesome%20poll!%20${window.location.href}%20%23freeCodeCamp`;
    var disableInput = false;
    var disableSelect = false;
    var syncError = false;

    if (dirty) {
      disableInput = pollForm.PollDetails.values.pollOption ? true : false;
      disableSelect = pollForm.PollDetails.values.customOption ? true : false;
      syncError = pollForm.PollDetails.syncErrors ? true : false;
    }

    return (
      <div>
        {this.renderError(updatedPoll)}
        <form className="col-md-6" onSubmit={ handleSubmit(updateActivePoll) }>
          <div className="form-group row">
            <h3>{poll.title}</h3>
            <Field
              className="form-control"
              component="select"
              name="pollOption"
              disabled={submitSucceeded || disableSelect}>
              <option value="">Select an option:</option>
              {options}
            </Field>
          </div>
          <div className="form-group row">
            <button
              type="submit"
              className="btn btn-primary"
              style="margin-right:10px;margin-bottom:10px"
              disabled={ submitting || pristine || submitSucceeded || syncError}>
              Submit
            </button>
            {authenticatedUser && <a
              href={url}
              role="button"
              className="btn btn-default"
              target="_blank"
              style="margin-right:10px;margin-bottom:10px;">
              Share on Twitter
            </a>}
            {authenticatedUser && 
              <Field
                name="customOption"
                type="text"
                component={renderCustomOption}
                label="Add A Custom Option "
                disableInput={disableInput}
                submitting={submitting}
                submitSucceeded={submitSucceeded}/>}
          </div>
          <div class="form-group row">
            {submitSucceeded && <span>Thank You For Voting!</span>}
          </div>
        </form>
        <div className="col-md-6">
          <h3>Votes:</h3>
          {voteCount.length > 0 && <PieChart poll={poll}/>}
          <ul className="list-group">
            {votes}
          </ul>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'PollDetails',
  validate
})(PollDetails)
