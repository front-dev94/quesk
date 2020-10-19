import Http from 'utils/http';
import {userInfoFormatter} from 'utils/helpers/userInfoFormatter';

class AuthService {
  static async login(data) {
    const response = await Http.post('/auth/login', data);

    if(response.data)
      return userInfoFormatter(response.data);
    
    return response;
  }

  static async signUp(data) {
    const response = await Http.post('/auth/sign-up', data);

    if(response.data)
      return userInfoFormatter(response.data);
    
    return response;
  }
}

export default AuthService;
