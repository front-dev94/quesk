import {connect} from 'react-redux';
import {UserActions} from "actions";

import SignUp from './SignUp';

const mapDispatchToProps = dispatch =>({
  setUser: (user) => dispatch(UserActions.setUser(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
