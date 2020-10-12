import React from 'react';
import {connect} from 'react-redux';
import Dashboard from './Dashboard';

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
