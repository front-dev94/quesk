import React, {Component} from 'react';

import './App.scss';
import Header from './components/Header';
import Profile from './screens/profile/Profile';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    }
  } 

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="container">
          <Profile />
        </div>
      </div>
    )
  }
}

export default App;
