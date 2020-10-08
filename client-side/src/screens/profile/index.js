import React from 'react';
import {connect} from 'react-redux';
import {UserActions} from "actions";
import Profile from './Profile';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(UserActions.setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
