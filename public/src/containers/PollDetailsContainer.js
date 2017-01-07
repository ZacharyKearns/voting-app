import PollDetails from '../components/PollDetails.js';
import { fetchPoll, fetchPollSuccess, fetchPollFailure, resetActivePoll, resetDeletedPoll } from '../actions/polls';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return {
    activePoll: globalState.polls.activePoll,
    pollId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPoll: (id) => {
      dispatch(fetchPoll(id))
        .then((result) => {
          console.log(result)
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
      //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
      dispatch(resetActivePoll());
      dispatch(resetDeletedPoll());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PollDetails);
