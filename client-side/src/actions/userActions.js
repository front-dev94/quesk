import * as ACTION_TYPES from './actionTypes';
import AuthHelper from './../utils/helpers/authHelper';

class UserActions {
  static setUser(user) {
    return async (dispatch) => {
      AuthHelper.setUser(user);
      return await dispatch({
        type: ACTION_TYPES.SET_USER,
        payload: user
      });
    }
  }
}

export default UserActions;
