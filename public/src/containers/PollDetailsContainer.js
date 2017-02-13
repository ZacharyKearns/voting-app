import PollDetails from '../components/PollDetails.js';
import { fetchPoll, fetchPollSuccess, fetchPollFailure, resetActivePoll, resetDeletedPoll, resetUpdatedPoll } from '../actions/polls';
import { connect } from 'react-redux';



function mapStateToProps(state, ownProps) {
  return {
    activePoll: state.polls.activePoll,
    pollId: ownProps.id,
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    pollForm: state.form
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPoll: (id) => {
      dispatch(fetchPoll(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchPollFailure(result.payload.response.data));
          } else {
            dispatch(fetchPollSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      //clean up activePost(currrently open), deletedPost(open and being deleted) states
      dispatch(resetActivePoll());
      dispatch(resetDeletedPoll());
      dispatch(resetUpdatedPoll());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PollDetails);
