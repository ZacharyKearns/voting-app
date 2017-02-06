import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { updatePoll, updatePollSuccess, updatePollFailure } from '../actions/polls';

//For any field errors upon submission (i.e. not instant check)
const updateActivePoll = (values, dispatch, props) => {
  const data = {option: values.pollOption, id: props.id};
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
    const { handleSubmit, submitting, updatedPoll, pristine } = this.props;

    if (loading) {
      return <div className="container">Loading...</div>;
    } else if (error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if (!poll) {
      return <span/>
    }

    const options = poll.options.map(option => <option>{option.option}</option>);
    const votes = poll.options.map(option => <li className="list-group-item">{option.option}: {option.votes}</li>);

    return (
      <div>
        {this.renderError(updatedPoll)}
        <form className="col-md-6" onSubmit={ handleSubmit(updateActivePoll) }>
          <div className="form-group row">
            <h3>{poll.title}</h3>
            <Field className="form-control" component="select" name="pollOption">
              <option></option>
              {options}
            </Field>
          </div>
          <div className="form-group row">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={ submitting || pristine }>
              Submit
            </button>
          </div>
        </form>
        <div className="col-md-6">
          <h3>Votes:</h3>
          <ul className="list-group">
            {votes}
          </ul>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'PollDetails'
})(PollDetails)
