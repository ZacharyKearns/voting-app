import PollsForm from '../components/PollsForm.js';
import { resetNewPoll } from '../actions/polls';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewPoll());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newPoll: state.polls.newPoll,
    user: state.user.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PollsForm);
