import Controller from './controller';
import AuthService from './../services/AuthService';
import User from '../models/User';

const authService = new AuthService(User);

class AuthController extends Controller {
  constructor(service) {
    super(service);

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async login(req, res){
    let response = await this.service.login(req);
    if (response.error) return res.status(response.statusCode).send(response);

    if(response.data && response.data.token)
        res.header('authorization', response.data.token);

    return res.send(response);
  }

  async signUp(req, res){
    let response = await this.service.signUp(req, res);
    if (response.error) return res.status(response.statusCode).send(response);

    if(response.data && response.data.token)
        res.header('authorization', response.data.token);

    return res.send(response);
  }
}

export default new AuthController(authService);