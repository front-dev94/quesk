import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

let store;

const allStoreEnhancers = compose(
  applyMiddleware(thunk)
)

export const configureStore = (initialState = {}) => {
  store = createStore(rootReducer, initialState, allStoreEnhancers);
  return store;
};

export const getStore = () => store;