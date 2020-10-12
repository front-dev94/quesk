import Http from 'utils/http';
import {userInfoFormatter} from 'utils/helpers/userInfoFormatter';

class AuthService {
  static async login(data) {
    const response = await Http.post('/auth/login', data);

    return userInfoFormatter(response);
  }

  static async signUp(data) {
    const response = await Http.post('/auth/sign-up', data);

    return userInfoFormatter(response);
  }
}

export default AuthService;
