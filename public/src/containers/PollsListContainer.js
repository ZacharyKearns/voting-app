import { connect } from 'react-redux'
import { fetchPolls, fetchPollsSuccess, fetchPollsFailure } from '../actions/polls';
import PollsList from '../components/PollsList';


const mapStateToProps = (state) => {
  return {
    pollsList: state.polls.pollsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPolls: () => {
      dispatch(fetchPolls()).then((response) => {
            !response.error ? dispatch(fetchPollsSuccess(response.payload.data)) : dispatch(fetchPollsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollsList);
