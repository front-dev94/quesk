import React from 'react';
import {connect} from 'react-redux';
import Home from './Home';

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
