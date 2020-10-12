import * as ACTION_TYPES from 'actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      return action.payload
    }

    default:
      return state;
  }
};

