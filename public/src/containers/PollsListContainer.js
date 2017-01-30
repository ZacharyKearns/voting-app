import { connect } from 'react-redux'
import { fetchPolls, fetchPollsSuccess, fetchPollsFailure, resetPolls } from '../actions/polls';
import PollsList from '../components/PollsList';


const mapStateToProps = (state, props) => {
  return {
    pollsList: state.polls.pollsList,
    user: state.user,
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPolls: (type, user) => {
      dispatch(fetchPolls(type, user)).then((response) => {
            !response.error ? dispatch(fetchPollsSuccess(response.payload.data)) : dispatch(fetchPollsFailure(response.payload));
          });
    },
    resetMe: () => {
      dispatch(resetPolls());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollsList);
