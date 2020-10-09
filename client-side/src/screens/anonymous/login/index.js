import {connect} from 'react-redux';
import {UserActions} from "actions";

import Login from './Login';

const mapDispatchToProps = dispatch =>({
  setUser: (user) => dispatch(UserActions.setUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
