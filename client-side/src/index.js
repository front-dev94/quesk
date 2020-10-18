import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { configureStore } from 'store';
import { usePromiseTracker } from "react-promise-tracker";

import Loader from './components/Loader';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/stylesheets/feather.scss';
import './index.scss';

const store = configureStore();

const LoadingIndicator = () => {
  const {promiseInProgress} = usePromiseTracker();
  return (
      promiseInProgress &&
      <Loader />
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App/>
    <LoadingIndicator />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
